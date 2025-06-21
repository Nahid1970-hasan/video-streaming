import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Label } from "../components/style/Label";
import { CardBody } from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { loadPage } from "../features/page/page_slice";
import { Toast } from "../components/Toast";
import { Formik } from "formik";
import { useRef } from "react";
import { Loading } from "../components/Loading";
import { admChangePassword, initLoader } from "../features/changePassword/adm_change_pass_slice";

export const AdmChangePasswordPage = () => {
    const admChangePass = useSelector(state => state.admchangepassword);
    const [disabled, set_disabled] = useState(false);
    const dispatch = useDispatch();
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        dispatch(loadPage({ title: 'Change Password' }))
    }, []);

    const initData = {
        current_password: "",
        password: "",
        new_password: "",
    };
    const validate = (values) => {
        let errors = {};
        if (!values.current_password) {
            errors.current_password = "Current password is required.";
        } if (!values.password) {
            errors.password = "New password is required.";
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
        ) {
            errors.password = "New password is not valid."
        } if (!values.new_password) {
            errors.new_password = "Confirm password is required.";
        } else if (values.new_password != values.password) {
            errors.new_password = "Confirm password is not matched";
        }
        return errors;
    };
    const submitForm = (values) => {
        var data = {
            current_password: values.current_password,
            password: values.new_password
        }
        dispatch(admChangePassword(data));

    };

    useEffect(() => {
        if (admChangePass.loading == "pending") {
            setIsLoading(true);
        } else if (admChangePass.loading == "succeeded") {
            formRef.current.resetForm(); setIsLoading(false);
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
        } else if (admChangePass.loading != "idle") {
            setIsLoading(false);
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
        }
    }, [admChangePass.loading]);

    return (
        <>
            {(admChangePass.loading == "idle" || admChangePass.loading == "pending") ? <></> : (
                admChangePass.loading == "succeeded" ? (
                    <Toast msg={admChangePass.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={admChangePass.msg} />
                )
            )}
            <Flex row>
                <Flex padding="0" md={12} sm={12} xs={12}>
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
                                            <Flex padding="0 !important" md={6} sm={8} xs={12}>
                                                <form onSubmit={handleSubmit} >
                                                    <label htmlFor="current_password">{"Current Password"}</label>
                                                    <Input
                                                        type="password"
                                                        id="current_password"
                                                        name='current_password'
                                                        placeholder={"type current password"}
                                                        value={values.current_password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.current_password &&
                                                        touched.current_password ? (
                                                        <Label>{errors.current_password}</Label>
                                                    ) : null}
                                                    <label htmlFor="password">{"New Password"}</label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        placeholder={"type new password"}
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.password &&
                                                        touched.password ? (
                                                        <Label>{errors.password}</Label>
                                                    ) : null}
                                                    <label htmlFor="new_password">{"Confirm New Password"}</label>
                                                    <Input
                                                        type="password"
                                                        id="new_password"
                                                        name="new_password"
                                                        placeholder={"type confirm password"}
                                                        value={values.new_password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.new_password &&
                                                        touched.new_password ? (
                                                        <Label>{errors.new_password}</Label>
                                                    ) : null}
                                                    <Button
                                                        color="primaryButton" type="submit" fontColor="font" className={!(dirty && isValid) ? "disabled-btn" : ""}
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
                </Flex>
            </Flex>
            <Loading open={isLoading} />
        </>
    );
};
