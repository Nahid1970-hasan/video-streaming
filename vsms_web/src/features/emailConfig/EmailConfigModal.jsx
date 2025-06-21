import { Formik } from "formik"; 
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
 
import { Loading } from "../../components/Loading";
import { useRef } from "react";
import { initLoader, saveEmailConfig, undateEmailConfig } from "./email_config_slice";

export const EmailConfigModal = ({ add, open, setOpen = () => {}, data }) => {
  const emailConfig = useSelector((state) => state.emailconfig);
  const [isLoading, setIsLoading] = useState(false);
  const [config_id, set_config_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [email_data, set_email_data] = useState({
    config_id: "",
    email_server: "",
    enable_ssl: "",
    network_cred_pass: "",
    network_cred_user_email: "",
    port: "",
    sender_name: "",
    sending_email_address: "",
    used_for: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    set_email_data(data);
    set_config_id(data.config_id || "");
  }, [data]);

  const submitForm = (values) => { 
    add ? "" : (values.config_id = config_id); 
    dispatch(add ? saveEmailConfig(values) : undateEmailConfig(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.sender_name) {
      errors.sender_name = "Sender name is required";
    } else if (values.sender_name.length > 260) {
      errors.sender_name = "Sender name should not be more than 250 characters";
    }

    if (!values.network_cred_pass) {
      errors.network_cred_pass =  "Network credencial password is required";
    } else if (values.network_cred_pass.length > 260) {
      errors.network_cred_pass = "Network credencial password should not be more than 250 characters";
    }
    if (!values.email_server) {
      errors.email_server =  "Email server name is requried.";
    } else if (values.email_server.length > 500) {
      errors.email_server = "Email server name should not be more than 250 characters";
    }
    if (!values.port) {
      errors.port = "Server Port is requried.";
    } else if (values.port.length > 5) {
      errors.port = "Server port should not be more than 5 digit";
    }
    if (!values.network_cred_user_email) {
      errors.network_cred_user_email = "Network credencial user email is required.";
    } else if (values.network_cred_user_email.length > 560) {
      errors.network_cred_user_email = "Network credencial user email should be more than 500 words";
    }
    if (!values.sending_email_address) {
      errors.sending_email_address = "Sending email address is required.";
    } else if (values.sending_email_address.length > 500) {
      errors.sending_email_address = "Sending email address should not be more than 500 words"
    }
    if (!values.used_for) {
      errors.used_for = "User For is required";
    }  
    return errors;
  }; 

  useEffect(() => {
    if ( emailConfig.addUpdateLoading == "pending") {
        setIsLoading(true);
    } else if ( emailConfig.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); setIsLoading(false); set_disabled(false); setOpen(false) 
      setTimeout(() => { dispatch(initLoader());}, 5000);
    }else if (emailConfig.addUpdateLoading !=  "idle"){
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); set_disabled(false);}, 5000);
    }
  }, [emailConfig.addUpdateLoading]);

  return (
    <> 
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={add ? "New Email Configuration" : "Update Email Configuration"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={email_data}
          validate={validate}
          enableReinitialize
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
                <form onSubmit={handleSubmit}>
                  <CardHeaderButton>
                    <AlertButton
                      type="reset"
                      onClick={resetForm}
                    >
                      {"Reset"}
                    </AlertButton>
                    <PrimaryButton
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid) || disabled}
                    >
                     {"Submit"}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <CardBody>
                    <Label  color="font" htmlFor="sender_name">{"Sender Name"}</Label>
                    <Input
                      app
                      type="text"
                      name="sender_name"
                      placeholder={"Type sender name"}
                      value={values.sender_name ||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sender_name && touched.sender_name ? (
                      <Label>{errors.sender_name}</Label>
                    ) : null}

                    <Label color="font" htmlFor="sending_email_address">{"Sending Email"}</Label>
                    <Input
                      app
                      type="email"
                      name="sending_email_address"
                      placeholder={"Type sending email "}
                      value={values.sending_email_address||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sending_email_address &&
                    touched.sending_email_address ? (
                      <Label>{errors.sending_email_address}</Label>
                    ) : null}

                    <Label color="font" htmlFor="email_server">{"Email Server"} </Label>
                    <Input
                      app
                      type="text"
                      name="email_server"
                      placeholder={"Type email server"}
                      value={values.email_server||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email_server && touched.email_server ? (
                      <Label>{errors.email_server}</Label>
                    ) : null}
                    <Label color="font" htmlFor="enable_ssl">{"Enable SSL?"} </Label>

                    <Select
                      app 
                      name="enable_ssl"
                      value={values.enable_ssl||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {"select value"}
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>

                    <Label color="font" htmlFor="network_cred_user_email">
                      {"Network Credencial Email"}{" "}
                    </Label>
                    <Input
                      app
                      type="email"
                      name="network_cred_user_email"
                      placeholder={"Type network credencial email"}
                      value={values.network_cred_user_email||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.network_cred_user_email &&
                    touched.network_cred_user_email ? (
                      <Label>{errors.network_cred_user_email}</Label>
                    ) : null} 

                    <Label color="font" htmlFor="network_cred_pass">
                      {"Network Credencial password"}{" "}
                    </Label>
                    <Input
                      app
                      type="password"
                      name="network_cred_pass"
                      placeholder={"type network credencial password"}
                      value={values.network_cred_pass||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.network_cred_pass && touched.network_cred_pass ? (
                      <Label>{errors.network_cred_pass}</Label>
                    ) : null}

                    <Label  color="font" htmlFor="port">{"PORT"} </Label>
                    <Input
                      app
                      type="text"
                      name="port"
                      placeholder={"type port"}
                      value={values.port||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.port && touched.port ? (
                      <Label>{errors.port}</Label>
                    ) : null}

                    <Label color="font" htmlFor="used_for">{"Used For"} </Label>
                    <Input
                      app
                      type="text"
                      name="used_for"
                      placeholder={"Type user for"}
                      value={values.used_for||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.used_for && touched.used_for ? (
                      <Label>{errors.used_for}</Label>
                    ) : null}
                  </CardBody>
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
