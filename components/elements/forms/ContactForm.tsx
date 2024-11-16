'use client'
import {enableScroll, isStringLengthValid, isValidEmail, alertErrorMessage} from "@/components/scripts/client/popup/popupHandler"
import Image from "next/image"
import { useRef } from "react";
import { MdClose } from 'react-icons/md'
import AutoTextarea from "@/components/elements/html/AutoTextarea";
import { CiCircleQuestion } from "react-icons/ci";

type props = {
  className?: string;
}

const ContactForm : React.FC<props> = ({className = ''}) => {
  const form = useRef<HTMLDivElement>(null)
  let isSubmitted = false; // Prevent a bot from submitting over and over again

  /// Form Functions
  function closeForm() {
    if (form) {
      enableScroll()
      form.current?.classList.remove("show");
      setTimeout(() => {
        form.current?.classList.remove("submitted");
      }, 1000)
    }
  }
  function radioClick(button: HTMLElement) {
    
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
      tags += `${button.textContent}|,`
    } else {
      tags = tags.replaceAll(`${button.textContent}|,`, '')
    }
  }

  /// Form 1 Inputs
  const form1Inputs = useRef<HTMLInputElement[]>([])
  const addToForm1Inputs = (el: HTMLInputElement) => {
    if (el && !form1Inputs.current.includes(el)) {
      form1Inputs.current.push(el)
    }
  }
  const form1Textarea1 = useRef<HTMLTextAreaElement | null>(null)

  let tags = ''

  const sendContactRequestEmail = async (contactRequestData = {}) => {
    const response = await fetch('/api/sendContactRequest', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactRequestData)
    })
  }

  return (
    <div id="ContactForm" ref={form} className={`ContactForm Popup theme-secondary init ${className}`}>
      <div className="backdrop"></div>
      <div className="wrapper">
        <div className="back">
          <button title="Close Contact Form" className="custom" onClick={closeForm}>
            <MdClose />
          </button>
          <svg className="mobile" width="81" height="95" viewBox="0 0 81 95" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52.2 2.29048e-06L63.5577 6.442L74.8899 12.9276L74.9154 25.8553L74.8899 38.7829L63.5577 45.2685L52.2 51.7105L40.8423 45.2685L29.5101 38.7829L29.4846 25.8553L29.5101 12.9276L40.8423 6.442L52.2 2.29048e-06Z" fill="#137C7D"/><path d="M75.2 43L86.5577 49.442L97.8899 55.9276L97.9154 68.8553L97.8899 81.7829L86.5577 88.2685L75.2 94.7105L63.8423 88.2685L52.5101 81.7829L52.4846 68.8553L52.5101 55.9276L63.8423 49.442L75.2 43Z" fill="url(#paint0_linear_367_1780)"/><path d="M15.339 48.3099L26.2 42.1497L37.061 48.3099L37.0643 48.3118L47.891 54.5082L47.9154 66.8533L47.9154 66.8572L47.891 79.2024L37.0643 85.3987L37.061 85.4006L26.2 91.5609L15.339 85.4006L15.3357 85.3987L4.50899 79.2024L4.4846 66.8572L4.4846 66.8533L4.50899 54.5082L15.3357 48.3118L15.339 48.3099Z" stroke="url(#paint1_linear_367_1780)" strokeWidth="2"/><defs><linearGradient id="paint0_linear_367_1780" x1="-172.225" y1="43" x2="225.111" y2="42.2812" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient><linearGradient id="paint1_linear_367_1780" x1="-221.225" y1="41" x2="176.111" y2="40.2812" gradientUnits="userSpaceOnUse"><stop stopColor="#8D7F61"/><stop offset="0.151457" stopColor="#F1DCAD"/><stop offset="0.267035" stopColor="#8E7B53"/><stop offset="0.382648" stopColor="#E5D9A9"/><stop offset="0.495657" stopColor="#8A724C"/><stop offset="0.620286" stopColor="#E5D9A9"/><stop offset="0.73364" stopColor="#8E7B53"/><stop offset="0.866263" stopColor="#F1DCAD"/><stop offset="1" stopColor="#8D7F61"/></linearGradient></defs></svg>

        </div>
        <div className="side">
          <div className="desktop">
            <div className="image">
              <Image priority src={`/images/sections/form/desktop-side.png`}width={1500}height={1500}alt={`Beautiful Interior`}/>
            </div>
            <div className="hexagon-image tilt">
              <div className="image"><Image priority src={`/images/sections/form/desktop-hex-1.png`}width={500}height={500}alt={`Beautiful Interior`}/></div>
            </div>
            <div className="hexagon-image tilt">
              <div className="image"><Image priority src={`/images/sections/form/desktop-hex-2.png`}width={500}height={500}alt={`Beautiful Interior`}/></div>
            </div>
          </div>
          <div className="mobile"><Image priority src={`/images/sections/form/mobile-side.png`}width={1500}height={1500}alt={`Beautiful Interior`}/></div>
        </div>
        <div className="content">
          <div className="slide-in">
            <div className="sct-header center">
              <h5>Connect</h5>
              <h2>Start Your Journey</h2>
              <p>Fill in your info, and we&apos;ll get back to you soon!</p>
            </div>
            <div className="two-input">
              <div className="one text-input ipt login-email">
                <div className="form__group field">
                  <input ref={addToForm1Inputs} name="name" type="text" className="form__field" maxLength={255} placeholder="a" />
                  <label className="form__label">First Name*</label>
                </div>
                <div className="error"></div>
              </div>
              <div className="one text-input ipt login-email">
                <div className="form__group field">
                  <input ref={addToForm1Inputs} name="name" type="text" className="form__field" maxLength={255} placeholder="a" />
                  <label className="form__label">Last Name*</label>
                </div>
                <div className="error"></div>
              </div>
            </div>

            <div className="one text-input ipt login-email">
              <div className="form__group field">
                <input ref={addToForm1Inputs} name="email" type="text" className="form__field" maxLength={255} placeholder="a" />
                <label className="form__label">Email*</label>
              </div>
              <div className="error"></div>
            </div>
            <div className="one text-input ipt login-email">
              <div className="form__group field">
                <input ref={addToForm1Inputs} name="phone" type="text" className="form__field" maxLength={255} placeholder="a" />
                <label className="form__label">Phone (optional)</label>
              </div>
              <div className="error"></div>
            </div>
            <div className="radio">
              <p>What Services are you interested in?</p>
              <div className="radioButtons">
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93658 16.8838L22.9039 5.06325C22.9621 5.02495 23.0376 5.02541 23.0953 5.06442L40.5577 16.8633C41.1048 17.233 41.8372 17.1628 42.3042 16.6958C42.9215 16.0785 42.8167 15.05 42.0876 14.5699L23.0695 2.04574C23.0272 2.01793 22.9726 2.01763 22.93 2.04497L3.43617 14.5767C2.69785 15.0514 2.58662 16.0866 3.20727 16.7073C3.66886 17.1689 4.39124 17.2426 4.93658 16.8838Z" strokeLinecap="round"/><path d="M6.5 16V41C6.5 41.5523 6.94772 42 7.5 42H38.2273C38.7796 42 39.2273 41.5523 39.2273 41V16" strokeLinecap="round"/><path d="M23 21.5L16.2071 14.7071C15.8166 14.3166 15.1834 14.3166 14.7929 14.7071L10.7071 18.7929C10.3166 19.1834 10.3166 19.8166 10.7071 20.2071L17.5 27" strokeLinecap="round"/><path d="M13.1832 31.3168L29.0858 15.4142C29.8668 14.6332 31.1332 14.6332 31.9142 15.4142L34.0858 17.5858C34.8668 18.3668 34.8668 19.6332 34.0858 20.4142L18.1832 36.3168C18.0631 36.4369 17.9142 36.5245 17.7508 36.5712L12.7307 38.0055C11.9764 38.221 11.279 37.5236 11.4945 36.7693L12.9288 31.7492C12.9755 31.5858 13.0631 31.4369 13.1832 31.3168Z" strokeLinecap="round"/><path d="M12.5 34.5C13 34.5 15 35.5 15 37" strokeLinecap="round"/><path d="M30 24.5L25 19.5" strokeLinecap="round"/><path d="M27.5 22.5L16.5 33" strokeLinecap="round"/><path d="M13 31.5L16.1323 32.8424C16.3684 32.9436 16.5564 33.1316 16.6576 33.3677L18 36.5" strokeLinecap="round"/><path d="M32.5 22L27.5 17" strokeLinecap="round"/><path d="M18.5 17L16.5 19" strokeLinecap="round"/><path d="M20.5 19.5L19.5 20.5" strokeLinecap="round"/><path d="M22.5 32L29.323 38.823C29.7015 39.2015 30.3111 39.2148 30.7058 38.853L35.2301 34.7057C35.6498 34.321 35.6641 33.6641 35.2615 33.2615L28.5 26.5" strokeLinecap="round"/><path d="M31 33L33 31" strokeLinecap="round"/><path d="M29.5 30L30.5 29" strokeLinecap="round"/></svg>Interior Redesign</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5H41.1693C41.7239 10.5 42.1726 10.9513 42.1693 11.5059L42.0016 39.7349C42.0007 39.8816 41.8816 40 41.7349 40H7.25C4.35051 40 2 37.6495 2 34.75V34.75C2 31.8505 4.35051 29.5 7.25 29.5H7.46333C7.48358 29.5 7.5 29.4836 7.5 29.4633V24.5M7.5 22V6C7.5 5.44772 7.04801 4.99059 6.5005 5.06304C2.84866 5.54631 2 8.71103 2 11.179V35" strokeLinecap="round"/><path d="M35.5 14H37.5C38.0523 14 38.5 14.4477 38.5 15V35C38.5 35.5523 38.0523 36 37.5 36H35.5" strokeLinecap="round"/><path d="M14.5 36H12C11.4477 36 11 35.5523 11 35V15C11 14.4477 11.4477 14 12 14H23C23.5523 14 24 14.4477 24 15V17" strokeLinecap="round"/><path d="M17 36H20M15 23.5H24M24 23.5H32C32.5523 23.5 33 23.9477 33 24.5V29.75M24 23.5V19.5M33 29.75V35C33 35.5523 32.5523 36 32 36H20M33 29.75H27.6509C27.0986 29.75 26.6509 30.1977 26.6509 30.75V33.5M20 36V28.5M17.5 28.5H23" strokeLinecap="round"/></svg>Floor Plan Layout</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 25.5V22.5H25.5V25.5M25.5 25.5H19.5V39C19.5 40.933 21.067 42.5 23 42.5V42.5C24.933 42.5 26.5 40.933 26.5 39V25.5H25.5Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 22.5V20.178C23 19.2075 23.6967 18.3771 24.6524 18.2084L39.1738 15.6458C39.6516 15.5615 40 15.1463 40 14.661V9.5C40 8.94772 39.5523 8.5 39 8.5H37" strokeLinecap="round" strokeLinejoin="round"/><path d="M29.5 13H35C36.1046 13 37 12.1046 37 11V5C37 3.89543 36.1046 3 35 3H9.5C8.39543 3 7.5 3.89543 7.5 5V11C7.5 12.1046 8.39543 13 9.5 13H13" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 13H27" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 3V6.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 9V16.75C13.5 17.7165 14.2835 18.5 15.25 18.5V18.5C16.2165 18.5 17 17.7165 17 16.75V7.25C17 6.2835 17.7835 5.5 18.75 5.5V5.5C19.7165 5.5 20.5 6.2835 20.5 7.25V9C20.5 10.1046 21.3954 11 22.5 11V11C23.6046 11 24.5 10.1046 24.5 9V3" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 5.5H5V10.5H7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Painting</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 20H11C9.89543 20 9 20.8954 9 22V28.5V31C9 31.2761 9.22386 31.5 9.5 31.5H22C22.2761 31.5 22.5 31.2761 22.5 31V22C22.5 20.8954 21.6046 20 20.5 20Z" strokeLinecap="round"/><path d="M22.5 29V29C22.5 28.1716 21.8284 27.5 21 27.5H10.5C9.67157 27.5 9 28.1716 9 29V29" strokeLinecap="round"/><path d="M22.5 27V25.25C22.5 24.0074 23.5074 23 24.75 23V23C25.9926 23 27 24.0074 27 25.25V33C27 34.1046 26.1046 35 25 35H6.5C5.39543 35 4.5 34.1046 4.5 33V25.25C4.5 24.0074 5.50736 23 6.75 23V23C7.99264 23 9 24.0074 9 25.25V28" strokeLinecap="round"/><path d="M7 35V37.5C7 38.0523 7.44772 38.5 8 38.5H8.04007C8.33199 38.5 8.60934 38.3724 8.79932 38.1508L11.5 35" strokeLinecap="round"/><path d="M24.5 35V37.5C24.5 38.0523 24.0523 38.5 23.5 38.5H23.4599C23.168 38.5 22.8907 38.3724 22.7007 38.1508L20 35" strokeLinecap="round"/><path d="M20.5 20V8C20.5 7.44772 20.9477 7 21.5 7H30.75M27 33.5H30.75M30.75 7H40C40.5523 7 41 7.44772 41 8V26M30.75 7V33.5M30.75 33.5H40C40.5523 33.5 41 33.0523 41 32.5V26M27 26H41" strokeLinecap="round"/><path d="M39.5 33.5V36C39.5 36.5523 39.0523 37 38.5 37H38.1594C37.7594 37 37.3978 36.7616 37.2403 36.3939L36 33.5" strokeLinecap="round"/><path d="M32.5 29V31" strokeLinecap="round"/><path d="M33 13V20" strokeLinecap="round"/><path d="M28 13V20" strokeLinecap="round"/><path d="M29 29V31" strokeLinecap="round"/></svg>Home Staging</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 33.5V5H18V33.5C18 36.5376 15.5376 39 12.5 39C9.46243 39 7 36.5376 7 33.5Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 25H18" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 18H18" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12H18" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12.5" cy="33.5" r="2"/><path d="M18.2416 10.041L20.5933 5L30 10.041L27.178 15.9693M18 35L24.2408 22.1395M27.178 15.9693L18.2416 11.0492M27.178 15.9693L24.2408 22.1395M24.2408 22.1395L18.2416 19.1149" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 28L18 27" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 38L28 29.1304M33.5882 25L39 21L32.5 12L27 16.5L33.5882 25ZM33.5882 25L28 29.1304M28 29.1304L24 23.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.5 33L20.5 30" strokeLinecap="round" strokeLinejoin="round"/></svg>Color Consulting</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><svg className="icon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 24.5H8C7.17157 24.5 6.5 25.1716 6.5 26C6.5 26.8284 7.17157 27.5 8 27.5H25C25.8284 27.5 26.5 26.8284 26.5 26C26.5 25.1716 25.8284 24.5 25 24.5Z" strokeLinecap="round"/><path d="M7.5 27.5V38.5" strokeLinecap="round"/><path d="M25 27.5V38.5" strokeLinecap="round"/><path d="M8 24.5L6.5 17.5H14" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.99997 17.5C7.3333 16 6 12.5 6 11C7 11.5 9 14 9.99999 15.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.4998 17.5C9.49972 15 10 10.5 11.4999 8.5C12.4999 10.5 12.9999 15 12.4999 17.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 17.5C15.5 16.5 16.5 13 16.5 11.5C15.5 12 14.5 13 13 14.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 17.5V20.5H23C24.1046 20.5 25 19.6046 25 18.5V18.5C25 17.3954 24.1046 16.5 23 16.5H15" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 24.5H14.5C13.3954 24.5 12.5 23.6046 12.5 22.5C12.5 21.3954 13.3954 20.5 14.5 20.5H25V24.5Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 24.5H18C16.8954 24.5 16 23.6046 16 22.5C16 21.3954 16.8954 20.5 18 20.5H25V24.5Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 16.5V7H38.5V24.5H26" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 14.5V9.5H35.5V22H30.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M29.567 12.75C29.7594 12.4167 30.2406 12.4167 30.433 12.75L33.0311 17.25C33.2235 17.5833 32.983 18 32.5981 18H27.4019C27.017 18 26.7765 17.5833 26.9689 17.25L29.567 12.75Z" strokeLinejoin="round"/><path d="M29 22C29 22.2761 28.7761 22.5 28.5 22.5C28.2239 22.5 28 22.2761 28 22C28 21.7239 28.2239 21.5 28.5 21.5C28.7761 21.5 29 21.7239 29 22Z" fill="black"/></svg>Custom Decor</div></button>
                <button className="css-hexagon" onClick={(e) => radioClick(e.currentTarget)}><div><CiCircleQuestion />I&apos;m Not Sure</div></button>
              </div>
            </div>
            <AutoTextarea ref={form1Textarea1} placeholder="Message" />
            <button onClick={() => {
              const name = form1Inputs.current.find((input) => input.name === 'name');
              const email = form1Inputs.current.find((input) => input.name === 'email');
              const phone = form1Inputs.current.find((input) => input.name === 'phone');
              const message = form1Textarea1.current;
              
              tags = tags.trim().slice(0, -2)

              let errors = document.querySelectorAll('.error');
              let inputs = document.querySelectorAll('input');
              errors.forEach(element => {
                element.textContent = '';
              });
              inputs.forEach(elm => {
                elm.classList.remove('inputError');
              })

              if (!name || !isStringLengthValid(name.value)) {
                alertErrorMessage("Name Invalid", "First name must have between 2 and 300 characters.", name);
                return;
              }
              if (!email || !isValidEmail(email.value)) {
                alertErrorMessage("Not a Proper Email", "Please make sure that your email is correct.", email);
                return;
              }
              sendContactRequestEmail({
                name: name.value,
                email: email.value, 
                phone: phone ? phone.value : "",
                tags: tags,
                message: message ? message.value : "",
              })
              form.current?.classList.add('submitted')
            }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm