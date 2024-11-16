import { PrismaClient, Project, Testimonial, User } from "@prisma/client";
import { prismaExecutionService } from "./PrismaExecutionService";
import { ReturnField } from "./interface";
import { validateEmail, validatePassword, validateServices, validateString } from "./validation";
import { deleteFile, handleImageUpload } from "./uploadHandler";
import { getSession } from "../auth/sessionManager";
import bcrypt from 'bcrypt';

const db = new PrismaClient();
type ProjectKeys = keyof Project;
type TestimonialKeys = keyof Testimonial;
const maxFilesSize = 50 * 1024 * 1024;

export function endQuery(title: string, desc: string) {
  //prismaExecutionService.endQuery();
  return { status: 0, title: title, desc: desc, data: null };
}

export async function updateProject(Project: Project, ImgFormData: FormData): Promise<ReturnField> {
  "use server";
  /// Check if a prisma operation is running
  // if (!prismaExecutionService.startQuery()) 
  //   return { status: 0, title: "Server is Busy", desc: "Please retry in a moment.", data: null };

  /// Ensure the session is valid and store the user
  const session = await getSession();
  if (!session) return endQuery("Logged Out", "Refresh the page and try logging.");
  if (!session.user.access || session.user.access < 1) return endQuery("Bad Privileges", "You don't have the proper access level to make this change.");

  /// Check if table can be retrieved
  let updatedProject = null;
  const project = await db.project.findUnique({ where: { projectID: Project.projectID } });
  if (!project) return endQuery("Project not Found", "Could not find a valid project to update.");

  /// Build an array to update the project
  let projectDataArray: Partial<Project> = {};
  if (project.title !== Project.title) projectDataArray.title = Project.title;
  if (project.isLive !== Project.isLive) projectDataArray.isLive = Project.isLive;
  if (project.isFeatured !== Project.isFeatured) projectDataArray.isFeatured = Project.isFeatured;
  if (project.services !== Project.services) projectDataArray.services = Project.services;
  if (project.shortDesc !== Project.shortDesc) projectDataArray.shortDesc = Project.shortDesc;
  if (project.longDesc !== Project.longDesc) projectDataArray.longDesc = Project.longDesc;

  /// Validate all items to ensure proper data is entering database
  let isError = false;
  let res: ReturnField = { status: -1, title: 'Something Went Wrong', desc: 'An unknown error occurred...', data: null };
  Object.keys(projectDataArray).forEach(key => {
    if (isError) return;
    switch (key) {
      case 'title':
        res = validateString(projectDataArray.title as string, "title");
        if (res.status == 0) isError = true;
        break;
      case 'services':
        res = validateServices(projectDataArray.services as string);
        if (res.status == 0) isError = true;
        break;
      case 'shortDesc':
        res = validateString(projectDataArray.shortDesc as string, "Summary", 500);
        if (res.status == 0) isError = true;
        break;
      case 'longDesc':
        res = validateString(projectDataArray.longDesc as string, "Description", 2000);
        if (res.status == 0) isError = true;
        break;
      default:
        return;
    }
  });

  if (isError) return endQuery(res.title, res.desc);

  /// Handle uploading images
  const imageKeys: string[] = [];
  ImgFormData.forEach((_, key) => { imageKeys.push(key); });
  
  // check upload load is under max load
  let totalSize = 0;
  for (const key of imageKeys) {
    if (!key.includes('Desc')) {
      totalSize += (ImgFormData.get(`${key}`) as File).size
      if (totalSize > maxFilesSize) {
        return endQuery("Images too large", "The max you can upload at one time is 50mb, with no image being over 20mb.");
      }
    }
  }

  for (const key of imageKeys) {
    if (isError) break; // Break the loop if there's already an error
    if (key.includes('Desc')) {
      let imgDesc = ImgFormData.get(`${key}`) as string;
      if (validateString(imgDesc).status === 1) projectDataArray[key as ProjectKeys] = imgDesc as any;
      continue;
    }
    const file = ImgFormData.get(key) as File;

    // Check if the file is valid
    if (file.type !== undefined) {
      const oldProjectImage = project[key as ProjectKeys];
      if (oldProjectImage) {
        res = deleteFile(oldProjectImage as string);
        if (res.status < 1) {
          isError = true;
          break;
        }
      }
      res = await handleImageUpload(file, `projects/${Project.projectID}`);
      if (res.status === 1) {
        projectDataArray[key as ProjectKeys] = res.data; // Store the uploaded file path
        let imgDesc = ImgFormData.get(`${key}Desc`) as string;
        if (validateString(imgDesc).status !== 1) imgDesc = `${file.name.split('.')[0]}`;
        projectDataArray[`${key}Desc` as ProjectKeys] = imgDesc as any;
      } else {
        isError = true; // Set error flag if upload fails
        break; // Break the loop on error
      }
    }
  }

  if (isError) return endQuery(res.title, res.desc);

  /// Update the project
  if (Object.keys(projectDataArray).length > 0) {
    if (project.isFeatured !== Project.isFeatured && Project.isFeatured) {
      await db.project.updateMany({ data: { isFeatured: false } });
    }
    updatedProject = await db.project.update({ where: { projectID: project.projectID }, data: projectDataArray });
    return { status: 1, title: "Successfully Updated Project", desc: 'Project was updated and your changes are now live.', data: JSON.stringify(updatedProject) };
  } else {
    return { status: 2, title: "Nothing to Change", desc: "Project is already up to date.", data: JSON.stringify(updatedProject) };
  }
}

