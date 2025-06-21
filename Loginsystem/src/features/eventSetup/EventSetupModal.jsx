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
import Flatpickr from "react-flatpickr";
import { Loading } from "../../components/Loading";
import { useRef } from "react";
import { initLoader, loadChannel, saveEventSetup, updateEventSetup } from "./event_setup_slice";

export const EventSetupModal = ({ add, open, setOpen = () => { }, data }) => {
  const eventSetup = useSelector((state) => state.eventSetup);
  const [isLoading, setIsLoading] = useState(false);
  const [event_id, set_event_id] = useState(0);
  const formRef = useRef();
  const [disabled, set_disabled] = useState(false);
  const [event_data, set_event_data] = useState({
    category_id: "",
    event_name: "",
    event_desc: "",
    channel_id: "",
    event_status: "",
    event_date: " ",
    event_time: "",
    event_expiry: " ",
  });



  const dispatch = useDispatch();
  useEffect(() => {
    set_event_data(data);
    set_event_id(data.event_id || "");
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.event_id = event_id);
    dispatch(add ? saveEventSetup(values) : updateEventSetup(values));
    set_disabled(true);

  };


  const validate = (values) => {
    let errors = {};

    if (!values.event_name) {
      errors.event_name = "Event name is required";
    } else if (values.event_name.length > 260) {
      errors.event_name = "Event name should not be more than 250 characters";
    }

    if (!values.event_desc) {
      errors.event_desc = "Event Description is required";
    } else if (values.event_desc.length > 400) {
      errors.event_desc = "Event Description should not be more than 400 characters";
    }
    if (!values.channel_id) {
      errors.channel_id = "Select Channel code .";
    } else if (values.channel_id.length > 100) {
      errors.channel_id = "Channel code should not be more than 100 characters";
    }
    if (!values.event_date) {
      errors.event_date = "Event date is requried.";
    }
    if (!values.event_time) {
      errors.event_time = "Event time is requried.";
    }
    if (!values.event_expiry) {
      errors.event_expiry = "Event expiry is requried.";
    }

    return errors;
  };


  useEffect(() => {
    if (eventSetup.addUpdateLoading == "pending") {
      setIsLoading(true);
    } else if (eventSetup.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); setIsLoading(false); set_disabled(false); setOpen(false)
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (eventSetup.addUpdateLoading != "idle") {
      setIsLoading(false);
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [eventSetup.addUpdateLoading]);


  return (
    <>
      <Modal
        md={4}
        sm={6}
        xs={10}
        title={add ? "New Event" : "Update Event"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={event_data}
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
              setFieldValue
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
                    <Label color="font" htmlFor="category_id">{"Category Name"}</Label>
                    <Select
                      app
                      name="category_id"
                      value={values.category_id || ""}
                      onChange={(e) => { 
                        const category_id = e.target.value;
                        dispatch(loadChannel({category_id}));
                        formik.handleChange(e);
                      }}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {"Select Status"}
                      </option>
                      {eventSetup?.eventlist?.map((d, i) => <option key={i} value={d.category_id}>{d.category_name}</option>)}

                    </Select>
                    <Label color="font" htmlFor="event_name">{"Event Name"}</Label>
                    <Input
                      app
                      type="text"
                      name="event_name"
                      placeholder={"Type Event name"}
                      value={values.event_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_name && touched.event_name ? (
                      <Label>{errors.event_name}</Label>
                    ) : null}

                    <Label color="font" htmlFor="event_desc">{"Event Description"}</Label>
                    <Input
                      app
                      type="text"
                      name="event_desc"
                      placeholder={"Type event description "}
                      value={values.event_desc || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_desc &&
                      touched.event_desc ? (
                      <Label>{errors.event_desc}</Label>
                    ) : null}

                    <Label color="font" htmlFor="channel_id">{"Channel Code"} </Label>
                    <Select
                      app
                      name="channel_id"
                      value={values.channel_id || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {"Select Status"}
                      </option>
                      {eventSetup?.channellist?.map((d, i) => <option key={i} value={d.channel_id}>{d.channel_name}</option>)}

                    </Select>
                    {errors.channel_id && touched.channel_id ? (
                      <Label>{errors.channel_id}</Label>
                    ) : null}
                    <Label color="font" htmlFor="event_status">{"Event Status"} </Label>

                    <Select
                      app
                      name="event_status"
                      value={values.event_status || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {"select Status"}
                      </option>
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                      <option value="Expired">Expired</option>
                    </Select>

                    <Label color="font" htmlFor="event_date">
                      {"Event Date"}{" "}
                    </Label>
                    <Flatpickr
                      readOnly
                      options={{
                        dateFormat: "Y-m-d",
                      }}
                      value={values.event_date || ""}
                      onChange={(e, str) => {
                        setFieldValue("event_date", str);
                      }}
                      render={({ value, ...props }, ref) => {
                        return (
                          <Input
                            {...props}
                            type="text"
                            name="event_date"
                            minWidth="auto"
                            placeholder={("Pick Date")}
                            value={values.event_date || ""}
                            ref={ref}
                          />
                        );
                      }}
                    />

                    {errors.event_date &&
                      touched.event_date ? (
                      <Label>{errors.event_date}</Label>
                    ) : null}



                    <Label color="font" htmlFor="event_time">{"Event Time"} </Label>
                    <Flatpickr
                      readOnly
                      options={{
                        noCalendar: true,
                        enableTime: true,
                        dateFormat: "H:i",
                        time_24hr: true,
                        minuteIncrement: 1,
                      }}
                      value={values.event_time || ""}
                      onChange={(selectedDates, str) => {
                        setFieldValue("event_time", str);
                      }}
                      render={({ value, ...props }, ref) => {
                        return (
                          <Input
                            {...props}
                            type="text"
                            name="event_time"
                            minWidth="auto"
                            placeholder="Pick Time"
                            value={values.event_time || ""}
                            ref={ref}
                          />
                        );
                      }}
                    />


                    <Label color="font" htmlFor="event_expiry">{"Event Expiry"} </Label>
                    <Flatpickr
                      readOnly
                      options={{
                        dateFormat: "Y-m-d",
                        noCalendar: false,
                        enableTime: true,
                        time_24hr: true,
                        minuteIncrement: 1,
                      }}
                      value={values.event_expiry || ""}
                      onChange={(e, str) => {
                        setFieldValue("event_expiry", str);
                      }}
                      render={({ value, ...props }, ref) => {
                        return (
                          <Input
                            {...props}
                            type="text"
                            name="event_expiry"
                            minWidth="auto"
                            placeholder={("Pick Date")}
                            value={values.event_expiry || ""}
                            ref={ref}
                          />
                        );
                      }}
                    />
                    {errors.event_expiry && touched.event_expiry ? (
                      <Label>{errors.event_expiry}</Label>
                    ) : null}
                  </CardBody>
                </form>
              </div>
            );
          }}
        </Formik>
      </Modal >
      <Loading open={isLoading} />
    </>
  );
};
