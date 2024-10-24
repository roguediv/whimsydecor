'use client'
import React, {forwardRef, useEffect, Ref, useRef, useState } from 'react';

type props = {
  className?: string;
  id?: string;
  loadText?: string;
  placeholder?: string;
  name?: string;
  Trigger?: (content: string) => Promise<void>;
}

const TextInput = forwardRef<HTMLTextAreaElement, props>(({className = "", id="", loadText = "", placeholder = "", name="", Trigger = () => {}}, ref) => {
  const [inputValue, setInputValue] = useState(loadText || "");
  if (!ref || !('current' in ref)) {
    ref = useRef<HTMLTextAreaElement | null>(null);
  }

  return (
    <div className="one text-input ipt">
      <div className="form__group field">
        <input id={id} name={name != '' ? name : placeholder} type={placeholder.includes("Password") ? "password" : "text"} className="form__field" maxLength={255} placeholder={placeholder} value={inputValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }} />
        <label className="form__label">{placeholder}</label>
      </div>
      <div className="error"></div>
    </div>
  );
}) 

export default TextInput;