export async function updateTestimonial(Testimonial: Testimonial | null, ImgFormData : FormData): Promise<ReturnField> {
  "use server";
  /// Check if a prisma operation is running
  // if (!prismaExecutionService.startQuery()) 
  //   return { status: 0, title: 'Server is Busy', desc: "Please retry in a moment...", data: null };

  // Ensure the session is valid and store the user
  const session = await getSession();
  if (!session) return endQuery("Logged Out", "Refresh the page and try logging.");
  if (!session.user.access || session.user.access < 1) return endQuery("Bad Privileges", "You don't have the proper access level to make this change.");

  // Check if table can be retrieved
  let updatedTestimonial = null;
  let testimonial = await db.testimonial.findUnique({ where: { testimonialID: 1 } });
  if (!testimonial) testimonial = await db.testimonial.create({ data: {} });
  if (!testimonial) return endQuery("Testimonial not Found", "Could not find a valid testimonial to update.");
  if (!Testimonial) return endQuery("There is nothing to update.", "No testimonial found to update.");

  /// Build an array to update the testimonial
  let testimonialDataArray: Partial<Testimonial> = {};
  if (testimonial.title !== Testimonial?.title) testimonialDataArray.title = Testimonial?.title;
  if (testimonial.desc !== Testimonial?.desc) testimonialDataArray.desc = Testimonial?.desc;
  if (testimonial.name !== Testimonial?.name) testimonialDataArray.name = Testimonial?.name;

  /// Validate all items to ensure proper data is entering database
  let isError = false;
  let res: ReturnField = { status: -1, title: 'Something Went Wrong', desc: 'An unknown error occurred...', data: null };
  Object.keys(testimonialDataArray).forEach(key => {
    if (isError) return;
    switch (key) {
      case 'title':
        res = validateString(testimonialDataArray.title as string, "title");
        if (res.status === 0) isError = true;
        break;
      case 'desc':
        res = validateString(testimonialDataArray.desc as string, "description", 2000);
        if (res.status === 0) isError = true;
        break;
      case 'name':
        res = validateString(testimonialDataArray.name as string, "name", 500);
        if (res.status === 0) isError = true;
        break;
      default:
        return;
    }
  });

  if (isError) return endQuery(res.title, res.desc);


  /// Handle uploading images
  const imageKeys: string[] = [];
  ImgFormData.forEach((_, key) => { imageKeys.push(key); });
  // check upload load is under max load
  let totalSize = 0;
  for (const key of imageKeys) {
    if (!key.includes('Desc')) {
      totalSize += (ImgFormData.get(`${key}`) as File).size
      if (totalSize > maxFilesSize) {
        return endQuery("Images too large", "The max you can upload at one time is 50mb, with no image being over 20mb.");
      }
    }
  }

  for (const key of imageKeys) {
    if (isError) break; // Break the loop if there's already an error
    if (key.includes('Desc')) {
      let imgDesc = ImgFormData.get(`${key}`) as string;
      if (validateString(imgDesc).status === 1) testimonialDataArray[key as TestimonialKeys] = imgDesc as any;
      continue;
    }
    const file = ImgFormData.get(key) as File;

    // Check if the file is valid
    if (file.type !== undefined) {
      const oldProjectImage = testimonial[key as TestimonialKeys];
      if (oldProjectImage) {
        res = deleteFile(oldProjectImage as string);
        if (res.status < 1) {
          isError = true;
          break;
        }
      }
      res = await handleImageUpload(file, `testimonial/${Testimonial.testimonialID}`);
      if (res.status === 1) {
        testimonialDataArray[key as TestimonialKeys] = res.data; // Store the uploaded file path
        let imgDesc = ImgFormData.get(`${key}Desc`) as string;
        if (validateString(imgDesc).status !== 1) imgDesc = `${file.name.split('.')[0]}`;
        testimonialDataArray[`${key}Desc` as TestimonialKeys] = imgDesc as any;
      } else {
        isError = true; // Set error flag if upload fails
        break; // Break the loop on error
      }
    }
  }

  if (isError) return endQuery(res.title, res.desc);

  /// Update the testimonial
  if (Object.keys(testimonialDataArray).length > 0) {
    updatedTestimonial = await db.testimonial.update({ where: { testimonialID: 1 }, data: testimonialDataArray });
    return { status: 1, title: "Successfully updated testimonial", desc: 'Testimonial was updated and your changes are now live.', data: JSON.stringify(updatedTestimonial) };
  } else {
    return { status: 2, title: "Nothing to Change", desc: "Testimonial is already up to date.", data: JSON.stringify(updatedTestimonial) };
  }
}

