'use client'
import React, {forwardRef, useEffect, Ref, useRef, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { FiPlusCircle } from 'react-icons/fi';
import { prismaExecutionService } from '@/components/scripts/database/PrismaExecutionService';


type props = {
  className?: string;
  text?: string;
  name?: string;
  icon?: string;
  Trigger?: () => Promise<boolean>;
}

const ActiveButton = forwardRef<HTMLButtonElement, props>(({className = "", text = "", name="", icon="", Trigger = () => {return false}}, ref) => {
  const button = useRef<HTMLButtonElement | null>(null)
  if (!ref || !('current' in ref)) {
    ref = useRef<HTMLButtonElement | null>(null);
  }
  useEffect(() => {
    // Clean up the event listener when the component unmounts
    return () => {
    };
  }, []);

  function clearActiveProjectSelectorFavoriteButtons () {
    const buttons = document.querySelectorAll('.project-selector-favorite-button')
    buttons.forEach(btn => {
      if (button.current !== btn) btn.classList.remove('active');
    });
  }

  async function onClick() {
    if (!prismaExecutionService.startQuery()) return;
    if (!button.current) return;

    button.current.classList.toggle('active');
    clearActiveProjectSelectorFavoriteButtons();

    const isActive = await Trigger();
    
    clearActiveProjectSelectorFavoriteButtons();
    if (isActive) {
      button.current.classList.add('active');
    }
    
    prismaExecutionService.endQuery();
  }

  return (
    <button ref={button} className={`${className}`} aria-label="Button" onClick={async () => {await onClick()}}>
      {icon != '' ? 
      (() => {
        switch (icon) {
          case 'FiPlusCircle':
            return <><FiPlusCircle/>{text}</>;
          case 'star':
            return <><svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9072 7.54581C15.2183 4.27748 15.8738 2.64331 17.001 2.64331C18.1282 2.64331 18.7837 4.27748 20.0947 7.54581L20.1557 7.698C20.8964 9.54445 21.2667 10.4677 22.0215 11.0288C22.7762 11.59 23.767 11.6787 25.7485 11.8562L26.1067 11.8882C29.3498 12.1787 30.9713 12.3239 31.3182 13.3555C31.6652 14.3872 30.461 15.4827 28.0526 17.6739L27.2488 18.4052C26.0296 19.5144 25.42 20.069 25.1359 20.7959C25.0829 20.9315 25.0388 21.0704 25.004 21.2117C24.8172 21.9695 24.9958 22.774 25.3528 24.3832L25.4639 24.884C26.12 27.8413 26.4481 29.3199 25.8753 29.9576C25.6612 30.196 25.3831 30.3675 25.074 30.4519C24.247 30.6775 23.0729 29.7208 20.7246 27.8073C19.1827 26.5508 18.4117 25.9226 17.5265 25.7813C17.1784 25.7257 16.8236 25.7257 16.4754 25.7813C15.5902 25.9226 14.8192 26.5508 13.2773 27.8073C10.929 29.7208 9.75491 30.6775 8.92791 30.4519C8.61888 30.3675 8.3407 30.196 8.12666 29.9576C7.55386 29.3199 7.88192 27.8413 8.53804 24.884L8.64917 24.3832C9.00619 22.774 9.18469 21.9695 8.99794 21.2117C8.9631 21.0704 8.91904 20.9315 8.86604 20.7959C8.58191 20.069 7.97233 19.5144 6.75315 18.4052L5.94935 17.6739C3.54094 15.4827 2.33674 14.3872 2.6837 13.3555C3.03067 12.3239 4.65218 12.1787 7.8952 11.8882L8.25343 11.8562C10.235 11.6787 11.2257 11.59 11.9805 11.0288C12.7352 10.4677 13.1055 9.54445 13.8462 7.698L13.9072 7.54581Z" strokeWidth="3.5"/></svg>{text}</>
          case 'trash':
            return <><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.666 25L16.666 20" strokeWidth="3.5" strokeLinecap="round"/><path d="M23.334 25L23.334 20" strokeWidth="3.5" strokeLinecap="round"/><path d="M5 11.6667H35V11.6667C33.6036 11.6667 32.9053 11.6667 32.344 11.8632C31.3387 12.2149 30.5482 13.0054 30.1964 14.0108C30 14.5721 30 15.2703 30 16.6667V26.3334C30 29.6332 30 31.2832 28.9749 32.3083C27.9497 33.3334 26.2998 33.3334 23 33.3334H17C13.7002 33.3334 12.0503 33.3334 11.0251 32.3083C10 31.2832 10 29.6332 10 26.3334V16.6667C10 15.2703 10 14.5721 9.80359 14.0108C9.4518 13.0054 8.66134 12.2149 7.65598 11.8632C7.09467 11.6667 6.39645 11.6667 5 11.6667V11.6667Z" strokeWidth="3.5" strokeLinecap="round"/><path d="M16.7809 5.61765C16.9708 5.44046 17.3893 5.28388 17.9714 5.17221C18.5536 5.06053 19.2669 5 20.0007 5C20.7344 5 21.4477 5.06053 22.0299 5.17221C22.612 5.28388 23.0305 5.44046 23.2204 5.61765" strokeWidth="3.5" strokeLinecap="round"/></svg>{text}</>
          default:
            return <>{text}</>;
        }
      })()
      : <>{text}</>}
    </button>
  );
}) 

export default ActiveButton;