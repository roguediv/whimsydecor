import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaPhoneAlt, FaPinterestP } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbBrandFacebook } from "react-icons/tb";

type props = {
  className?: string;
  isSvg?: boolean;
}

const NavLinks: React.FC<props> = ({className = '', isSvg = false}) => {
  return (
    <div className={isSvg ? "icons" : "Socials"}>
      <Link href="#"><TbBrandFacebook /></Link>
      <Link href="#"><FaInstagram /></Link>
      <Link href="#"><FaPinterestP /></Link>
    </div>
  )
}

export default NavLinks
