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
import { useRef } from "react";
import { initLoader, saveCategoryItem } from "./adm_category_slice";

export const AddCategoryItemModal = ({ add, open, setOpen = () => {} }) => {
  const admCatItem = useSelector((state) => state.catitem);
  const [isLoading, setIsLoading] = useState(false);
  const [category_id, set_category_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [categoryData, setCategoryData] = useState({
    category_id: "",
    category_name: "", 
  });
  const dispatch = useDispatch();
 
  const submitForm = (values) => {
    values.category_id = category_id; 
    dispatch(saveCategoryItem(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.category_name) {
      errors.category_name ="Category Name is required!";
    } else if (values.category_name.length > 260) {
      errors.category_name = "Category name should not be more than 250 characters";
    } 
    return errors;
  }; 

  useEffect(() => {
    if ( admCatItem.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); set_disabled(false); setOpen(false) 
      setTimeout(() => { dispatch(initLoader());}, 5000);
    }else if (admCatItem.addUpdateLoading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader()); set_disabled(false);}, 5000);
    }
  }, [admCatItem.addUpdateLoading]);

  return (
    <> 
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={"Add Category Item"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={categoryData}
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
                    <Label  color="font">{"Category Name"}</Label>
                    <Input
                      app
                      type="text"
                      name="category_name"
                      placeholder={"Category Name"}
                      value={values.category_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.category_name && touched.category_name ? (
                      <Label>{errors.category_name}</Label>
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
