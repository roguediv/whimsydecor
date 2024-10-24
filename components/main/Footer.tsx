import NavLinks from "./NavLinks";
import { GlobalEmailAnchor, GlobalPhoneAnchor } from "./global";
import Socials from './Socials'
import Brand from "../elements/icons/Brand";

type props = {
  className?: string;
}

const Footer: React.FC<props> = ({className = ''}) => {
  return (
    <footer className={`theme-dark ${className}`}>
      <div className="wrapper">
        <div className="p-1">
          <Brand/>
          <GlobalPhoneAnchor />
          <GlobalEmailAnchor />
          <p>St. Louis, United States, MO</p>
        </div>
        <div className="p-2">
          <Socials />
          <NavLinks />
          {/* <p>&copy; {new Date().getFullYear()} WhimsyDecor</p> */}
        </div>
      </div>

    </footer>
  )
}

export default Footer
