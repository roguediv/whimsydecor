import Button from "@/components/elements/html/Button";
import TextInput from "@/components/elements/html/TextInput";
import CMSButton from "@/components/parts/cms/elements/CMSButton";
import { login } from "@/components/scripts/auth/sessionManager";
import Link from "next/link";

export default async function AdminPage() {
  return (
    <div id="cms-login">
      <section>
        <div className="sct-content">
          <div className="sct-header center">
            <h2>Sign in to Whimsy Decor<br />Content System</h2>
          </div>
          <div className="text">
            <p className="center">Please enter your login details below.</p>
            <TextInput id="iptUserEmail" placeholder="Email"/>
            <TextInput id="iptUserPassword" placeholder="Password"/>
            <Link className="right" href={'/admin/reset'}>Forgot Password?</Link>
            <CMSButton text="Login" type="login" trigger={login}/>
          </div>
        </div>
      </section>
    </div>
  );
}
