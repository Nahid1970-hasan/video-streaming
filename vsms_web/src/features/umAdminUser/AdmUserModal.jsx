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
 
import { loadAdmUserConfig } from "./um_admin_user_slice"; 
import { useRef } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { initLoader, saveAdmUserConfig, updateUserConfig } from "./um_admin_user_slice";

export const AdmUserModal = ({ add, open, setOpen = () => { }, data }) => {
  const [user_id, set_user_id] = useState(0);
  const [disabled, set_disabled] = useState(false); 
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
   
  const userConfig = useSelector((state) => state.umadmuser);
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
      errors.email = "Invalid email";
    }

    if (!values.username) {
      errors.username = ("type user name");
    } else if (values.username.length < 4) {
      errors.username = ("Username is too short");
    }
    if (!values.contact_number) {
      errors.contact_number = ("type contact number");
    } 
    // else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
    //   errors.contact_number = ("Invalid contact number");
    // }
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
    if (userConfig.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); set_disabled(false); setOpen(false);
      dispatch(loadAdmUserConfig());
      setTimeout(() => { dispatch(initLoader()); }, 2000);
    } else if (userConfig.addUpdateLoading != "idle" && userConfig.addUpdateLoading != "pending" ) { 
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [userConfig.addUpdateLoading]);

  const submitForm = (values) => {
    values.update_user_id = add ? 0 : parseInt(user_id); 
    dispatch(add ? saveAdmUserConfig(values) : updateUserConfig(values));
  };
  
  return (
    <>
      <Modal
        md={6}
        sm={8}
        xs={12}
        title={add ? ("Add User") : ("Update User")}
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
                      disabled={!(dirty && isValid) || disabled}
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
                        placeholder={("type email")}
                        value={values.email || ""}
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        color={errors.email && touched.email ? "error" : null}
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
                        placeholder={("type contact number")}
                        value={values.contact_number || ""}
                        maxLength={15}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        color={
                          errors.contact_number && touched.contact_number
                            ? "error"
                            : null
                        } 
                      /> 
                      <Label margin="0.65rem 0 0 0" color="font" htmlFor="Username">
                        {("Username")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="username"
                        placeholder={("type username")} 
                        value={values.username||""}
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
                        placeholder={("type password")}
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
                        placeholder={("type fullname")}
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
                        placeholder={("type nickname")}
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
                          {("select status")}
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
      
    </>
  );
};
