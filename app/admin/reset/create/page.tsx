import Link from "next/link";
import { FaLessThan } from "react-icons/fa";

export default async function CreatePage() {
  return (
    <div id="cms-login">
      <section>
        <div className="sct-content">
          <div className="sct-header center">
            <h2>Reset Your Password</h2>
          </div>
          <div className="text">
            <p className="center">Please choose a password that is at least 8 characters. </p>
            <div className="one text-input ipt login-email">
              <div className="form__group field">
                <input name="email" type="text" className="form__field" maxLength={255} placeholder="a" />
                <label className="form__label">New Password</label>
              </div>
              <div className="error"></div>
            </div>
            <div className="one text-input ipt login-email">
              <div className="form__group field">
                <input name="email" type="text" className="form__field" maxLength={255} placeholder="a" />
                <label className="form__label">Confirm New Password</label>
              </div>
              <div className="error"></div>
            </div>
            <Link className="button" href={'/admin/reset/success'}><button>Reset Password</button></Link>
            <Link href={'/admin'}><FaLessThan /> Back to Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
