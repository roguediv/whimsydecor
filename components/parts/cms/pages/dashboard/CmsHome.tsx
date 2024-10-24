'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

type props = {
  className?: string;
  name?: string;
}

const CmsHome : React.FC<props> = ({className = '', name = "User"}) => {
  return (
    <>
    <div className="sct-header header-back theme-dark center">
      <h4>Welcome to Your Whimsy Workspace, {name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h4>
      <p>Start your creative journey by creating a new project for your Our Work page, updating client testimonials, or editing your contact email to keep Whimsy Decor up-to-date!</p>
    </div>
    </>
  )
}

export default CmsHome