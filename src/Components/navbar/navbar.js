import { NavLink, Outlet } from "react-router-dom";
import Styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <>
      <div className={Styles.navbar}>
        <NavLink to={"/"}>
          <div>Habit Trackker</div>
        </NavLink>
        <NavLink to={"/add"}>
          <div>Add habit</div>
        </NavLink>
        <NavLink to={'/'}>
          <div>Detail view</div>
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
