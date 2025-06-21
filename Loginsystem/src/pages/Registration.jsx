import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { InfoCard } from "../components/style/Card_styled";
import { FormStyled } from "../components/style/From_style";
import { Typography } from "../components/style/Typography_styled";
import { Formik } from "formik";
import { Label } from "../components/style/Label";
import { Input } from "../components/style/Input_styled";
import { AlertButton, PrimaryButton } from "../components/Button";
import { theme } from "../styles/theme";
import styled from "styled-components";

const CustFlex = styled(Flex)` 
  padding: 2px 8px;
  margin:0;
  display: flex; 
`;

export const Registration = () => {
  const formRef = useRef();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const initialValues = {
    fullname: '',
    profession: '',
    birth_date: '',
    gender_id: '',
    district_id: '',
    thana_id: '',
    address: '',
    contact_number: '',
    email: '',
  };

  const validate = (values) => {
    let errors = {};
    if (!values.fullname) {
      errors.fullname = ("type fullname");
    }
    if (!values.address) {
      errors.address = ("invalid address");
    }
    if (!values.contact_number) {
      errors.contact_number = ("invalid number");
    } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.contact_number)) {
      errors.contact_number = ("invalid contact number");
    }
    if (!values.email) {
      errors.email = ("invalid email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ("email invalid");
    }
    return errors;
  };

  const submitForm = (values) => {
    dispatch(setUserRegistration(values));
    const promoter_id = "promoter_id"; // Replace with actual logic to get promoter_id
    navigate(`/login?promoter_id=${promoter_id}`); // Redirect to the login page with promoter_id
  };

  return (
    <>
      <Container bottomBorder={"2px solid " + theme.colors.primaryBorder}>
        <Flex row>
          <Flex md={3}></Flex>
          <Flex md={6} sm={12}>
            <InfoCard>
              <div>
                <FormStyled>
                  <div>
                    <Typography fontSize="bodyTitleFontSize" margin="10px 0!important"> {("Registration")}</Typography>

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
                                placeholder={("fullname")}
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={errors.fullname && touched.fullname ? "error" : null}
                              />
                              {
                                errors.fullname && touched.fullname ? <Label>{errors.fullname}</Label> : null
                              }
                              <Label color="font">Contact Number</Label>
                              <Input
                                type="text"
                                name="contact_number"
                                placeholder={("contact no")}
                                value={values.contact_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={errors.contact_number && touched.contact_number ? "error" : null}
                              />
                              {
                                errors.contact_number && touched.contact_number ? <Label>{errors.contact_number}</Label> : null
                              }
                              <Label color="font">Email</Label>
                              <Input
                                type="email"
                                name="email"
                                placeholder={("email")}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={errors.email && touched.email ? "error" : null}
                              />
                              {
                                errors.email && touched.email ? <Label>{errors.email}</Label> : null
                              }
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
                              {
                                errors.address && touched.address ? <Label>{errors.address}</Label> : null
                              }

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
          <Flex md={3}></Flex>
        </Flex>
      </Container>
    </>
  );
};
