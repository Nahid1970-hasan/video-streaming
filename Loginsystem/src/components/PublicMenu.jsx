import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";

export const PublicMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false);
  const subModRef = useRef(null);
  useOutsideClicker(subModRef, () => { setSubMod(false) });
  // State to manage visibility of submenus
  const [showSkillsMenu, setShowSkillsMenu] = useState(false);

  // Function to toggle skills submenu
  const toggleSkillsMenu = () => {
    setShowSkillsMenu(!showSkillsMenu);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li >
          <a href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#/reg">
              Promoter Registration
            </a>
          </li>
        </ul>
      </nav>



    </>

  );
};
