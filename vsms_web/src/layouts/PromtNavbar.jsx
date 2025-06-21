import { Suspense, forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../components/style/Container_styled";
import { Loader } from "../components/style/Loader_styled";

import { Flex } from "../components/style/Flex_styled";
import logo from "../assets/image/strl.png";
import { PublicMenu } from "../components/PublicMenu";
import { StyledCustomNavbar } from "../components/style/Custom_Navbar";
import { useLocation } from "react-router-dom";
import { Menu } from "../components/Menu";
import { MenuItem } from "../components/style/MenuItem_styled";
import { Typography } from "../components/style/Typography_styled";
import { useOutsideClicker } from "../utils/helper";
import { getLogout } from "../features/user/user_slice";
import { Loading } from "../components/Loading";

export const PromtNavbar = forwardRef((_, ref) => {
  const user = useSelector((state) => state.user);
  const fullname = useSelector((state) => state.user.fullname);
  const dispatch = useDispatch();
  const [position, set_postion] = useState("sticky");
  const wraperRef = useRef(null);
  const location = useLocation();
  const [pageName, setPageName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading]=useState(false)
  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });

  const MODULES = JSON.parse(localStorage.getItem("menu")) || [];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        set_postion("fixed")
      } else {
        set_postion("sticky")
      }
    })

  }, []);

  useEffect(() => {
    setPageName(location.pathname.replace("/app/", ""));
  }, [location]);

  function logoutHandle(e) {
    dispatch(getLogout());
  }
  function profileHandle(e) {
    setOpen(false);
    //navigate("/app/profile");
  }
  function cngPassHandle(e) {
    setOpen(false);
    // navigate("/app/change-pass");
  }
  useEffect(() => {
    user.lgoutloading == "pending"?setIsLoading(true):setTimeout(() =>setIsLoading(false), 2000);
  }, [user.lgoutloading]); 
  return (<> 
    <Suspense fallback={<Loader />}>
      <StyledCustomNavbar position={position}>
        <div>
          <ul>
            <a href={"/"}><img src={logo}></img></a>
            <span ref={ref} className="material-icons md-36">menu</span>
          </ul>
          <ul>
            {MODULES?.map((item, i) => (
              <PublicMenu key={i} item={item} />
            ))}
            <li ref={wraperRef}>
              <a style={{ display: "inline-flex" }} onClick={() => setOpen(!open)}>
                <div> <Typography color="primaryFont" fontSize="bodySubTitleFontSize" textAlign="left">{fullname || "User"}</Typography></div>
                <span
                  className="material-icons md-18"
                  style={{ verticalAlign: "middle" }}
                >
                  arrow_drop_down
                </span>
              </a>
              <Menu open={open} last="10px" top={"auto"}>
                <MenuItem active={pageName == 'profile'} onClick={profileHandle}>
                  <Typography color="font" fontSize="font" textAlign="left">{"Porfile"}</Typography>
                </MenuItem>
                <MenuItem active={pageName == 'change-pass'} onClick={cngPassHandle}>
                  <Typography color="font" fontSize="font" textAlign="left">{"Change Password"}</Typography>
                </MenuItem>
                <MenuItem onClick={logoutHandle} highlight>
                  <Typography color="font" fontSize="font" textAlign="left">{'Logout'}</Typography>
                </MenuItem>
              </Menu>
            </li>
          </ul>

        </div>
      </StyledCustomNavbar>
    </Suspense>
    <Loading open={isLoading}/>
    </>
  );
});
