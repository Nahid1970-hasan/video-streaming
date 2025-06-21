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
  
import { useRef } from "react";
import { Flex } from "../../components/style/Flex_styled"; 
import { initLoader, loadPromtUserConfig, savePromtUserConfig, updatePromtUserConfig } from "./um_promoter_user_slice";

export const PromtUserModal = ({ add, open, setOpen = () => { }, data }) => {
  const userConfig = useSelector((state) => state.umpromtuser);
  const [user_id, set_user_id] = useState(0);
  const [disabled, set_disabled] = useState(false); 
  const formRef = useRef();
  const [userData, setUserData] = useState({ 
    username: "",
    password: "",
    fullname: "", 
    address:"", 
    contact_number: "",
    email: "",
    status:"",
  }); 
  const dispatch = useDispatch();

  useEffect(() => {
    set_user_id(data.user_id);
    setUserData(data);
  }, [data]);

  const validate = (values) => {
    let errors = {}; 
    if (!values.status) {
      errors.status = ("select status");
    }
    return errors;
  };
 
  useEffect(() => {
    if (userConfig.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); set_disabled(false); setOpen(false);
      dispatch(loadPromtUserConfig());
      setTimeout(() => { dispatch(initLoader()); }, 2000);
    } else if (userConfig.addUpdateLoading != "idle" && userConfig.addUpdateLoading != "pending" ) { 
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [userConfig.addUpdateLoading]);

  const submitForm = (values) => { 
    var data ={
      "status": values.status,
      "update_user_id" : parseInt(user_id) 
    }
    dispatch(updatePromtUserConfig(data));
  };
  
  return (
    <>
      <Modal
        md={6}
        sm={8}
        xs={12}
        title={"Update Promoter"}
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
                        value={values.email || ""}
                        disabled 
                      />
                      
                       <Label
                        margin="0.65rem 0 0 0"
                        color="font"
                        htmlFor="contact_number"
                      >
                        {("Contact Number")}
                      </Label>
                    
                      <Input
                        app
                        type="text"
                        name="contact_number"
                        value={values.contact_number||""}
                        disabled  
                      /> 
                      <Label margin="0.65rem 0 0 0" color="font" htmlFor="Username">
                        {("Username")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="username" 
                        value={values.username||""}
                        disabled 
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
                        disabled 
                      />

                      <Label margin="0.65rem 0 0 0" color="font">
                        {("Address")}
                      </Label>
                      <Input
                        app
                        type="text"
                        name="address"
                        placeholder={("type address")}
                        value={values.address || ""} 
                        disabled 
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
