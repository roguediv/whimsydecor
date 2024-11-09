import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import ContactForm from "@/components/elements/forms/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: 'WhimsyDecor - Home Sweet Hive',
    template: '%s - WhimsyDecor'
  },
  description: 'WhimsyDecor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Nav/>
      {children}
      <Footer />
      <ContactForm />
    </main>
  );
}
