'use client'
import Image from "next/image";
import BtnForm from "../forms/BtnForm";

type Props = {
  className?: string;
  src?: string;
  blur?: string;
  title?: string;
  desc?: string;
  button1?: string;
  button2?: string;
};

const Action: React.FC<Props> = ({ className = '', src='', blur="Lets Work Together", title="Could we be the ideal fit for your project?", desc="Co-founded by Naomi and Brad Malon, we have been assisting families and businesses in crafting their dream interiors to perfection for more than 25 years.", button1="More About Us", button2="Connect"}) => {
  return (
    <section className={`Action ${className}`}>
      <div className="sct-content">
        <div className="two-grid">
          <div className="p-1">
            <h5>{blur}</h5>
            <h2>{title}</h2>
            <p>{desc}</p>
            <button className="white">{button1}</button>
          </div>
          <div className="image">
            <Image 
              src={`/images/sections/action/action-1.png`}
              width={1000}
              height={1000}
              alt={`Preview Icon for ${title}`} />
              <BtnForm form='ContactForm' text='Connect' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Action;