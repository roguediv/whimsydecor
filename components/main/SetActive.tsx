'use client'
import { useEffect } from 'react'

type props = {
  className?: string;
  activeText: string;
}

const NavLinks: React.FC<props> = ({className = '', activeText}) => {
  useEffect(() => {
    // Get the <ul> element within the <nav> element
    const navUl: HTMLUListElement | null = document.querySelector('nav ul');

    if (navUl) {
      // Get all <li> elements within the <ul> element
      const liElements: NodeListOf<HTMLLIElement> = navUl.querySelectorAll('li');
    
      // Loop through the <li> elements and check their innerText
      liElements.forEach((li: HTMLLIElement) => {
        li.classList.remove('active');
        if (li.innerText.trim().toUpperCase() === activeText.trim().toUpperCase()) {
          // Add the 'active' class to the <li> element
          li.classList.add('active');
        }
      });
    }
  }, [])
  return (
    <></>
  )
}

export default NavLinks
