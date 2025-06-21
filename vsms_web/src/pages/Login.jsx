import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, initLoader } from "../features/user/user_slice";
import { Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useOutsideClicker } from "../utils/helper";
import { theme } from "../styles/theme";
import { AlertButton, PrimaryButton } from "../components/Button";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { InfoCard } from "../components/style/Card_styled";
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import { Toast } from '../components/Toast';
import { loadPage } from '../features/page/page_slice';
import { Loading } from '../components/Loading';

const LoginArea = styled.div`
  height: 300px;
  width: 400px;
  display: flex;  
`;

export const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const wraperRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutsideClicker(wraperRef, () => { setOpen(false) });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [fingerprint, setFingerprint] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [user_name, set_user_name] = useState("");
  const [user_pass, set_user_pass] = useState("");


  useEffect(() => {
    if (user.login) {
      if (localStorage.user_type == "ADM") {
        navigate("/app");
      } else {
        navigate("/pub");
      }
    }
  }, [user]);

  const handleClick = async (event) => {
    event.preventDefault();
    var loginData = {
      "username": user_name,
      "password": user_pass
    }
    if (user_name && user_pass) {
      dispatch(getLogin(loginData));
    }
  };

  const handleClickFinger = async (event) => {
    event.preventDefault();
    if (dirty && isValid && fingerprint) {
      console.log('Fingerprint:', fingerprint);
      // Example: send fingerprint to server or proceed with fingerprint-based authentication
    }
  };

  useEffect(() => {
    if (user.loading == "pending") {
      setIsLoading(true);
    } else if (user.loading == "succeeded") {
      setTimeout(() => { setIsLoading(false), dispatch(initLoader()); }, 5000);
    } else if (user.loading == "failed" || user.loading == "unauthorized") {
      set_user_pass("")
      setTimeout(() => { setIsLoading(false), dispatch(initLoader()); }, 5000);
    }
  }, [user.loading]);

  return (
    <>
      {(user.loading == "idle" || user.loading == "pending") ? <></> : (
        user.loading != "succeeded" && (
          <Toast color="error" msg={user.msg} />
        )
      )}
      <Suspense fallback={<Loader />}>
        <div style={{ display: "flex", width: "100%", height: "80vh", justifyContent: "center", alignItems: "center" }}>
          <LoginArea>
            <Flex row>
              <Flex padding="0 !important" md={12}>
                <InfoCard>
                  <FormStyled>
                    <Typography textAlign="center" fontSize="bodyTitleFontSize" margin="20px 0 0 0" fontWeight="bold">
                      Login
                    </Typography>
                    <Flex row>
                      <Flex padding="10px 0 0 0 !important" md="12">
                        <form>
                          <Label color="font" htmlFor="user_name">Username</Label>
                          <Input
                            type="text"
                            value={user_name}
                            placeholder="username"
                            name="user_name"
                            color={!user_name ? "error" : null}
                            onChange={(e) => {
                              set_user_name(e.target.value)
                            }}
                          />
                          <Label color="font" htmlFor="user_pass">Password</Label>
                          <Input
                            type="password"
                            name="user_pass"
                            value={user_pass}
                            placeholder="password"
                            color={!user_pass ? "error" : null}
                            onChange={(e) => {
                              set_user_pass(e.target.value)
                            }}
                          />
                          <Flex row>
                            <Flex md={12} padding={"0 !important"}>
                              <section>
                                <div>
                                  <Input type="checkbox" value="login" id="rememverMe" name="login" />
                                  <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">Remember Me</Label>
                                </div>
                                <div>
                                  <Typography fontSize="bodyContentFontSize" textAlign="left">
                                    <Link to="/reset">Forget Password</Link>
                                  </Typography>
                                </div>
                              </section>
                            </Flex>
                            <Flex row>
                              <Flex md={12} padding={"0 !important"}>
                                <AlertButton
                                  full
                                  color="primaryButton"
                                  type="submit"
                                  margin="0"
                                  onClick={handleClick}
                                >
                                  Login
                                </AlertButton>
                              </Flex>

                              <Flex md={12} padding={"10px 0 !important"}>
                                <Typography fontSize="bodyContentFontSize">
                                  Click here to <Link to="/pub-reg">Signup</Link>
                                </Typography>
                              </Flex>
                            </Flex>
                          </Flex>
                        </form>
                      </Flex>
                    </Flex>
                  </FormStyled>
                </InfoCard>
              </Flex>
            </Flex>
          </LoginArea>
        </div>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
};
