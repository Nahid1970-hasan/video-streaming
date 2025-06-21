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
import { initLoader, loadEventSetup, saveEventSetup, updateEventSetup } from "./adm_events_slice";
import { loadChannelName } from "../channels/adm_channel_slice";
import { Flex } from "../../components/style/Flex_styled";
import { DateTime } from "luxon";

export const EventSetupModalPage = ({ add, open, setOpen = () => { }, data }) => {
  const eventSetup = useSelector((state) => state.admevents);
  const catItemData = useSelector((state) => state.catitem);
  const chnlData = useSelector((state) => state.channelconfig);
  const [event_id, set_event_id] = useState(0);
  const formRef = useRef();
  const dispatch = useDispatch();
  const [disabled, set_disabled] = useState(false);
  const [event_data, set_event_data] = useState({
    category_id: "",
    event_name: "",
    event_desc: "",
    channel_id: "",
    event_status: "",
    event_date: "",
    event_time: "",
    event_expiry: "",
    ticket_url: "",
    event_loc: "",
    event_keywords: ""
  });

  useEffect(() => {
    add ? "" : set_event_data(data);
    set_event_id(data?.event_id || "");
    if(data?.category_id){
      dispatch(loadChannelName({ category_id: data?.category_id }));
    }
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.event_id = event_id);
    dispatch(add ? saveEventSetup(values) : updateEventSetup(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.category_id) {
      errors.category_id = "Category name is required";
    }

    if (!values.event_name) {
      errors.event_name = "Event name is required";
    } else if (values.event_name.length > 200) {
      errors.event_name = "Event name should not be more than 200 characters";
    }

    if (!values.event_desc) {
      errors.event_desc = "Event description is required";
    } else if (values.event_desc.length > 250) {
      errors.event_desc = "Event description should not be more than 250 characters";
    }
    if (!values.channel_id) {
      errors.channel_id = "Channel id is requried.";
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
    if (!values.ticket_url) {
      errors.ticket_url = "Ticket Url is requried.";
    }
    if (!values.event_keywords) {
      errors.event_keywords = "Event keywords is requried.";
    }
    if (!values.event_loc) {
      errors.event_loc = "Event location is requried.";
    } else if (values.event_loc.length > 200) {
      errors.event_loc = "Event location should not be more than 200 characters";
    }

    return errors;
  };


  useEffect(() => {
    if (eventSetup.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); set_disabled(false); setOpen(false);
      dispatch(loadEventSetup());
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (eventSetup.addUpdateLoading != "idle" && eventSetup.addUpdateLoading != "pending") {
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [eventSetup.addUpdateLoading]);

  return (
    <>
      <Modal
        md={8}
        sm={10}
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
                    <Flex row>
                      <Flex md={6} xs={12}>
                        <Label color="font" htmlFor="event_name">{"Event Name"}</Label>
                        <Input
                          app
                          type="text"
                          name="event_name"
                          placeholder={"type event name"}
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
                          placeholder={"type event description "}
                          value={values.event_desc || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.event_desc &&
                          touched.event_desc ? (
                          <Label>{errors.event_desc}</Label>
                        ) : null}

                        <Label color="font" htmlFor="category_id">{"Category Name"}</Label>
                        <Select
                          app
                          name="category_id"
                          value={values.category_id || ""}
                          onChange={(e) => {
                            var category_id = e.target.value;
                            dispatch(loadChannelName({ category_id }));
                            formik.handleChange(e);
                          }}
                          color={errors.category_id && touched.category_id ? "error" : null}
                          onBlur={handleBlur}
                        >
                          <option disabled value="">
                            {"select category"}
                          </option>
                          {catItemData?.list?.map((d, i) => <option key={i} value={d.category_id}>{d.category_name}</option>)}

                        </Select>
                        {errors.category_id && touched.category_id ? (
                          <Label>{errors.category_id}</Label>
                        ) : null}

                        <Label color="font" htmlFor="channel_id">{"Channel Name"} </Label>
                        <Select
                          app
                          name="channel_id"
                          value={values.channel_id || ""}
                          onChange={handleChange}
                          color={errors.channel_id && touched.channel_id ? "error" : null}
                          onBlur={handleBlur}
                        >
                          <option disabled value="">
                            {"select channel"}
                          </option>
                          {chnlData?.namelist?.map((d, i) => <option key={i} value={d.channel_id}>{d.channel_name}</option>)}

                        </Select>
                        {errors.channel_id && touched.channel_id ? (
                          <Label>{errors.channel_id}</Label>
                        ) : null}


                        <Label color="font" htmlFor="ticket_url">{"Ticket URL"}</Label>
                        <Input
                          app
                          type="text"
                          name="ticket_url"
                          placeholder={"Type ticket url"}
                          value={values.ticket_url || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.ticket_url && touched.ticket_url ? (
                          <Label>{errors.ticket_url}</Label>
                        ) : null}


                        <Label color="font" htmlFor="event_loc">{"Event Location"}</Label>
                        <Input
                          app
                          type="text"
                          name="event_loc"
                          placeholder={"Type event location"}
                          value={values.event_loc || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.event_loc && touched.event_loc ? (
                          <Label>{errors.event_loc}</Label>
                        ) : null}


                      </Flex>
                      <Flex md={6} xs={12}>

                        <Label color="font" htmlFor="event_date">
                          {"Event Date"}{" "}
                        </Label>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "Y-m-d",
                            noCalendar: false,
                            enableTime: false,
                            minDate: "today"
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
                                placeholder="Pick Date"
                                value={values.event_date || ""}
                                ref={ref}
                              />
                            );
                          }}
                        />
                        {errors.event_date && touched.event_date ? (
                          <Label>{errors.event_date}</Label>
                        ) : null}


                        <Label color="font" htmlFor="event_time">
                          {"Event Time"}{" "}
                        </Label>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "H:i",
                            enableTime: true,
                            noCalendar: true,
                            time_24hr: true,
                            minuteIncrement: 15
                          }}
                          value={values.event_time || ""}
                          onChange={(e, str) => {
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
                        {errors.event_time && touched.event_time ? (
                          <Label>{errors.event_time}</Label>
                        ) : null}


                        <Label color="font" htmlFor="event_expiry">
                          {"Event Expiry"}
                        </Label>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "Y-m-d H:i",
                            time_24hr: true,
                            enableTime: true,
                            minuteIncrement: 15,
                            minDate: values.event_date || DateTime.now().toFormat("yyyy-MM-dd"),
                            minTime:
                              values.event_expiry && values.event_expiry.split(" ")[0] === values.event_date
                                ? DateTime.fromFormat(values.event_time || DateTime.now().toFormat("HH:mm"), "HH:mm")
                                  .plus({ minutes: 30 })
                                  .toFormat("HH:mm")
                                : null,
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
                                placeholder="Pick Expiry Date"
                                value={values.event_expiry || ""}
                                ref={ref}
                              />
                            );
                          }}
                        />
                        {errors.event_expiry && touched.event_expiry ? (
                          <Label>{errors.event_expiry}</Label>
                        ) : null}


                        <Label color="font" htmlFor="event_keywords">{"Event Keywords"}</Label>
                        <Input
                          app
                          type="text"
                          name="event_keywords"
                          placeholder={"Type event keywords"}
                          value={values.event_keywords || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.event_keywords && touched.event_keywords ? (
                          <Label>{errors.event_keywords}</Label>
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
                          <option value="InActive">Inactive</option>
                          <option value="Expired">Expired</option>
                        </Select>

                      </Flex>
                    </Flex>
                  </CardBody>
                </form>
              </div>
            );
          }}
        </Formik>
        <Loading loader={eventSetup.addUpdateLoading} />
      </Modal>
    </>
  );
};

