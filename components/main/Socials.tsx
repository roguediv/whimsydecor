import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaPhoneAlt, FaPinterestP } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbBrandFacebook } from "react-icons/tb";

type props = {
  className?: string;
  socialLinks?: string[];
  isSvg?: boolean;
}

const NavLinks: React.FC<props> = ({className = '', socialLinks = ["#", "#", "#"], isSvg = false}) => {
  return (
    <div className={isSvg ? "icons" : "Socials"}>
      <Link href={socialLinks[0] != null ? socialLinks[0] : "#"} target="_blank"><TbBrandFacebook /></Link>
      <Link href={socialLinks[1] != null ? socialLinks[1] : "#"} target="_blank"><FaInstagram /></Link>
      <Link href={socialLinks[2] != null ? socialLinks[2] : "#"} target="_blank"><FaPinterestP /></Link>
    </div>
  )
}

export default NavLinks
