import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useOutsideClicker } from "../utils/helper";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { StyledNavbar } from "./style/navbar_styled";
import { PublicMenu } from "./PublicMenu";
import { Typography } from "./style/Typography_styled";
import logo from "../assets/image/strl.png";

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const wraperRef = useRef(null); 
  const navigate = useNavigate();

  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });
 
  useEffect(() => { 
    if (user.login) {
      if (localStorage.user_type == "ADM") {
        navigate("/app");
      } else {
        navigate("/pub");
      } 
    }
  }, [user]);
  
  return (
    <Suspense fallback={<Loader />}> 
      <Container border={"none"}> 
        <StyledNavbar>
          <Container border={"none"} padding="10px">
            <div>
               <a href={"/"}><img src={logo}></img></a>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to="/reg"><Typography
                    textAlign="left"
                    color="primaryFont"
                    fontSize="font"
                  >{("Become a Promoter")}</Typography></NavLink>
                </li>
                <li>
                  <NavLink to="/login"><Typography
                    textAlign="left"
                    color="primaryFont"
                    fontSize="font"
                  >{("login")}</Typography></NavLink>
                </li>
              </ul>
            </div>
          </Container>
        </StyledNavbar>

      </Container>
    </Suspense>
  );
};
