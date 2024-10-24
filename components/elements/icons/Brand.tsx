'use client'

import Link from "next/link";
import Logo from "./Logo";

type Props = {
  className?: string;
};

const Brand: React.FC<Props> = ({ className = ''}) => {
  return (
    <Link href="/" className={`Brand ${className}`}>
      <Logo />
      <h2>Whimsy<br/>Decor</h2>
    </Link>
  );
};

export default Brand;