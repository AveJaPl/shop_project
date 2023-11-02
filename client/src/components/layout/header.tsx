import Link from "next/link";
import UserIcon from "../common/userIcon";

const Header = () => {
  return (
    <header className="p-8 w-full bg-indigo-500 text-white flex justify-between items-center shadow-lg">
      <div className="left">
        <Link href="/" className="text-lg font-semibold hover:text-indigo-300 transition duration-300">
          Home
        </Link>
      </div>
      <div className="right w-1/5 flex justify-around">
        <UserIcon className="h-8 w-8" />
      </div>
    </header>
  );
};

export default Header;
