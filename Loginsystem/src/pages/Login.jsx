import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../features/user/user_slice";
import { Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useOutsideClicker } from "../utils/helper";
import { PrimaryButton } from "../components/Button";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { InfoCard } from "../components/style/Card_styled";
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import { Formik } from 'formik';
import { loadPage } from '../features/page/page_slice';

const Body = styled.div`
  height: 60vh;
`;

export const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const wraperRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutsideClicker(wraperRef, () => { setOpen(false) });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getFingerprint = async () => {
  //     const fp = await FingerprintJS.load();
  //     const result = await fp.get();
  //     const formRef = useRef(null);
  //     setFingerprint(result.visitorId);
  //   };

  //   getFingerprint();
  // }, []);

  // const handleClick = async (event) => {
  //   event.preventDefault();
  //   navigate('/dashboard');
  // };
  useEffect(() => {
    if (user.login) {
      dispatch(loadPage({ title: "Dashboard" }));
      navigate("/app");
    }
  }, [user]);

  const submitbuttonForm = (values) => {
    dispatch(getLogin(values));


  };

  const initialValues = {
    username: '',
    password: ''
  };
  const validate = (values) => {

    let errors = {};
    if (!values.username) {
      errors.username = ("Invalid username");
    }
    if (!values.password) {
      errors.password = ("Invalid password");
    } else if ((values.password.length < 5)) {
      errors.password = ("password is so long");
    }

    return errors;
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container style={{ position: 'relative', overflow: 'hidden' }}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitbuttonForm}
            innerRef={formRef}
          >
            {(formik) => {

              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty,
                setFieldValue,
                resetForm
              } = formik;


              return (
                <div >
                    <Flex row>
                      <Flex md={4}></Flex>
                      <Flex padding="10px 0 10px 0 !important" md={4} sm={12}>
                        <InfoCard margin="0 0 30px 0">
                          <FormStyled>
                            <>
                              <Typography textAlign="center" fontSize="bodyTitleFontSize" margin="20px 0 0 0" fontWeight="bold">
                                LogIn
                              </Typography>
                              <div>
                                <Flex row>
                                  <Flex padding="10px 0 0 0 !important" md="12">
                                    <form onSubmit={handleSubmit}>
                                      <Label color="font" htmlFor="username">User Name</Label>
                                      <Input
                                        type="text"
                                        placeholder="type user name"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        color={errors.username && touched.username ? "error" : null}
                                      />
                                      <Label color="font" htmlFor="password">Password</Label>
                                      <Input
                                        type="password"
                                        name="password"
                                        placeholder="type password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        color={errors.password && touched.password ? "error" : null}
                                      />
                                      <Flex row>
                                        <Flex md={12} padding={"0 !important"}>
                                          <section>
                                            <div>
                                              <Input type="checkbox" value="login" id="rememverMe" name="login" />
                                              <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">Remember me</Label>
                                            </div>
                                            <div>
                                              <Typography fontSize="bodyContentFontSize" textAlign="left">
                                                <Link to="/reset">Forget Password</Link>
                                              </Typography>
                                            </div>
                                          </section>
                                        </Flex>
                                        <Flex row>
                                          <Flex md={2} padding="0 !important">
                                            <PrimaryButton
                                              type="submit"
                                              className={!(dirty && isValid) ? "disabled-btn" : ""}
                                              disabled={!(dirty && isValid)}
                                            >
                                              Login
                                            </PrimaryButton>
                                          </Flex>
                                          {/* <Flex md={2} padding="0 !important">
                                            <PrimaryButton
                                              type="button"
                                              onClick={handleClickFinger}
                                              disabled={!(dirty && isValid)}
                                            >
                                              Fingerprint
                                            </PrimaryButton>
                                          </Flex> */}

                                        </Flex>
                                      </Flex>
                                    </form>
                                  </Flex>
                                </Flex>
                              </div>
                            </>
                          </FormStyled>
                        </InfoCard>
                      </Flex>
                      <Flex md={4}></Flex>
                    </Flex>






                </div>
              );
            }}
          </Formik>
        </Container>
      </Suspense>
    </>
  );
};
