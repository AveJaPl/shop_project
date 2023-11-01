import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UserIcon = () => {
  return (
    <Link href="/login">
      <FontAwesomeIcon className=" w-4" icon={faUser} />
    </Link>
  );
};

export default UserIcon;
