import NavLinks from "./NavLinks";
import { GlobalEmailAnchor, GlobalPhoneAnchor } from "./global";
import Socials from './Socials'
import Brand from "../elements/icons/Brand";

type props = {
  className?: string;
  socialLinks?: string[];
}

const Footer: React.FC<props> = ({className = '', socialLinks}) => {
  return (
    <footer className={`theme-dark ${className}`}>
      <div className="wrapper">
        <div className="p-1">
          <Brand/>
          <GlobalPhoneAnchor />
          <GlobalEmailAnchor />
          <p>St. Louis, MO</p>
        </div>
        <div className="p-2">
          <Socials socialLinks={socialLinks} />
          <NavLinks /> 
          {/* <p>&copy; {new Date().getFullYear()} WhimsyDecor</p> */}
        </div>
      </div>

    </footer>
  )
}

export default Footer
