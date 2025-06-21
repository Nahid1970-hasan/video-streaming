import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Label } from "../../components/style/Label";

export const FaqModal = ({ add, open, setOpen, data }) => {
//   const faqData = useSelector((state) => state.faq);
  const [faq_id, set_faq_id] = useState(0);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const [faq_data, set_faq_data] = useState({
    faq_id: "",
    question: "",
    question_bn: "",
    answer_en: "",
    answer: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    !add && set_faq_data(data);
    !add && set_faq_id(data?.faq_id || "");
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.faq_id = faq_id);
    // dispatch(add ? saveconfig(values) : updateconfig(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.question) {
      errors.question = ("type your qustion");
    } else if (values.question.length > 200) {
      errors.question = ("Qustion is so much long");
    }

    if (!values.answer) {
      errors.answer = ("type your answer");
    } else if (values.answer.length > 200) {
      errors.answer = ("answer is so long");
    }

    return errors;
  };

 

  return (
    <>
      <Modal
        md={6}
        sm={6}
        xs={10}
        title={add ? "Add FAQ" : "Update FAQ"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={faq_data}
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
                    <Label color="font">{("Question")}</Label>
                    <textarea
                      type="text"
                      name="question"
                      placeholder={("type question")}
                      value={values.question || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.question && touched.question ? <Label>{errors.question}</Label> : null
                    }

                    <Label color="font">{("Answer")}</Label>
                    <textarea rows="6"
                      type="textarea"
                      name="answer"
                      placeholder={("type answer")}
                      defaultValue={values.answer || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.answer && touched.answer ? (
                      <Label>{errors.answer}</Label>
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
