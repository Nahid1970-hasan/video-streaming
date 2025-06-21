import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
import Flatpickr from "react-flatpickr";
import { useRef } from "react";
import { initLoader, loadChannelList, updateChannelInfo } from "./adm_channel_slice";
import { DateTime } from "luxon";

export const ChannelConfigModal = ({ add, open, setOpen = () => { }, data }) => {
    const channelConfigData = useSelector((state) => state.channelconfig);
    const admCategoryData = useSelector((state) => state.catitem);

    const [channel_id, set_channel_id] = useState(0);
    const formRef = useRef();
    const [date, setDate] = useState("");
    const [disabled, set_disabled] = useState(false);
    const [chdData, setChdData] = useState({
        channel_id: "",
        category_id: "",
        channel_desc: "",
        channel_status: "",
        channel_expiry: ""
    });
    const dispatch = useDispatch();

    useEffect(() => { 
        var today = DateTime.now().plus({days:30}).toFormat("yyyy-MM-dd");
        setDate(today); 
      }, []);

    useEffect(() => {
        setChdData(data);
        set_channel_id(data.channel_id || "");
    }, [data]);

    const submitForm = (values) => {
        var datad = {
            channel_id: channel_id,
            channel_desc: values.channel_desc,
            channel_expiry: date,
            category_id: values.category_id,
            channel_status: values.channel_status
        } 
       dispatch(updateChannelInfo(datad));
       set_disabled(true);
    };

    const validate = (values) => {
        let errors = {};
        if (!values.category_id) {
            errors.category_id = "Category Name is required";
        }
        if (!values.channel_expiry) {
            errors.channel_expiry = "Expiry date is required";
        }
        if (!values.channel_status) {
            errors.channel_status = "Status is required";
        }
        return errors;
    };

    useEffect(() => {
        if (channelConfigData.addUpdateLoading == "succeeded") {
            dispatch(loadChannelList());
            formRef.current.resetForm(); set_disabled(false); setOpen(false)
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (channelConfigData.addUpdateLoading != "idle" && channelConfigData.addUpdateLoading != "pending") {
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
        }
    }, [channelConfigData.addUpdateLoading]);

    return (
        <>
            <Modal
                md={4}
                sm={6}
                xs={10}
                title={"Channel Configuration Update"}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={chdData}
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
                                        <Label color="font" htmlFor="sender_name">{"Cannel Name"}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="channel_name"
                                            value={values.channel_name || ""}
                                            disabled
                                        />
                                        <Label color="font" htmlFor="channel_desc">{"Channel Description"}</Label>
                                        <Input
                                            app
                                            type="text"
                                            name="channel_desc"
                                            placeholder={"Type channel description"}
                                            value={values.channel_desc || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.channel_desc &&
                                            touched.channel_desc ? (
                                            <Label>{errors.channel_desc}</Label>
                                        ) : null}

                                        <Label color="font" htmlFor="category_id">{"Category Name"} </Label>
                                        <Select
                                            app
                                            name="category_id"
                                            value={values.category_id || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option disabled value="">
                                                {"select value"}
                                            </option>
                                            {admCategoryData?.list?.map((d, i) => <option key={i} value={d.category_id}>{d.category_name}</option>)}
                                        </Select>

                                        <Label color="font" htmlFor="expiry_date">{"Expired Date"} </Label>
                                        <Flatpickr
                                            readOnly
                                            options={{
                                                dateFormat: "Y-m-d H:i",
                                                enableTime: true,
                                            }}
                                            value={date || ""}
                                            onChange={(e, str) => { 
                                                setFieldValue("channel_expiry", str)
                                                setDate(str);
                                            }}
                                            render={({ value, ...props }, ref) => {
                                                return (
                                                    <Input
                                                        {...props}
                                                        type="text"
                                                        name="channel_expiry"
                                                        minWidth="auto"
                                                        placeholder={"choose date"}
                                                        value={date || ""}
                                                        ref={ref}
                                                    />
                                                );
                                            }}
                                        />
                                          {errors.channel_expiry &&
                                            touched.channel_expiry ? (
                                            <Label>{errors.channel_expiry}</Label>
                                        ) : null}
                                        <Label color="font" htmlFor="channel_status">{"Channel Status"} </Label>
                                        <Select
                                            app
                                            name="channel_status"
                                            value={values.channel_status || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option disabled value="">
                                                {"select value"}
                                            </option>
                                            <option value="init">Initial</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="expired">Expired</option>
                                        </Select>


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
