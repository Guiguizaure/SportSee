import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-sportsee.svg";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between pt-[18px] pb-[12px] bg-black">
        <div className="logo-wrapper ml-[29px]">
          <img className="logo" src={logo} alt="" />
        </div>
        <nav className="flex gap-[203px] text-[24px] font-medium leading-6 text-white last:mr-[87px]">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/profil"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profil
          </NavLink>
          <NavLink
            to="/reglage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Réglage
          </NavLink>
          <NavLink
            to="/communaute"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Communauté
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
