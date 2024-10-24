import Link from "next/link";
import { FaLessThan } from "react-icons/fa";

export default function SuccessPage() {
  return (
    <div id="cms-login">
      <section>
        <div className="sct-content">
          <div className="sct-header center">
            <h2>Password Reset!</h2>
          </div>
          <div className="text">
            <p className="center">Your password has been successfully reset.<br/> Continue below to log in.</p>
            <Link className="button" href={'/admin'}><button>Continue</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
