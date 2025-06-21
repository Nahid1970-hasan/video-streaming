import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useOutsideClicker } from "../utils/helper";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { StyledNavbar } from "./style/navbar_styled";
import { PublicMenu } from "./PublicMenu";
import { Typography } from "./style/Typography_styled";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const wraperRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });

  // useEffect(() => {
  //   dispatch(loadTodayStatus());
  // }, []);

  return (
    <Suspense fallback={<Loader />}>

      <Container border={"none"}>

        <StyledNavbar>
          <Container border={"none"}>
            <div>
              <ul>
                <PublicMenu />
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to="/login"><Typography
                    textAlign="left"
                    color="font"
                    fontSize="navFont"
                  >{("Login")}</Typography></NavLink>
                </li>
              </ul>
            </div>
          </Container>
        </StyledNavbar>
       
      </Container>
    </Suspense>
  );
};
