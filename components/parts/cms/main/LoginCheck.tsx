'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

type props = {
  toHome?: boolean;
  trigger?: () => Promise<boolean>;
}

const LoginCheck : React.FC<props> = ({toHome = true, trigger = () => {return false}}) => {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      if (!await trigger()) {
        if (toHome) {
          router.push('/admin');
        }
      } else {
        if (!toHome) {
          router.push('/dashboard');
        }
      }
    };
    run();
    return () => {}
  }, [])

  return null;
}

export default LoginCheck