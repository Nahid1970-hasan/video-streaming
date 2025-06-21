import { StyledSidebar } from "../components/style/Sidebar_styled";
import logo from "../assets/image/strl.png"
import { Link, NavLink } from "react-router-dom";
import { useRef } from "react";
import { forwardRef } from "react";
import { SidebarMenu } from "../components/SidebarMenu";

export const SideBar = forwardRef((_, ref) => {
  const scrollRef = useRef(null);

  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);

    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;

    element.style.height = scrollHeight * 100 + "%";

    element.style.transform =
      "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }

  const menu = JSON.parse(localStorage.getItem("menu")) || [];

  return (
    <>
      <StyledSidebar ref={ref}>
        <div onScroll={handleScroll}>
          <div className="logo">
            <Link to="/app">
              <img src={logo} alt="LOGO" />
            </Link>
          </div>
          <ul>
            {/* {menu.map((item, i) => (
              <SidebarMenu key={i} item={item} />
            ))} */}
            <li>
              <NavLink to="/app">
                <span className="material-icons md-18">dashboard</span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <ul>
                <li>
                  <NavLink to="/app/faq">
                    FAQ Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/adm-users">
                    User Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/auditlog">
                    Audit Log
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="collapsible collapsed" >
              <a href="/#/app">
                <span className="material-icons md-18">person</span>
                Setting
              </a>
              <ul>
                <li>
                  <NavLink to="/app/email">
                    Email Config
                  </NavLink>
                </li>

              </ul>
            </li>


          </ul>
        </div>

        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledSidebar>
      <div className=""></div>
    </>
  );
});
