

'use client'
import TextInput from "@/components/elements/html/TextInput";
import { Invoice } from "@prisma/client";
import { useEffect, useState } from "react";

type props = {
  className?: string;
  hasDomainEmailSelector?: boolean;
  invoice?: Partial<Invoice> | null;
}

const CptInvoice : React.FC<props> = ({className = '', hasDomainEmailSelector = false, invoice=null }) => {
  let emailStartNum = 1;
  if (invoice) emailStartNum = 0;
  if (invoice && invoice.domainEmails) emailStartNum = invoice.domainEmails.split("|,").length;

  const [emailNum, setEmailNum] = useState(emailStartNum);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);

  useEffect(() => {
    getTotals();
  }, [emailNum]);

  const renderEmailRows = () => {
    const emailRows = [];
    for (let i = 0; i < emailNum; i++) {
      emailRows.push(
        <div key={i}>
          <div>Professional Domain Email</div>
          <div>$<div className="price monthlyPrice">12.75</div> <span>/m</span></div>
        </div>
      );
    }
    return emailRows;
  };

  const renderEmailInputs = () => {
    const emailInputs = [];
    for (let i = 0; i < emailNum; i++) {
      emailInputs.push(
        <TextInput className="iptBillingDomainEmail" key={i} placeholder={`Domain Email #${i + 1}`} loadText={invoice?.domainEmails?.split("|,")[i]} />
      );
    }
    return emailInputs;
  };

  const getTotals = () => {
    setTimeout(() => {
      let priceElms = document.querySelectorAll(".price");
      let monthlyElms = document.querySelectorAll(".monthlyPrice");
      let localTotalPrice = 0;
      let localMonthlyPrice = 0;
      priceElms.forEach((elm) => {
        const price = parseFloat(elm.innerHTML);
        if (isNaN(price)) return;
        localTotalPrice += price;
      })
      monthlyElms.forEach((elm) => {
        const price = parseFloat(elm.innerHTML);
        if (isNaN(price)) return;
        localMonthlyPrice += price;
      })
      setTotalPrice(localTotalPrice);
      setMonthlyPrice(localMonthlyPrice);

    }, 0)
  }

  return (
    <>
    <div className="invoice">
      <div className="header">
        <div>Item</div><div>Price</div>
      </div>
      <div>
        <div>Fully Cusomized Webapp</div>
        {/* <div> <span className="crossout">$31,500</span> FREE</div> */}
      </div>
      <div>
        <div>Custom Domain Transfer</div>
        <div>$<div className="price">12.82</div> <span style={{opacity: 0}}>/m</span></div>
      </div>
      <div>
        <div>Website Hosting</div>
        <div>$<div className="price monthlyPrice">17.00</div> <span>/m</span></div>
      </div>
      {renderEmailRows()}
      <div className="total">
        <div className="sm">Total:</div> <div className="sm">$<div>{(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
        {/* <div className="sm">Discount:</div> <div className="sm">- $<div>31,500.00</div></div> */}
        <div>Due Today:</div> <div>$<div className="dueTotal" id="divBillingTotal">{totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
        <div>Monthly:</div> <div>$<div className="monthlyTotal" id="divBillingMonthly">{monthlyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div> <span>/m</span></div>
      </div>
    </div>
    {hasDomainEmailSelector ? <>
      <p className="v2">How Many Professional Emails do you Require? These are emails that end in your domain name. <br /> Example: <b>help@whimsyhomedecor.com</b></p>
      <select defaultValue={emailNum} style={{width: '56px'}} title="email count" name="emails" id="iptBillingEmailCount" onChange={(e) => {
        const elm = e.target as HTMLSelectElement
        let num = elm.value;
        if (isNaN(Number(num)) || num.trim() === "") return;
        setEmailNum(Number(num));
      }}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {renderEmailInputs()}
    </> : <></>}

    </>
  )
}

export default CptInvoice