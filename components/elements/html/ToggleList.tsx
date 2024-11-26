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

  const states = [{ name: 'Alabama', abbreviation: 'AL' },{ name: 'Alaska', abbreviation: 'AK' },{ name: 'Arizona', abbreviation: 'AZ' },{ name: 'Arkansas', abbreviation: 'AR' },{ name: 'California', abbreviation: 'CA' },{ name: 'Colorado', abbreviation: 'CO' },{ name: 'Connecticut', abbreviation: 'CT' },{ name: 'Delaware', abbreviation: 'DE' },{ name: 'Florida', abbreviation: 'FL' },{ name: 'Georgia', abbreviation: 'GA' },{ name: 'Hawaii', abbreviation: 'HI' },{ name: 'Idaho', abbreviation: 'ID' },{ name: 'Illinois', abbreviation: 'IL' },{ name: 'Indiana', abbreviation: 'IN' },{ name: 'Iowa', abbreviation: 'IA' },{ name: 'Kansas', abbreviation: 'KS' },{ name: 'Kentucky', abbreviation: 'KY' },{ name: 'Louisiana', abbreviation: 'LA' },{ name: 'Maine', abbreviation: 'ME' },{ name: 'Maryland', abbreviation: 'MD' },{ name: 'Massachusetts', abbreviation: 'MA' },{ name: 'Michigan', abbreviation: 'MI' },{ name: 'Minnesota', abbreviation: 'MN' },{ name: 'Mississippi', abbreviation: 'MS' },{ name: 'Missouri', abbreviation: 'MO' },{ name: 'Montana', abbreviation: 'MT' },{ name: 'Nebraska', abbreviation: 'NE' },{ name: 'Nevada', abbreviation: 'NV' },{ name: 'New Hampshire', abbreviation: 'NH' },{ name: 'New Jersey', abbreviation: 'NJ' },{ name: 'New Mexico', abbreviation: 'NM' },{ name: 'New York', abbreviation: 'NY' },{ name: 'North Carolina', abbreviation: 'NC' },{ name: 'North Dakota', abbreviation: 'ND' },{ name: 'Ohio', abbreviation: 'OH' },{ name: 'Oklahoma', abbreviation: 'OK' },{ name: 'Oregon', abbreviation: 'OR' },{ name: 'Pennsylvania', abbreviation: 'PA' },{ name: 'Rhode Island', abbreviation: 'RI' },{ name: 'South Carolina', abbreviation: 'SC' },{ name: 'South Dakota', abbreviation: 'SD' },{ name: 'Tennessee', abbreviation: 'TN' },{ name: 'Texas', abbreviation: 'TX' },{ name: 'Utah', abbreviation: 'UT' },{ name: 'Vermont', abbreviation: 'VT' },{ name: 'Virginia', abbreviation: 'VA' },{ name: 'Washington', abbreviation: 'WA' },{ name: 'West Virginia', abbreviation: 'WV' },{ name: 'Wisconsin', abbreviation: 'WI' },{ name: 'Wyoming', abbreviation: 'WY' },];


  return (
    <ul className={`ToggleList ${isActive ? 'active' : ''}`}>
      <button className='custom' onClick={() => {setActive(!isActive)}}><IoChevronDown/>{title}</button>
      {textInputs.map((textInput, i) => {
        if (textInput.placeHolder == 'State') {
          return <li key={i}>
          <select title="State" defaultValue="" id={textInput.loadText}>
            <option value="" disabled>Select a State</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.abbreviation} - {state.name}
              </option>
            ))}
          </select>
          </li>
        }
        return (
          <li key={i}><TextInput className={textInput.className} id={textInput.id} loadText={textInput.loadText} placeholder={textInput.placeHolder} name={textInput.name} Trigger={textInput.trigger} /></li>
        )
      })}
    </ul>
  );
}) 

export default ToggleList;