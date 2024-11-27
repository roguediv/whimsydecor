import { Invoice, PrismaClient, User } from "@prisma/client";
import { ReturnField } from "./interface";
import { validateEmail, validateNumber, validatePassword, validatePhoneNumber, validateServices, validateString } from "./validation";
import { getSession } from "../auth/sessionManager";
import bcrypt from 'bcrypt';
import { endQuery } from "./queries";

const db = new PrismaClient();
type InvoiceKeys = keyof Invoice;

export async function CreateInvoice(Invoice: Partial<Invoice>): Promise<ReturnField> {
  "use server";
  /// Check if a prisma operation is running
  // if (!prismaExecutionService.startQuery()) 
  //   return { status: 0, title: "Server is Busy", desc: "Please retry in a moment.", data: null };

  /// Ensure the session is valid and store the user
  const session = await getSession();
  if (!session.user) return endQuery("Logged Out", "Refresh the page and try logging.");
  if (!session.user.access || session.user.access < 1) return endQuery("Bad Privileges", "You don't have the proper access level to make this change.");

  /// Check if user table can be retrieved
  const user = await db.user.findUnique({ where: { userID: session.user.userID } });
  if (!user) return endQuery("User not Found", "Could not find your account.");

  /// Build an array to create the invoice
  let invoiceDataArray: Partial<Invoice> = {};
  invoiceDataArray.userID = user.userID;
  invoiceDataArray.total = Invoice.total;
  invoiceDataArray.monthly = Invoice.monthly;
  invoiceDataArray.domain = Invoice.domain;
  invoiceDataArray.domainEmails = Invoice.domainEmails;
  invoiceDataArray.email = Invoice.email;
  invoiceDataArray.phone = Invoice.phone;
  invoiceDataArray.fName = Invoice.fName;
  invoiceDataArray.lName = Invoice.lName;
  invoiceDataArray.address = Invoice.address;
  invoiceDataArray.city = Invoice.city;
  invoiceDataArray.state = Invoice.state;
  invoiceDataArray.zipcode = Invoice.zipcode;

  /// Validate all items to ensure proper data is entering database
  let isError = false;
  let res: ReturnField = { status: -1, title: 'Something Went Wrong', desc: 'An unknown error occurred...', data: null };
  Object.keys(invoiceDataArray).forEach(key => {
    if (isError) return;
    switch (key) {
      case 'userID':
        res = validateNumber(invoiceDataArray.userID as number);
        res.title += ": User"
        if (res.status == 0) isError = true;
        break;
      case 'total':
        res = validateNumber(invoiceDataArray.total as number);
        res.title += ": Total"
        if (res.status == 0) isError = true;
        break;
      case 'monthly':
        res = validateNumber(invoiceDataArray.monthly as number);
        res.title += ": Total Per Month"
        if (res.status == 0) isError = true;
        break;
      case 'domain':
        res = validateString(invoiceDataArray.domain as string, "domain");
        if (res.status == 0) isError = true;
        break;
      case 'domainEmails':
        if (invoiceDataArray.domainEmails === '') break;
        res = validateString(invoiceDataArray.domainEmails as string, "domain emails", 1500);
        if (res.status == 0) isError = true;
        break;
      case 'fName':
        res = validateString(invoiceDataArray.fName as string, "first name");
        if (res.status == 0) isError = true;
        break;
      case 'lName':
        res = validateString(invoiceDataArray.lName as string, "last name");
        if (res.status == 0) isError = true;
        break;
      case 'email':
        res = validateEmail(invoiceDataArray.email as string);
        if (res.status == 0) isError = true;
        break;
      case 'phone':
        res = validatePhoneNumber(invoiceDataArray.phone as string);
        if (res.status == 0) isError = true;
        break;
      case 'address':
        res = validateString(invoiceDataArray.address as string, "address", 500);
        if (res.status == 0) isError = true;
        break;
      case 'city':
        res = validateString(invoiceDataArray.city as string, "city");
        if (res.status == 0) isError = true;
        break;
      case 'state':
        res = validateString(invoiceDataArray.state as string, "state", 2);
        if (res.status == 0) isError = true;
        break;
      case 'zipcode':
        res = validateString(invoiceDataArray.zipcode as string, "zipcode", 5);
        if (res.status == 0) {isError = true;break;}
        res = validateNumber(Number(invoiceDataArray.zipcode));
        res.title += ": Zipcode"
        if (res.status == 0) isError = true;
        break;
      default:
        return;
    }
  });

  if (isError) return endQuery(res.title, res.desc);

  /// Create the Invoice
  if (Object.keys(invoiceDataArray).length > 0) {
    let finalInvoice = await db.invoice.create({ data: invoiceDataArray });
    return { status: 1, title: "Successfully Created Invoice", desc: 'Your invoice has been generated.', data: finalInvoice.invoiceID};
  } else {
    return { status: 2, title: "Nothing to Change", desc: "You must have enered something incorrectly.", data: null };
  }
}