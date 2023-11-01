import Link from "next/link";
import UserIcon from "../common/userIcon";

const Header = () => {
  return (
    <header className="p-8 w-full bg-cyan-100 text-black flex justify-between">
      <div className="left">
        <Link href="/"> Home </Link>
      </div>
      <div className="right w-1/5 flex justify-around">
        {/* use UserIcon with size props here: */}
        <UserIcon/>
      </div>
    </header>
  );
};

export default Header;
