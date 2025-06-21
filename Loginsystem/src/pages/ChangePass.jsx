import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Button } from "../components/Button";
import { Label } from "../components/style/Label";
import { CardBody } from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { loadPage } from "../features/page/page_slice";
import { Formik } from "formik";
import { useRef } from "react";

export const ChangePass = () => {
//   const changePassword = useSelector(state => state.changePassword);
  const [disabled, set_disabled] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();
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
      errors.current_password = ("Password is not valid");
    }
    if (!values.password) {
      errors.password = ("Password is not valid");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = ("Invalid password");
    }
    if (!values.new_password) {
      errors.new_password = ("Invalid password");
    } else if (values.new_password != values.password) {
      errors.new_password = ("password is not match");
    }
    return errors;
  };
  const submitForm = (values) => {
    var data = {
      current_password: values.current_password,
      password: values.new_password
    }
    // dispatch(changePasswordEdit(data));

  };

//   useEffect(() => {
//     if (changePassword.loading == "pending") {
//       setIsLoading(true);
//     } else if (changePassword.loading == "succeeded") {
//       formRef.current.resetForm(); setIsLoading(false);
//       setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
//     } else if (changePassword.loading != "idle") {
//       setIsLoading(false);
//       setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
//     }
//   }, [changePassword.loading]);

  return (
    <>
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
                          <Label color="font">{("Current Password")}</Label>
                          <Input
                            type="password"
                            id="current_password"
                            name='current_password'
                            placeholder={("type current password")}
                            value={values.current_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.current_password &&
                            touched.current_password ? (
                            <Label>{errors.current_password}</Label>
                          ) : null}
                          <Label color="font">{("New Password")}</Label>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={("type new password")}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password &&
                            touched.password ? (
                            <Label>{errors.password}</Label>
                          ) : null}
                          <Label color="font">{("Confirm Password")}</Label>
                          <Input
                            type="password"
                            id="new_password"
                            name="new_password"
                            placeholder={("confirm your password")}
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
                            {("Submit")}
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
    </>
  );
};
