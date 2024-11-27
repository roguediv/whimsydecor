

'use client'
import { ReturnField } from "@/components/scripts/database/interface";
import { prismaExecutionService } from "@/components/scripts/database/PrismaExecutionService";
import { endClientQuery } from '@/components/scripts/database/clientQueries';
import { useRouter } from "next/navigation";
import { CloseInfoForm, StartInfoForm } from "@/components/scripts/client/popup/InfoHandler";
import { Invoice } from "@prisma/client";
import { ConvertToSubcurrency } from "./functions";
import { removeAllInputErrors } from "@/components/scripts/database/validation";

type props = {
  className?: string;
  SubmitInvoice?: (invoice: Partial<Invoice>) => Promise<ReturnField>;
}

const SubmitInvoiceButton : React.FC<props> = ({className = '', SubmitInvoice = (invoice: Partial<Invoice>) => {return {status: 0, title: "Error", desc: "Error", data: {}}} }) => {
  const router = useRouter();
  return (
    <button className={`SubmitInvoiceButton ${className}`} onClick={async () => {
      if (!prismaExecutionService.startQuery()) return; // Check if any other db queries are running
      removeAllInputErrors();
      StartInfoForm({title: "Loading...", desc: ""}, false)
      const iptBillingDomainName : HTMLInputElement = document.getElementById('iptBillingDomainName') as HTMLInputElement;
      const iptBillingFName : HTMLInputElement = document.getElementById('iptBillingFName') as HTMLInputElement;
      const iptBillingLName : HTMLInputElement = document.getElementById('iptBillingLName') as HTMLInputElement;
      const iptBillingEmail : HTMLInputElement = document.getElementById('iptBillingEmail') as HTMLInputElement;
      const iptBillingPhone : HTMLInputElement = document.getElementById('iptBillingPhone') as HTMLInputElement;
      const iptBillingAddress : HTMLInputElement = document.getElementById('iptBillingAddress') as HTMLInputElement;
      const iptBillingCity : HTMLInputElement = document.getElementById('iptBillingCity') as HTMLInputElement;
      const iptBillingState : HTMLSelectElement = document.getElementById('iptBillingState') as HTMLSelectElement;
      const iptBillingZipcode : HTMLInputElement = document.getElementById('iptBillingZipcode') as HTMLInputElement;

      const divBillingTotal : HTMLDivElement = document.getElementById('divBillingTotal') as HTMLDivElement;
      const divBillingMonthly : HTMLDivElement = document.getElementById('divBillingMonthly') as HTMLDivElement;

      const iptBillingDomainEmails = document.querySelectorAll<HTMLInputElement>('.iptBillingDomainEmail');

      let Invoice : Partial<Invoice> = {};
      if (iptBillingDomainName) Invoice.domain = iptBillingDomainName.value;
      if (iptBillingFName) Invoice.fName = iptBillingFName.value;
      if (iptBillingLName) Invoice.lName = iptBillingLName.value;
      if (iptBillingEmail) Invoice.email = iptBillingEmail.value;
      if (iptBillingPhone) Invoice.phone = iptBillingPhone.value;
      if (iptBillingAddress) Invoice.address = iptBillingAddress.value;
      if (iptBillingCity) Invoice.city = iptBillingCity.value;
      if (iptBillingState) Invoice.state = iptBillingState.value;
      if (iptBillingZipcode) Invoice.zipcode = iptBillingZipcode.value;
      console.log("select: ", iptBillingState.value)

      if (divBillingTotal && !isNaN(ConvertToSubcurrency(Number(divBillingTotal.innerHTML)))) Invoice.total = ConvertToSubcurrency(Number(divBillingTotal.innerHTML));
      if (divBillingMonthly && !isNaN(ConvertToSubcurrency(Number(divBillingMonthly.innerHTML)))) Invoice.monthly = ConvertToSubcurrency(Number(divBillingMonthly.innerHTML));

      let domainEmailString = '';
      for (let i = 0; i < iptBillingDomainEmails.length; i++) {
        let value = iptBillingDomainEmails[i].value
        if (value === '') value = `Email ${i + 1}`;
        domainEmailString += `${value}|,`
      }
      domainEmailString = domainEmailString.endsWith("|,") ? domainEmailString.slice(0, -2) : domainEmailString;
      Invoice.domainEmails = domainEmailString;

      const url = await SubmitInvoice(Invoice);

      if (!url) return endClientQuery("That Didn't Work", "Please try again later.");
      if (url.status !== 1 ) {
        if (url.title.includes("Domain")) iptBillingDomainName.classList.add('inputError');
        if (url.title.includes("Email")) iptBillingEmail.classList.add('inputError');
        if (url.title.includes("Phone")) iptBillingPhone.classList.add('inputError');
        if (url.title.includes("First name")) iptBillingFName.classList.add('inputError');
        if (url.title.includes("Last name")) iptBillingLName.classList.add('inputError');
        if (url.title.includes("Address")) iptBillingAddress.classList.add('inputError');
        if (url.title.includes("City")) iptBillingCity.classList.add('inputError');
        if (url.title.includes("State")) iptBillingState.classList.add('inputError');
        if (url.title.includes("Zipcode")) iptBillingZipcode.classList.add('inputError');

        return endClientQuery(url.title, url.desc);
      }

      prismaExecutionService.endQuery();
      await router.push(`/dashboard/settings/billing/${url.data}`);
      CloseInfoForm();
    }}>Submit</button>
  )
}

export default SubmitInvoiceButton