import { Formik } from "formik";
import { Suspense,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardBody, InfoCard } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Label } from "../components/style/Label";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import NotFound from "./NotFound";
import {theme} from "../styles/theme";
import styled from "styled-components";


const Body = styled.div`
 height:55vh;
`;

export const ResetPass = () => {
  const resetPassData = useSelector((state) => state.resetPass);
  const dispatch = useDispatch();
  const { token } = useParams();
  // const [tokenstr] = useState(token.split(":token=")[1]);
   
  const initData = {
    password: "",
    new_password: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = ("wrong new password");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = ("password invalid");
    }
    if (!values.new_password) {
        errors.new_password = ("conform password");
    }else if (values.new_password != values.password) {
      errors.new_password = ("password not mismatch");
    }
    return errors;
  };
  const submitForm = (values) => {
    // var data = {
    //     token: tokenstr,
    //     new_password:values.new_password
    // }
    // dispatch(getResetPassword(data));
  };

  return (
    <>
      <Body>
      <Suspense fallback={<Loader />}>
        <Container  bottomBorder={"2px solid " + theme.colors.primaryBorder}>
          <Card color={"bg"}>
            <CardBody>
              {/* {tokenstr != undefined ?resetPassData.loading == "succeeded" ? (
                <Center>
                  <Typography >
                    {(resetPassData.msg)}
                  </Typography>
                  <Link to="/login" replace>
                    <Typography lineHeight="3rem" color="primary">
                      Go to Login
                    </Typography>
                  </Link>
                </Center>
              ) : resetPassData.loading == "pending" ? (
                <Loader></Loader>
              ) : ( */}
                <Formik
                initialValues={initData}
                validate={validate}
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
                  } = formik;
                  return (
                    <div>
                        <Flex row justifyCenter>
                            <Flex md={4} sm={3} xs={1}></Flex>
                            <Flex md={4} sm={6} xs={12}>
                              <InfoCard>
                              <Typography
                                textAlign="center"
                                fontWeight="bold"
                                >
                                {("Reset Password")}
                                </Typography>
                                <form  onSubmit={handleSubmit}>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder={("new password")}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     {errors.password &&
                                  touched.password ? (
                                    <Label>{errors.password}</Label>
                                  ) : null}
                                    <Input
                                        type="password"
                                        name="new_password"
                                        placeholder={("conform password")}
                                        value={values.new_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     {errors.new_password &&
                                  touched.new_password ? (
                                    <Label>{errors.new_password}</Label>
                                  ) : null}
                                    <br />
                                    <Button
                                        full
                                        color="primaryButton"
                                        type="submit"
                                        fontColor="font"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid)}
                                    >
                                        {("Submit")}{" "}
                                    </Button>
                                    </form>
                              </InfoCard>
                             
                                
                            </Flex>
                            <Flex md={4} sm={3} xs={1}></Flex>
                        </Flex> 
                    </div>
                  );
                }}
              </Formik> 
          
            </CardBody>
          </Card>
        </Container>
      </Suspense>
      </Body>
      
    </>
  );
};
