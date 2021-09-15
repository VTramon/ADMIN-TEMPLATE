/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import Image from "next/dist/client/image";
import useAuth from "../../data/hook/useAuth";

interface UserAvatarProps {
  clasName?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();
  return (
    <Link href="/perfil">
      <img
        src={user?.imageUrl ?? "/images/Avatar.png"}
        alt="avatar do usuario"
        className={`
            h-10 w-10 rounded-full cursor-pointer
            ${props.clasName}
        `}
      />
    </Link>
  );
}
