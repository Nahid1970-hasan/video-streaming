
import { AlertButton, PrimaryButton } from "../components/Button";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { theme } from "../styles/theme";
import { Formik } from "formik";
import { Label } from "../components/style/Label";
import styled from "styled-components";
import { Typography } from "../components/style/Typography_styled";
import { useEffect, useRef, useState } from "react";
import { InfoCard } from "../components/style/Card_styled";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { initLoader, savePromtUserConfig } from "../features/umPromoterUser/um_promoter_user_slice";
import { Toast } from "../components/Toast";

const CustFlex = styled(Flex)` 
  padding: 2px 8px;
  margin:0;
  display: flex; 
`;

const LoginArea = styled.div`
  height: 400px;
  width: 450px;
  display: flex;  
`;

export const Registration = () => {
  // const user_registration = useSelector((state) => state.user_registration);
  const userConfigData = useSelector((state) => state.umpromtuser);
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const initialValues = {
    fullname: '',
    contact_number: '',
    email: '',
    password: '',
    con_password: '',
    address: '',
  };

  const validate = (values) => {

    let errors = {};
    if (!values.fullname) {
      errors.fullname = ("fullname is requried");
    }

    if (!values.contact_number) {
      errors.contact_number = ("number is required");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
      errors.contact_number = ("invalid contact number");
    }
    if (!values.email) {
      errors.email = ("email is requried");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ("email is not valid");
    }
    if (!values.password) {
      errors.password = "password is required.";
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = "password is not valid."
    } if (!values.con_password) {
      errors.con_password = "Confirm password is required.";
    } else if (values.con_password != values.password) {
      errors.con_password = "Confirm password is not matched";
    }
    if (!values.address) {
      errors.address = ("address is required");
    }
    return errors;
  };
 
  const submitForm = (values) => { 
    values.username = values.email;
    dispatch(savePromtUserConfig(values));
  };

  useEffect(() => {
    if (userConfigData.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (userConfigData.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); 
      setTimeout(() => { setIsLoading(false); dispatch(initLoader()); navigate("/login"); }, 5000);
    } else if (userConfigData.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
    }
  }, [userConfigData.addUpdateLoading]);

  return (
    <>
      {(userConfigData.addUpdateLoading == "idle" || userConfigData.addUpdateLoading == "pending") ? <></> : (
        userConfigData.addUpdateLoading == "succeeded" ? (
          <Toast msg={userConfigData.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={userConfigData.msg} />
        )
      )}
      <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
        <div style={{ display: "flex", width: "100%", height: "80vh", justifyContent: "center", alignItems: "center" }}>
          <LoginArea>
            <Flex row>
              <Flex md={12}>
                <InfoCard>
                  <div>
                    <FormStyled>
                      <div>
                        <Typography fontSize="bodyTitleFontSize" margin="10px 0!important"> {("Promoter Registration")}</Typography>

                        <Formik
                          initialValues={initialValues}
                          validate={validate}
                          innerRef={formRef}
                          onSubmit={submitForm}
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
                              resetForm,
                              setFieldValue
                            } = formik;

                            return (
                              <div>
                                <form onSubmit={handleSubmit}>
                                  <Label color="font">Fullname</Label>
                                  <Input
                                    type="text"
                                    name="fullname"
                                    maxLength={100}
                                    placeholder={("type fullname")}
                                    value={values.fullname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.fullname && touched.fullname ? "error" : null}
                                  />

                                  {errors.fullname && touched.fullname ? (
                                    <Label>{errors.fullname}</Label>
                                  ) : null}

                                  <Label color="font">Contact Number</Label>
                                  <Input
                                    type="text"
                                    name="contact_number"
                                    placeholder={("type contact no")}
                                    value={values.contact_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.contact_number && touched.contact_number ? "error" : null}
                                  />

                                  {errors.contact_number && touched.contact_number ? (
                                    <Label>{errors.contact_number}</Label>
                                  ) : null}

                                  <Label color="font">Email (Username)</Label>
                                  <Input
                                    type="email"
                                    name="email"
                                    placeholder={("type email")}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.email && touched.email ? "error" : null}
                                  />

                                  {errors.email && touched.email ? (
                                    <Label>{errors.email}</Label>
                                  ) : null}
                                  <Label color="font" htmlFor="password">{"Password"}</Label>
                                  <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={"type password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.password && touched.password ? "error" : null}
                                  />

                                  {errors.password && touched.password ? (
                                    <Label>{errors.password}</Label>
                                  ) : null}
                                  <Label color="font" htmlFor="con_password">{"Confirm Password"}</Label>
                                  <Input
                                    type="password"
                                    id="con_password"
                                    name="con_password"
                                    placeholder={"type confirm password"}
                                    value={values.con_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.con_password && touched.con_password ? "error" : null}
                                  />

                                  {errors.con_password && touched.con_password ? (
                                    <Label>{errors.con_password}</Label>
                                  ) : null}
                                  <Label color="font">Address</Label>
                                  <Input
                                    type="text"
                                    name="address"
                                    placeholder={("address")}
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    color={errors.address && touched.address ? "error" : null}
                                  />
                                  {errors.address && touched.address ? (
                                    <Label>{errors.address}</Label>
                                  ) : null}
                                  <CustFlex row>
                                    <CustFlex md={6}>
                                      <AlertButton full onClick={resetForm} type="reset">{("Reset")}</AlertButton>
                                    </CustFlex>
                                    <CustFlex md={6} padding="10px 0!important">
                                      <PrimaryButton full type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid)}>
                                        {("Submit")}
                                      </PrimaryButton>
                                    </CustFlex>
                                    <CustFlex md={12}>
                                      <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                                        <Typography fontSize="bodySubTitleFontSize">
                                          Already user? <Link to="/login">Login</Link>
                                        </Typography>
                                      </div>
                                    </CustFlex>
                                  </CustFlex>

                                </form>

                              </div>
                            );
                          }}
                        </Formik>
                      </div>
                    </FormStyled>
                  </div>
                </InfoCard>

              </Flex>
            </Flex>
          </LoginArea>
        </div>
      </Container>
      <Loading open={isLoading} />
    </>
  );
};
