// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import { User } from "@prisma/client";
// const db = new PrismaClient();

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Fetch the user from your Prisma database
//         const user = await db.user.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//         });

//         // Check if user exists and validate the password
//         if (user && user.password === credentials?.password) {
//           // Return user object with properties defined in your User model
//           return { 
//             userID: user.userID, 
//             name: user.name, 
//             email: user.email, 
//             access: user.access 
//           };
//         }
//         return null; // Return null if authentication fails
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/admin', // Custom sign-in page
//   },
//   session: {
//     jwt: true, // Use JWT for session handling
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.userID = user.userID; // Add userID to the token
//         token.access = user.access; // Add access level to the token
//       }
//       return token; // Return the updated token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.userID = token.userID; // Set userID in session
//         session.user.access = token.access; // Set access level in session
//       }
//       return session; // Return the updated session
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
