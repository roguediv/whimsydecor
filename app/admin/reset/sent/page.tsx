import Link from "next/link";
import { FaLessThan } from "react-icons/fa";

export default function SentPage() {
  return (
    <div id="cms-login">
      <section>
        <div className="sct-content">
          <div className="sct-header center">
            <h2>Check Your Email</h2>
          </div>
          <div className="text">
            <p className="center">We sent a password reset link to [address@email.com]. Didn’t receive the email, resend the link below.</p>
            <Link className="button" href={'/admin/reset'}><button>Resend Link</button></Link>
            <Link href={'/admin'}><FaLessThan /> Back to Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
