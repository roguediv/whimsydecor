import Link from "next/link";
import { FaList, FaPowerOff, FaUserCheck } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

type props = {
  className?: string;
}

const NavLinks: React.FC<props> = ({className = ''}) => {
  return (
    <ul className="NavLinks">
      <li><Link href="/dashboard"><svg width="26" height="26" viewBox="0 0 24 24">
      <defs>
      <linearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="-421.25%" stopColor="#8D7F61" />
          <stop offset="-306.61%" stopColor="#F1DCAD" />
          <stop offset="-219.13%" stopColor="#8E7B53" />
          <stop offset="-131.62%" stopColor="#E5D9A9" />
          <stop offset="-46.08%" stopColor="#8A724C" />
          <stop offset="48.26%" stopColor="#E5D9A9" />
          <stop offset="134.06%" stopColor="#8E7B53" />
          <stop offset="234.44%" stopColor="#F1DCAD" />
          <stop offset="335.67%" stopColor="#8D7F61" />
        </linearGradient>
      </defs>
      <HiMiniHome  fill="url(#complexGradient)" /></svg><div className="text">Home</div></Link></li>
      <li><Link href="/dashboard/projects"><svg width="26" height="26" viewBox="0 0 24 24">
      <defs>
      <linearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="-421.25%" stopColor="#8D7F61" />
          <stop offset="-306.61%" stopColor="#F1DCAD" />
          <stop offset="-219.13%" stopColor="#8E7B53" />
          <stop offset="-131.62%" stopColor="#E5D9A9" />
          <stop offset="-46.08%" stopColor="#8A724C" />
          <stop offset="48.26%" stopColor="#E5D9A9" />
          <stop offset="134.06%" stopColor="#8E7B53" />
          <stop offset="234.44%" stopColor="#F1DCAD" />
          <stop offset="335.67%" stopColor="#8D7F61" />
        </linearGradient>
      </defs>
      <FaList fill="url(#complexGradient)" /></svg><div className="text">Projects</div></Link></li>
      <li><Link href="/dashboard/testimonial"><svg width="26" height="26" viewBox="0 0 24 24">
      <defs>
      <linearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="-421.25%" stopColor="#8D7F61" />
          <stop offset="-306.61%" stopColor="#F1DCAD" />
          <stop offset="-219.13%" stopColor="#8E7B53" />
          <stop offset="-131.62%" stopColor="#E5D9A9" />
          <stop offset="-46.08%" stopColor="#8A724C" />
          <stop offset="48.26%" stopColor="#E5D9A9" />
          <stop offset="134.06%" stopColor="#8E7B53" />
          <stop offset="234.44%" stopColor="#F1DCAD" />
          <stop offset="335.67%" stopColor="#8D7F61" />
        </linearGradient>
      </defs>
      <FaUserCheck fill="url(#complexGradient)" /></svg><div className="text">Testimonial</div></Link></li>
      <li><Link href="/dashboard/settings"><svg width="26" height="26" viewBox="0 0 24 24">
      <defs>
      <linearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="-421.25%" stopColor="#8D7F61" />
          <stop offset="-306.61%" stopColor="#F1DCAD" />
          <stop offset="-219.13%" stopColor="#8E7B53" />
          <stop offset="-131.62%" stopColor="#E5D9A9" />
          <stop offset="-46.08%" stopColor="#8A724C" />
          <stop offset="48.26%" stopColor="#E5D9A9" />
          <stop offset="134.06%" stopColor="#8E7B53" />
          <stop offset="234.44%" stopColor="#F1DCAD" />
          <stop offset="335.67%" stopColor="#8D7F61" />
        </linearGradient>
      </defs>
      <IoMdSettings fill="url(#complexGradient)" /></svg><div className="text">Settings</div></Link></li>
    </ul>
  )
}

export default NavLinks
