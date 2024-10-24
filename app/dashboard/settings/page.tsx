import Button from "@/components/elements/html/Button";
import TextInput from "@/components/elements/html/TextInput";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import { getSession, logout } from "@/components/scripts/auth/sessionManager";
import { updateUser } from "@/components/scripts/database/queries";
import { PrismaClient, User } from "@prisma/client";
const db = new PrismaClient();

export default async function SettingsPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {return(<LoginCheckServer/>)}
  let user : Partial<User> | null = null;
  if (sessionUser.user) {
    user = await db.user.findUnique({where: {userID: sessionUser.user.userID}, select: {
      userID: true,
      name: true,
      email: true,
      phone: true,
      access: true,
    }});
  }
  
  return (
    <>
    <CMSHeader page="settings" user={user} updateUser={updateUser} />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Settings Management Center</h4>
            <p>Manage your CMS login details, including email and password, and update the phone number displayed on the website. Note that changing your CMS email will also update the website contact email and where contact form submissions are sent. Changes will not be saved unless you select "Save" in the upper corner.</p>
          </div>
          <div className="text">
            <TextInput id="iptSettingsName" placeholder="Name" loadText={user?.name}/>
            <TextInput id="iptSettingsEmail" placeholder="Email Address" loadText={user?.email}/>
            <TextInput id="iptSettingsPhone" placeholder="Phone Number" loadText={user?.phone ? user.phone : ''}/>
            <p className="v2">Change Password:</p>
            <TextInput id="iptSettingsPasswordOld" placeholder="Old Password" />
            <TextInput id="iptSettingsPasswordNew" placeholder="New Password" />
            <Button className="no-margin" icon="exit" text="Log Out" RedirectTrigger={async (test : number) => {
              "use server"
              if (test === 0) return {status: 1, title: '', desc: '', data: '1'};
              await logout();
              return {status: 1, title: '', desc: '', data: '/admin'}
            }} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
