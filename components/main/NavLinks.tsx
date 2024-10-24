import Link from "next/link";

type props = {
  className?: string;
}

const NavLinks: React.FC<props> = ({className = ''}) => {
  return (
    <ul className="NavLinks">
      <li><Link href="/about">About Us</Link></li>
      <li><Link href="/projects">Our Work</Link></li>
    </ul>
  )
}

export default NavLinks
