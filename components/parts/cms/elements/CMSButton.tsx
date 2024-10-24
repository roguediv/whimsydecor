"use client"
import { ReturnField } from '@/components/scripts/database/interface';
import { removeAllInputErrors } from '@/components/scripts/database/validation';
import { StartInfoForm, UpdateInfoForm } from '@/components/scripts/client/popup/InfoHandler';
import { useRouter } from 'next/navigation';

type props = {
  className?: string;
  text?: string;
  type?: string;
  trigger?: (formData : FormData) => Promise<ReturnField>;
}

const CMSButton: React.FC<props> = ({className = '', text="Button", type="",
  trigger = () => {return {status: -1, message: "Update project function not loaded.", data: null}},
}) => {
  if (text == 'Login') {
    const router = useRouter();
    return (
      <button className={className} onClick={async () => {
        console.log('test')
        removeAllInputErrors();

        /// Set up variables for data inputs
        const iptUserEmail : HTMLInputElement = document.getElementById('iptUserEmail') as HTMLInputElement;
        const iptUserPassword : HTMLInputElement = document.getElementById('iptUserPassword') as HTMLInputElement;

        const formData = new FormData();
        formData.append("email", iptUserEmail.value)
        formData.append("password", iptUserPassword.value)
        
        StartInfoForm({title: "Logging on...", desc: "You are being signed in."});
        let rtn :ReturnField = await trigger(formData) as ReturnField;
        if (rtn.status == 1) {
          router.push('/dashboard');
        }
        else {
          UpdateInfoForm({title: rtn.title, desc: rtn.desc}, true, false);
        }
      }}>{text}</button>
    )
  } else if (type === '') {
    return (
      <>
      </>
    )
  } else {
    return (
      <button className={className}>{text}</button>
    )
  }
}

export default CMSButton
