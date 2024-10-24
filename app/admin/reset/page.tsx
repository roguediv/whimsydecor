import Link from "next/link";
import { FaLessThan } from "react-icons/fa";

export default function ResetPage() {
  return (
    <div id="cms-login">
      <section>
        <div className="sct-content">
          <div className="sct-header center">
            <h2>Reset Your Password</h2>
          </div>
          <div className="text">
            <p className="center">Forgot your password? Enter your email address and we will send you a reset link.</p>
            <div className="one text-input ipt login-email">
              <div className="form__group field">
                <input name="email" type="text" className="form__field" maxLength={255} placeholder="a" />
                <label className="form__label">Email</label>
              </div>
              <div className="error"></div>
            </div>
            <Link className="button" href={'/admin/reset/sent'}><button>Send Link</button></Link>
            <Link href={'/admin'}><FaLessThan /> Back to Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
