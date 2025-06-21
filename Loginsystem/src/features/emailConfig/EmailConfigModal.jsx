import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { useRef } from "react";

export const EmailConfigModal = ({ add, open, setOpen = () => {}, data }) => {
  // const emailConfig = useSelector((state) => state.emailConfig);
  const [config_id, set_config_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [email_data, set_email_data] = useState({
    config_id: "",
    email: "",
    name: "",
    used_for: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    set_email_data(data);
    set_config_id(data.config_id || "");
  }, [data]);

  const submitForm = (values) => {
    // add ? "" : (values.config_id = config_id); 
    // dispatch(add ? saveEmail(values) : updateEmail(values));
    // set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = ("error name");
    } else if (values.name.length > 260) {
      errors.name = ("name length is long");
    }
    if (!values.email) {
      errors.email = ("email is not valid");
    } else if (values.email_server.length > 500) {
      errors.email_server = ("eamil");
    }
    if (!values.used_for) {
      errors.used_for = ("Invalid used for");
    } else if (values.used_for.length > 500) {
      errors.used_for = ("used for not more then 500 charecters");
    }
    return errors;
  }; 

  // useEffect(() => {
  //   if ( emailConfig.addUpdateLoading == "pending") {
  //       setIsLoading(true);
  //   } else if ( emailConfig.addUpdateLoading == "succeeded") {
  //     formRef.current.resetForm(); setIsLoading(false); set_disabled(false); setOpen(false) 
  //     setTimeout(() => { dispatch(initLoader());}, 5000);
  //   }else if (emailConfig.addUpdateLoading !=  "idle"){
  //     setIsLoading(false);
  //     setTimeout(() => { dispatch(initLoader()); set_disabled(false);}, 5000);
  //   }
  // }, [emailConfig.addUpdateLoading]);

  return (
    <> 
      <Modal
        md={4}
        sm={6}
        xs={10}
        // title={add ? t("add_email_congf") : t("update_email_congf")}
        title={("Add Email Configaration")}
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
                      {("Reset")}
                    </AlertButton>
                    <PrimaryButton
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid) || disabled}
                    >
                      {("Submit")}
                    </PrimaryButton>
                  </CardHeaderButton>
                  <CardBody>
                    <Label  color="font">{("Name")}</Label>
                    <Input
                      app
                      type="text"
                      name="name"
                      placeholder={("name")}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <Label>{errors.name}</Label>
                    ) : null}

                    <Label color="font" htmlFor="email">{("Email")}</Label>
                    <Input
                      app
                      type="email"
                      name="email_address"
                      placeholder={("email")}
                      value={values.email_address||""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email_address &&
                    touched.email_address ? (
                      <Label>{errors.email_address}</Label>
                    ) : null}


                    <Label margin="0.65rem 0 0 0"
                            color="cardFont" htmlFor="used_for">{("Used For")} </Label>
                    <Input
                      app
                      type="text"
                      name="used_for"
                      placeholder={("used_for")}
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
    </>
  );
};
