'use client'
import React, {forwardRef, useRef, useState } from 'react';
import TextInput from './TextInput';
import { IoChevronDown } from 'react-icons/io5';

type props = {
  className?: string;
  id?: string;
  title: string;
  textInputs?: {className?: string; id?: string; loadText?: string; placeHolder?: string, name?: string;trigger?: (content: string) => Promise<void>;}[];
}

const ToggleList = forwardRef<HTMLTextAreaElement, props>(({className = "", id="", title, textInputs = []}, ref) => {
  const [isActive, setActive] = useState(false);
  if (!ref || !('current' in ref)) {
    ref = useRef<HTMLTextAreaElement | null>(null);
  }

  return (
    <ul className={`ToggleList ${isActive ? 'active' : ''}`}>
      <button className='custom' onClick={() => {setActive(!isActive)}}><IoChevronDown/>{title}</button>
      {textInputs.map((textInput, i) => {
        return (
          <li key={i}><TextInput className={textInput.className} id={textInput.id} loadText={textInput.loadText} placeholder={textInput.placeHolder} name={textInput.name} Trigger={textInput.trigger} /></li>
        )
      })}
    </ul>
  );
}) 

export default ToggleList;