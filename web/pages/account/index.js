import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Link from "next/link";

function AccountSettingsPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Account</p>
          <p className="text-lg">
            <span className="font-semibold">First Last</span> | email@email.com
            | &nbsp;
            <Link href="/profile">
              <span className="underline cursor-pointer">Go to profile</span>
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-14 mx-auto">
          <Link href="/account/info">
            <button className="py-6 rounded-lg shadow border">
              Personal Info
            </button>
          </Link>
          <Link href="/account/security">
            <button className="py-6 rounded-lg shadow border">
              Login & Security
            </button>
          </Link>
          <Link href="/account/privacy">
            <button className="py-6 rounded-lg shadow border">Privacy</button>
          </Link>
          <Link href="/account/preferences">
            <button className="py-6 rounded-lg shadow border">
              Preferences
            </button>
          </Link>
        </div>
        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettingsPage;