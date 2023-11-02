import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import IUserIconProps from "@/types/IUserIconProps";

const UserIcon: React.FC<IUserIconProps> = ({ className = '' }) => {
  return (
    <Link href="/login">
      <FontAwesomeIcon className={className} icon={faUser} />
    </Link>
  );
};

export default UserIcon;
