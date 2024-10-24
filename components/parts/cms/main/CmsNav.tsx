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
    const navElement = document.querySelector('nav');
    const handleAnchorClick = (event: Event) => {
      const clickedAnchor = event.target as HTMLAnchorElement;
      const mainElement = document.querySelector('main');
      
      navElement?.classList.add("phone-fade-out");
      setTimeout(() => {
        navElement?.classList.remove("activePhone", "phone-fade-out");
        mainElement?.classList.remove("nav-active")
      }, 250)
    };

    const anchorElements = navElement?.querySelectorAll("a");

    if (anchorElements) {
      anchorElements.forEach((anchor) => {
        if (anchor.classList.contains('ignore')) return;
        anchor.addEventListener("click", handleAnchorClick);
      });
    }
    
    const buttonElements = navElement?.querySelectorAll("button");

    if (buttonElements) {
      buttonElements.forEach((button) => {
        if (button.classList.contains('ignore')) return;
        button.addEventListener("click", handleAnchorClick);
      });
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 750);
    
    return () => {
      const anchorElements = navElement?.querySelectorAll("a");
      clearTimeout(timer);

      if (anchorElements) {
        anchorElements.forEach((anchor) => {
          if (anchor.classList.contains('ignore')) return;
          anchor.removeEventListener("click", handleAnchorClick);
        });
      }
    };
  }, []);

  function handleNavToggle() {
    const navElement = document.querySelector('nav');
    const mainElement = document.querySelector('main');
    const burger = document.querySelector('nav .hamburger');
    if (navElement?.classList.contains("activePhone")) {
      navElement?.classList.add("phone-fade-out");
      setTimeout(() => {
        navElement?.classList.remove("activePhone", "phone-fade-out");
        mainElement?.classList.remove("nav-active")
      }, 250)
    } else {
      navElement?.classList.add("activePhone");
      mainElement?.classList.add("nav-active")
    }
  }
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
