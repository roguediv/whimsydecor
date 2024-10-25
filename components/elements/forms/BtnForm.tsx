'use client'
import {disableScroll} from "../../scripts/client/popup/popupHandler"

type props = {
  className?: string;
  form: string;
  text?: string;
  createAccessLog?: (log: string, ip: string) => Promise<void>;
}

const BtnForm : React.FC<props> = ({className = '', form, text="Join Mailing List", createAccessLog}) => {
  return (
    <button className={`BtnForm ${className}`} onClick={async () => {
      var contactFormElement = document.getElementById(form);
      if (contactFormElement) {
        disableScroll()
        contactFormElement.classList.remove("init");
        contactFormElement.classList.add("show");
        const mainElement = document.querySelector('main');
      }
    }}>
      {text}
    </button>
  )
}

export default BtnForm