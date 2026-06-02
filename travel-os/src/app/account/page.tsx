import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSettings from "@/components/account/AccountSettings";

export const metadata = { title: "Account Settings — Travel OS" };

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <AccountSettings />
      </main>
      <Footer />
    </>
  );
}
