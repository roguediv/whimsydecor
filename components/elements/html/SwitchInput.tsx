'use client'
import React, {forwardRef, useEffect, Ref, useRef, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { prismaExecutionService } from '@/components/scripts/database/PrismaExecutionService';


type props = {
  className?: string;
  id?: string;
  loadText?: string;
  placeholder?: string;
  name?: string;
  checked?: boolean;
  Trigger?: () => Promise<boolean>;
}

const SliderInput = forwardRef<HTMLInputElement, props>(({className = "", id = "", loadText = "", placeholder = "", name="", checked=false, Trigger = () => {return false}}, ref) => {
  const [isChecked, setIsChecked] = useState(checked);
  if (!ref || !('current' in ref)) {
    ref = useRef<HTMLInputElement | null>(null);
  }
  async function onClick() {
    setIsChecked((prev) => !prev);
  }

  return (
    <label className="SwitchInput" aria-label="Toggle switch for enabling/disabling...">
      <input id={id} ref={ref} name='boolean' type="checkbox" checked={isChecked} onChange={onClick} />
      <span className="slider round"></span>
    </label>
  );
}) 

export default SliderInput;