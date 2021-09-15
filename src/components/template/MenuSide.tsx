import useAuth from "../../data/hook/useAuth";
import { SettingsIcon, HomeIcon, BellIcon, ExitIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

interface MenuSideProps {}

export default function MenuSide() {
  const { logout } = useAuth();
  return (
    <aside
      className="
      flex flex-col
      bg-gray-200 text-gray-700
      dark:bg-gray-900 dark:text-white
      "
    >
      <div
        className={`
        flex flex-col items-center justify-center
      bg-gradient-to-r from-purple-600  to-yellow-600
        h-20 w-20
      `}
      >
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Início" icon={HomeIcon} />
        <MenuItem url="/ajustes" text="Ajustes" icon={SettingsIcon} />
        <MenuItem url="/notificacoes" text="Notificações" icon={BellIcon} />
      </ul>
      <ul>
        <MenuItem
          text="Sair"
          icon={ExitIcon}
          onClick={logout}
          className={`
            text-red-600 dark:text-red-400
            hover:bg-red-400 hover:text-white
            dark:hover:bg-red-600 dark:hover:text-white
          `}
        />
      </ul>
    </aside>
  );
}
