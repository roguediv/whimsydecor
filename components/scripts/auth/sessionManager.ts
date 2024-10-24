import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import {prismaExecutionService} from '@/components/scripts/database/PrismaExecutionService'
import { ReturnField } from "../database/interface";
import { validateEmail, validatePassword, validateString } from "../database/validation";
import bcrypt from 'bcrypt';
const db = new PrismaClient();

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(payload: any) {
  "use server"
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Date.now() + 10 * 1000)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  "use server"
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData): Promise<ReturnField> {
  "use server"
  // Verify credentials && get the user
  logout();
  if(!prismaExecutionService.startQuery()) return {status: 0, title: "Server Busy", desc: "Please try again later", data: null};
  const email = formData.get('email');
  const password = formData.get('password');
  const emailRtn = validateEmail(email as string)
  if (emailRtn.status != 1) {
    prismaExecutionService.endQuery()
    return {status: 0, title: emailRtn.title, desc: emailRtn.desc, data: null}
  }
  let user: Partial<User> | null = await db.user.findFirst({where: {email: email as string}})

  if (!user) {
    if (process.env.CAN_GENERATE_USERS !== "true") {
      prismaExecutionService.endQuery()
      return {status: 0, title: "User not Found", desc: "Could not log in.", data: null};
    }
    /// CREATE USER IF USER DOESN'T EXIST IF ENV HAS CAN_GENERATE_USERS ENABLED
    /// _______________________________________________________________________
    ///
    // Validate Password
    const passwordRtn = validatePassword(password as string);
    if (passwordRtn.status !== 1) {
      prismaExecutionService.endQuery();
      return {status: 0, title: passwordRtn.title, desc: passwordRtn.desc, data: null};
    }

    // Validate name if applicable; default "User"
    let name = formData.get('name');
    let nameRtn = validateString(name as string);
    if (nameRtn.status !== 1) name = "User";

    // Encrypt password and create user
    const slt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, slt);
    user = await db.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword,
        slt: slt,
        access: 0,
      },
    });
  }

  // Check the user password
  if (!user.slt || !user.password) {
    prismaExecutionService.endQuery();
    return {status: 0, title: "Error Code: 1", desc: "Please reload", data: null}
  }
  const hashedPassword = await bcrypt.hash(password as string, user.slt);
  if (hashedPassword !== user.password) {
    prismaExecutionService.endQuery();
    return {status: 0, title: "Incorrect Login Information", desc: "You may need to contact support.", data: null}
  }

  // Delete sensitive data
  delete user.password;
  delete user.slt;

  // Create the session
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true, sameSite: "lax",});
  prismaExecutionService.endQuery();
  return {status: 1, title: "Signed in", desc: "Signed in", data: null}
}

export async function logout() {
  "use server"
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0), sameSite: "lax" });
}

export async function getSession() {
  "use server"
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  "use server"
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function isValidSession() {
  "use server"
  const session = cookies().get("session")?.value;
  if (!session) return false;
  return true;
}