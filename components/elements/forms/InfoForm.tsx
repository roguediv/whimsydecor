'use client'
import {enableScroll} from "@/components/scripts/client/popup/popupHandler"
import { useRef} from "react";
import { MdClose } from 'react-icons/md'
import { FiInfo } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

type props = {
  className?: string;
}

const ContactForm : React.FC<props> = ({className = ''}) => {
  const form = useRef<HTMLDivElement>(null)

  /// Form Functions
  function closeForm(value: string = "0") {
    if (form) {
      enableScroll()
      if (!form.current) return;
      form.current.classList.remove("show");
      if (form.current.classList.contains('waiting')) {
        form.current.dataset.response = value;
      }
    }
  }

  return (
    <div id="InfoForm" ref={form} className={`Popup theme-secondary init ${className}`} data-response="-1">
      <div className="backdrop"></div>
      <div className="wrapper">
        <div className="back">
          <div className="loader"></div>
          <div className="info">
            <FiInfo />
          </div>
          <div className="success"><FaRegCheckCircle /></div>
          <button title="Close Form" className="custom" onClick={() => closeForm()}>
            <MdClose />
          </button>
        </div>
        <div className="content">
          <h5>Test Title</h5>
          <p className="v2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quo tempore facilis suscipit quam possimus eveniet ea adipisci incidunt quas, quod vitae totam corporis repellat optio, voluptatibus mollitia ratione a.</p>
          <div className="btns">
            <button className="alt" onClick={() => closeForm("1")}>Yes</button>
            <button className="orange" onClick={() => closeForm("0")}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm