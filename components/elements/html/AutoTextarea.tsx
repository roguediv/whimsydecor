'use client'
import React, {forwardRef, useEffect, Ref, useRef } from 'react';
import { Montserrat } from 'next/font/google';


type props = {
  className?: string;
  loadText?: string;
  placeholder?: string;
  id?: string;
  Trigger?: (content: string) => Promise<void>;
}

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const AutoTextarea = forwardRef<HTMLTextAreaElement, props>(({className = "", loadText = "", placeholder = "", id="", Trigger = () => {}}, ref) => {
  if (!ref || !('current' in ref)) {
    ref = useRef<HTMLTextAreaElement | null>(null);
  }
  useEffect(() => {
    
    if (!ref || !('current' in ref)) return;
    // Function to auto-resize the textarea
    const autoTextarea = () => {
      if (!ref || !('current' in ref)) return;
      const textarea = ref.current;
      if (textarea) {
        textarea.style.height = 'auto'; // Reset the height to calculate the actual scroll height
        textarea.style.height = (textarea.scrollHeight + 5) + 'px'; // Set the height to the calculated scroll height
      }
    };

    // Call the autoTextarea function on input (when the user types)
    const handleInput = () => {
      autoTextarea();
    };

    // Attach event listener
    const textarea = ref.current;
    if (textarea) {
      textarea.addEventListener('input', handleInput);
      autoTextarea(); // Resize initially if there is pre-filled content
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', handleInput);
      }
    };
  }, []);

  return (
    <textarea className={className} id={id} style={montserrat.style}
      ref={ref}
      rows={2}
      placeholder={placeholder}
      defaultValue={loadText}
      onBlur={async (event) => {Trigger(event.target.value)}}
    />
  );
}) 

export default AutoTextarea;