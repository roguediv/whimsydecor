'use client'
import ObserveElement from '../../../scripts/client/ObserveElement'
import { useRef, useEffect, useState } from "react"
import NavLinks from './NavLinks'
import Logo from '../../../elements/icons/Logo'

type props = {
  className?: string;
  login?: boolean;
}

const CMSNav: React.FC<props> = ({className = '', login=false}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 750);
    return () => {clearTimeout(timer);};
  }, []);

  if (login) {
    return (
      <nav className={`${className} cms-login ${isLoaded ? 'animate' : ''}`}>
        <div className={`wrapper`}>
          <div className="scroller-contain">
            <div className="nav-content">
              <Logo/>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  return (
    <nav className={`${className}`}>
      <div className={`wrapper`}>
        <div className="scroller-contain">
          <div className="nav-content">
            <Logo />
            <div className="nav-wrapper">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
      <div className="nav-trigger"></div>
    </nav>
  )
}

export default CMSNav
