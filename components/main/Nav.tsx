'use client'
import Image from 'next/image'
import ObserveElement from '../scripts/client/ObserveElement'
import { useRef, useEffect, useState } from "react"
import Link from 'next/link'
import NavLinks from './NavLinks'
import Logo from '../elements/icons/Logo'
import Socials from './Socials'
import BtnForm from '../elements/forms/BtnForm'
import Brand from '../elements/icons/Brand'

type props = {
  className?: string;
}

const Nav: React.FC<props> = ({className = ''}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const navElement = document.querySelector('nav');
    const observer1 = ObserveElement(".nav-trigger", (e) => {
      if (navElement) {
        navElement.classList.remove("scrolled");
      }
    }, () => {
      if (navElement) {
        navElement.classList.add("scrolled");
      }
    });
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
      observer1.disconnect();
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
  
  return (
    <nav className={`${className} ${isLoaded ? 'animate' : ''}`}>
      <div className={`wrapper`}>
        <div className="scroller-contain">
          <div className="nav-content">
            <Brand/>
            <div className="nav-wrapper">
              <NavLinks />
              <BtnForm className='gold' form='ContactForm' text='Connect' />
              <Socials/>
            </div>
            <div className="phone">
              <div className="hamburger" onClick={handleNavToggle}>
                <label>
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-trigger"></div>
    </nav>
  )
}

export default Nav
