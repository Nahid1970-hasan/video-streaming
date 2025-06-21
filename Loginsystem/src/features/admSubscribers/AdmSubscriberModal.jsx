import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton,  PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";

import {
  initLoader,
    saveSubscriberConfig as saveConfig,
    updateSubscriberConfig as updateConfig,
} from "./adm_subscriber_slice";
import { Loading } from "../../components/Loading";
import { useRef } from "react";
import { Flex } from "../../components/style/Flex_styled";

export const AdmSubscriberModal = ({ add, open, setOpen = () => { }, data }) => {
  const [user_id, set_user_id] = useState(0);
  const [disabled, set_disabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const [userData, setUserData] = useState({
    email: "",
    contact_number: "",
    username: "",
    password: "",
    fullname: "",
    nickname: "",
    status: "",
  });
  const [isMobileAsUsername, setMobileAsUsername] = useState(false);
  const [isEmailAsUsername, setEmailAsUsername] = useState(false);
  const [mobileCheckEnable, setMobileCheckEnable] = useState(false);
  const [emailCheckEnable, setEmailCheckEnable] = useState(false);
  const userConfig = useSelector((state) => state.admPromoter);
  const dispatch = useDispatch();

  useEffect(() => {
    set_user_id(data.user_id);
    setUserData(data);
  }, [data]);

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = ("type email");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("Invalid email");
    }

    if (!values.username) {
      errors.username = ("type user name");
    } else if (values.username.length < 4) {
      errors.username = ("User name so much long");
    }
    if (!values.contact_number) {
      errors.contact_number = ("type contact number");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
      errors.contact_number = ("Invalid contact number");
    }
    if (add && !values.password) {
      errors.password = ("type password");
    }
    if (!values.fullname) {
      errors.fullname = ("type fullname");
    }
    if (!values.nickname) {
      errors.nickname = ("type nickname");
    }

    if (!values.status) {
      errors.status = ("select status");
    }
    return errors;
  };

  useEffect(() => {
    userConfig.addUpdateLoading == "succeeded" &&
      setTimeout(() => {
        setOpen(false);
      }, 5000);
  }, [userConfig.addUpdateLoading]);

 
  useEffect(() => {
    userConfig.addUpdateLoading == "succeeded" &&
      setTimeout(() => {
        setOpen(false);
      }, 5000);
  }, [userConfig.addUpdateLoading]);

  useEffect(() => {
    if (userConfig.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (userConfig.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); setIsLoading(false); set_disabled(false); setOpen(false)
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (userConfig.addUpdateLoading != "idle") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [userConfig.addUpdateLoading]);

  const submitForm = (values) => {
    values.update_user_id = add ? 0 : parseInt(user_id);
    // dispatch(saveConfig(values) );
    dispatch(add ? saveConfig(values) : updateConfig(values));
  };



  return (
    <>
      <Modal
        md={6}
        sm={8}
        xs={12}
        title={add ? ("Add Subscribers") : ("Update Subscribers")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={userData}
          validate={validate}
          onSubmit={submitForm}
          innerRef={formRef}
          enableReinitialize
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
              resetForm,
            } = formik;

            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={resetForm}
                    >
                      {("Reset")}
                    </AlertButton>
                    <PrimaryButton
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>

                  <Flex row>
                    <Flex md={6} padding="0 10px 0 0 !important">
                      <Label margin="0.65rem 0 0 0" color="font">
                        {("Email")}
                      </Label> 
                      <Input
                        app
                        type="email"
                        name="email"
                        placeholder={("email")}
                        value={values.email || ""}
                        onBlur={handleBlur}
                        color={errors.email && touched.email ? "error" : null}
                        onChange={(e) => (
                          setEmailCheckEnable(e.target.value.length > 4),
                          formik.handleChange(e)
                        )}
                      />
                      <Label
                        margin="0.65rem 0 0 0"
                        color="font"
                        htmlFor="sending_email"
                      >
                        {("Contact Number")}
                      </Label>
                    
                      <Input
                        app
                        type="text"
                        name="contact_number"
                        placeholder={("contact number")}
                        value={values.contact_number || ""}
                        onBlur={handleBlur}
                        color={
                          errors.contact_number && touched.contact_number
                            ? "error"
                            : null
                        }
                        onChange={(e) => (
                          setMobileCheckEnable(e.target.value.length > 10),
                          formik.handleChange(e)
                        )}
                      />


                      <Label margin="0.65rem 0 0 0" color="font" htmlFor="Username">
                        {("Username")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="username"
                        placeholder={("user name")}
                        disabled={
                          add
                            ? isMobileAsUsername || isEmailAsUsername
                              ? "disabled"
                              : ""
                            : "disabled"
                        }
                        value={
                          (add
                            ? isMobileAsUsername
                              ? values.contact_number
                              : isEmailAsUsername
                                ? values.email
                                : values.username
                            : values.username) || ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color={errors.username && touched.username ? "error" : null}
                      />
                      {/* {errors.username && touched.username ? (
                        <Label>{errors.username}</Label>
                      ) : null} */}
                      <Label
                        margin="0.65rem 0 0 0"
                        color="font"
                        style={{ display: add ? "block" : "none" }}
                        htmlFor="password"
                      >
                        {("Password")}
                      </Label>
                      <Input
                        app
                        display={add ? "block" : "none"}
                        type="password"
                        name="password"
                        placeholder={("password")}
                        value={(add ? values.password : "") || ""}
                        color={errors.password && touched.password ? "error" : null}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Flex>
                    <Flex md={6} padding="0 0 0 10px !important">
                      <Label margin="0.65rem 0 0 0" color="font">
                        {("Fullname")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="fullname"
                        placeholder={("full_name")}
                        value={values.fullname || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color={errors.fullname && touched.fullname ? "error" : null}
                      />

                      <Label margin="0.65rem 0 0 0" color="font">
                        {("Nickname")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="nickname"
                        placeholder={("nick_name")}
                        value={values.nickname || ""} 
                        color={errors.nickname && touched.nickname ? "error" : null}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      

                      <Label margin="0.65rem 0 0 0" htmlFor="status" color="font">
                        {("Status")}
                      </Label>
                      <Select
                        app
                        name="status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.status || ""}
                        color={errors.status && touched.status ? "error" : null}
                      >
                        <option disabled value="">
                          {("Select status")}
                        </option>
                        <option value="RegRequest">RegRequest</option>
                        <option value="Verified">Verified</option>
                        <option value="Approved">Approved</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Canceled">Canceled</option>
                      </Select>
                    </Flex>
                  </Flex> 
                </form>
              </div>
            );
          }}
        </Formik>
      </Modal>
      <Loading open={isLoading} />
    </>
  );
};