export async function updateUser(User: Partial<User>, FormData: FormData): Promise<ReturnField> {
  "use server";
  /// Check if a prisma operation is running
  // if (!prismaExecutionService.startQuery()) 
  //   return { status: 0, title: "Server is Busy", desc: "Please retry in a moment.", data: null };

  /// Ensure the session is valid and store the user
  const session = await getSession();
  if (!session.user) return endQuery("Logged Out", "Refresh the page and try logging.");
  if (!session.user.access || session.user.access < 1) return endQuery("Bad Privileges", "You don't have the proper access level to make this change.");
  if (session.user.userID != User.userID) return endQuery("Bad Privileges", "You don't have the proper access to change this user's settings.");

  /// Check if table can be retrieved
  let updatedUser = null;
  const user = await db.user.findUnique({ where: { userID: User.userID } });
  if (!user) return endQuery("User not Found", "Could not find your account.");

  /// Build an array to update the project
  let userDataArray: Partial<User> = {};
  if (user.name !== User.name) userDataArray.name = User.name;
  if (user.email !== User.email) userDataArray.email = User.email;
  if (user.phone !== User.phone) userDataArray.phone = User.phone;
  if (user.facebook !== User.facebook && User.facebook != '') userDataArray.facebook = User.facebook;
  if (user.instagram !== User.instagram && User.instagram != '') userDataArray.instagram = User.instagram;
  if (user.pinterest !== User.pinterest && User.pinterest != '') userDataArray.pinterest = User.pinterest;

  /// Handle sensitive password data
  let passwordOld = FormData.get('passwordOld') as string
  let passwordNew = FormData.get('passwordNew')
  if (passwordOld && passwordNew) {
    passwordOld = await bcrypt.hash(passwordOld as string, user.slt);
    passwordNew = await bcrypt.hash(passwordNew as string, user.slt);
    if (passwordOld !== user.password) return endQuery("Old Password Incorrect", "Your old password does not match your current password.");
    if (passwordNew === passwordOld) return endQuery("New Password is the Same", "Your passwords need to be different.");
    userDataArray.password = passwordNew;
  }


  /// Validate all items to ensure proper data is entering database
  let isError = false;
  let res: ReturnField = { status: -1, title: 'Something Went Wrong', desc: 'An unknown error occurred...', data: null };
  Object.keys(userDataArray).forEach(key => {
    if (isError) return;
    switch (key) {
      case 'name':
        res = validateString(userDataArray.name as string, "name");
        if (res.status == 0) isError = true;
        break;
      case 'email':
        res = validateEmail(userDataArray.email as string);
        if (res.status == 0) isError = true;
        break;
      case 'password':
        res = validatePassword(userDataArray.password as string);
        if (res.status == 0) isError = true;
        break;
      case 'facebook':
        res = validateString(userDataArray.facebook as string, "Facebook Social");
        if (res.status == 0) isError = true;
        break;
      case 'instagram':
        res = validateString(userDataArray.instagram as string, "Instagram Social");
        if (res.status == 0) isError = true;
        break;
      case 'pinterest':
        res = validateString(userDataArray.pinterest as string, "Pinterest Social");
        if (res.status == 0) isError = true;
        break;
      default:
        return;
    }
  });

  if (isError) return endQuery(res.title, res.desc);

  /// Update the user
  if (Object.keys(userDataArray).length > 0) {
    await db.user.update({ where: { userID: user.userID }, data: userDataArray });
    return { status: 1, title: "Successfully Updated User", desc: 'Your profile was updated and your changes are now live.', data: null};
  } else {
    return { status: 2, title: "Nothing to Change", desc: "User is already up to date.", data: null };
  }
}