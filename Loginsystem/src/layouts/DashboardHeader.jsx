import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderButton } from "../components/Button";
import { Menu } from "../components/Menu";
import { StyledDashboardHeader } from "../components/style/DashboardHeader_styled";
import { MenuItem } from "../components/style/MenuItem_styled";
import { Typography } from "../components/style/Typography_styled";
import { stringSearch, useOutsideClicker } from "../utils/helper";
import { getLogout } from "../features/user/user_slice";

export const DashboardHeader = forwardRef(({ title }, ref) => {
  const allMenus = JSON.parse(localStorage.getItem("menu") || "[]")
    .map((d) =>
      !!d.sub_module
        ? d.sub_module.map((d) => ({
          name: d.sub_module_name,
          link: d.page_name,
        }))
        : { name: d.module_name
          , link: d.page_name }
    )
    .flat();
  const [open, setOpen] = useState(false); 
  const [pageName, setPageName] = useState(""); 
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wraperRef = useRef(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state) => state.user);

  const fullname = useSelector((state) => state.user.fullname);
  const page = useSelector((state) => state.page);
 
  useEffect(() => { 
    setSearchOpen(false); 
    setPageName(location.pathname.replace("/app/",""));
  }, [location]);

  useOutsideClicker(wraperRef, () => {
    setOpen(false); 
  });
  function logoutHandle(e) {
    dispatch(getLogout());
  }
  function profileHandle(e) { 
    setOpen(false);
    navigate("/app/profile");
  }
  function cngPassHandle(e) { 
    setOpen(false);
    navigate("/app/change-pass");
  }

  useEffect(() => {
    // if (!user.login) { 
    //   navigate("/login");
    // }
    if (search != "") {
      stringSearch(allMenus, search, "name").then((d) => {
        setSearchOpen(true); 
      });
    } else {
      setSearchOpen(false); 
    }
  }, [user, search]);

  


  return (
   <>
    <Suspense>
      <StyledDashboardHeader>
        <div>
          <a ref={ref}>
            <span className="material-icons md-36">menu</span>
          </a>
          <span>{(page.title)}</span>   
                 {page.button && (
            <HeaderButton fontColor="font" onClick={page.onClick}>
              {page.prefixIcon && (<span className="material-icons">{page.prefixIcon}{"  "}</span>)}
              {(page.buttonText)}
              {page.buttonIcon && (<span className="material-icons">{page.buttonIcon}</span>)}
            </HeaderButton>
          )}

          <div>
            
            <ul>
             
              <li ref={wraperRef}>
                <a onClick={() => setOpen(!open)}>
                  {/* <Avatar /> */}
                  <div>{fullname}</div>
                  <span
                    className="material-icons md-18"
                    style={{ verticalAlign: "center" }}
                  >
                   arrow_drop_down
                  </span>
                </a>
                <Menu open={open} >
                  <MenuItem active={pageName=='profile'} onClick={profileHandle}>
                  <Typography color="font" textAlign="left">{("Profile")}</Typography>
                  </MenuItem>
                  <MenuItem active={pageName=='change-pass'} onClick={cngPassHandle}>
                  <Typography color="font"  textAlign="left">{("Change Password")}</Typography>
                  </MenuItem>
                 
                  <MenuItem onClick={logoutHandle} highlight>
                  <Typography  color="font" textAlign="left">{('logout')}</Typography>
                  </MenuItem>
                </Menu>
              </li>
            </ul>
          </div>
        </div>
      </StyledDashboardHeader> 
    </Suspense>
    
   </>
  );
});
