import { PrismaClient, User } from "@prisma/client"
const db = new PrismaClient();
type props = {
  className?: string;
}
export const GlobalDevEmailAnchor: React.FC<props> = ({}) => {return <a className="contact-link" href={`mailto:contact@jacobmiranda.com?subject=Technical%20Services&body=Hello%20Jacob!`}>contact@jacobmiranda.com</a>}
export const GlobalEmailAnchor: React.FC<props> = async ({}) => {
  const user : Partial<User> | null = await db.user.findFirst({where: {access: 1}, select: {
    userID: true,name: true,email: true,phone: true,access: true,facebook: true,instagram: true,pinterest: true,
  }});
  return <a className="contact-link" href={`mailto:${user?.email}?subject=New%20Service&body=Hello%20WhismyDecor!`}>{user?.email}</a>
}
export const GlobalPhoneAnchor: React.FC<props> = async ({}) => {
  const user : Partial<User> | null = await db.user.findFirst({where: {access: 1}, select: {
    userID: true,name: true,email: true,phone: true,access: true,facebook: true,instagram: true,pinterest: true,
  }});
  let phoneString = "N/A";
  if (user?.phone) {
    phoneString = `${user.phone.substring(0,3)}-${user.phone.substring(3,6)}-${user.phone.substring(6,10)}`
  }
  return <a className="contact-link" href={`tel:+1${user?.phone ? user.phone : ''}`}>{phoneString}</a>
}

export const GlobalWebDomain = 'https://webapp.jacobmiranda.com';
export const GlobalUploadURL = `${GlobalWebDomain}/media/uploads/`