/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import Image from "next/dist/client/image";
import useAuth from "../../data/hook/useAuth";

interface AvatarUsuarioProps {
  clasName?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  return (
    <Link href="/perfil">
      <img
        src={usuario?.imagemUrl ?? "/images/Avatar.png"}
        alt="avatar do usuario"
        className={`
            h-10 w-10 rounded-full cursor-pointer
            ${props.clasName}
        `}
      />
    </Link>
  );
}
