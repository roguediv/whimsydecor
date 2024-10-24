'use client'

import { useEffect } from "react";

export default function Transition({children}: {children: React.ReactNode}) {


  useEffect(() => {
    
    const anchorTags = document.querySelectorAll('a');
    anchorTags.forEach(anchor => {
      if (anchor.classList.contains('ignore')) return;
      anchor.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLAnchorElement;
        const href = target.getAttribute('href');
        const currentPathname = window.location.pathname;
        if (href === currentPathname) return;
        const headerElement = document.querySelector('header');
        if (headerElement) {
          headerElement.classList.remove('animate');
        }
      });
    });

  }, []); 
  return (
    <>
      {children}
    </>
  )
}