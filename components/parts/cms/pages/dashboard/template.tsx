'use client'
import { useEffect, useState } from "react";

type props = {
  className?: string;
}

const CmsHome : React.FC<props> = ({className = ''}) => {
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  useEffect(() => {

    return () => {

    }
  }, [])
  return (
    <>
    </>
  )
}

export default CmsHome