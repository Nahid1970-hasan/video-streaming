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
import { AlertButton, Button, PrimaryButton } from "../components/Button";
import { CardBody, InfoCard } from "../components/style/Card_styled";
import styled from 'styled-components';
import { Toast } from '../components/Toast';
import { loadPage } from '../features/page/page_slice';
import { Loading } from '../components/Loading';
import { Formik } from 'formik';

const LoginArea = styled.div`
  height: 300px;
  width: 400px;
  display: flex;  
`;

export const PubCredPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const wraperRef = useRef(null);
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const [open, setOpen] = useState(false);
    useOutsideClicker(wraperRef, () => { setOpen(false) });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [fingerprint, setFingerprint] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [user_name, set_user_name] = useState("");
    const [user_pass, set_user_pass] = useState("");


    const submitForm = (values) => {
        console.log(values);
        setIsLoading(true);
        setTimeout(() => {navigate("/login"); }, 2000);
        // dispatch(admChangePassword(data));

    };

    useEffect(() => { 
        if (user.login) {
          if (localStorage.user_type == "ADM") {
            navigate("/app");
          } else {
            navigate("/pub");
          } 
        }
      }, [user]);

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

    const initData = {
        password: "",
        con_password: "",
    };

    const validate = (values) => {
        let errors = {};
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
        return errors;
    };

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
                        <InfoCard>
                            <CardBody>
                                <Formik
                                    initialValues={initData}
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
                                        } = formik;
                                        return (
                                            <div>
                                                <Flex row>
                                                    <Flex md={12}>
                                                    <Typography textAlign="center" fontSize="bodyTitleFontSize" margin="20px 0 0 0" fontWeight="bold">
                                                        Set Up Account
                                                    </Typography>
                                                    </Flex>
                                                    <Flex padding="0 !important" md={12}>
                                                        <form onSubmit={handleSubmit} >
                                                            <label htmlFor="password">{"Password"}</label>
                                                            <Input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                placeholder={"type password"}
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                color={!values.password ? "error" : null}
                                                            />
                                                            <label htmlFor="con_password">{"Confirm Password"}</label>
                                                            <Input
                                                                type="password"
                                                                id="con_password"
                                                                name="con_password"
                                                                placeholder={"type confirm password"}
                                                                value={values.con_password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                color={!values.con_password ? "error" : null}
                                                            />
                                                            <Button
                                                                full
                                                                color="primaryButton"
                                                                type="submit"
                                                                fontColor="font"
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid) || disabled}>
                                                                {"Submit"}
                                                            </Button>
                                                        </form>
                                                    </Flex>
                                                </Flex>
                                            </div>
                                        );
                                    }}
                                </Formik>
                            </CardBody>
                        </InfoCard>
                    </LoginArea>
                </div>
            </Suspense>
            <Loading open={isLoading} />
        </>
    );
};
