import useAppData from "../../data/hook/useAppData";
import UserAvatar from "./UserAvatar";
import ChangeThemeButton from "./ChangeThemeButton";
import Title from "./Title";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header(props: HeaderProps) {
  const { theme, changeTheme } = useAppData();

  return (
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={`flex flex-grow justify-end items-center`}>
        <ChangeThemeButton theme={theme} changeTheme={changeTheme} />
        <UserAvatar clasName="ml-3" />
      </div>
    </div>
  );
}
