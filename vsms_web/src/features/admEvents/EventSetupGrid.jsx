import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import {EventSetupModalPage } from "./EventSetupModal";
import {EventSetupDeletePage } from "./EventSetupDelete";
import { Flex } from "../../components/style/Flex_styled";
import { loadCategoryList } from "../admCategory/adm_category_slice";


export const EventSetupGridPage = () => {

    const eventSetupData = useSelector((state) => state.admevents);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [event_id, set_event_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
 
    const colums = [
        {
            headerName: "ID",
            field: "event_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },

        {
            headerName: "Name",
            field: "event_name",
            description: "Event Name",
            sortable: true,
            filterable: true, 
            type: "string",
        },
        {
            headerName: "Category Name",
            field: "category_name",
            description: "Category Name",
            sortable: true,
            filterable: true, 
            type: "string",
        },
        {
            headerName: "Description",
            field: "event_desc",
            description: "Event Description", 
        },
       
        {
            headerName: "Date",
            field: "event_date",
            description: "Event date", 
             width: "120px"
        },
        {
            headerName: "Time",
            description: "Event Time",
            field: "event_time",
            width: "80px"
        },
        {
            headerName: "Expiry",
            description: "Event Expiry",
            field: "event_expiry",
            width: "180px"
        },
        {
            headerName: "Status",
            field: "event_status",
            description: "Event Status", 
            width: "80px"
        },
        {
            headerName: "Action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (event_id) => {
                    var rowdata = eventSetupData?.list?.find((d) => d.event_id == event_id);
                    setOpen(true);
                    dispatch(loadCategoryList());
                    setData(rowdata); 
                },
                (event_id) => {
                    setRemove(true);
                    set_event_id(event_id);
                },
            ],
        },
    ];


    return <Suspense fallback={<Loader />}>
        <>
            {(eventSetupData.addUpdateLoading == "idle" || eventSetupData.addUpdateLoading == "pending") ? <></> : (
                eventSetupData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={eventSetupData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={eventSetupData.msg} />
                )
            )}
            <Flex row>
                <DataGrid colums={colums} rows={eventSetupData.list || []} />
            </Flex>
            <EventSetupDeletePage open={remove} setOpen={setRemove} data={{ event_id }} />
            <EventSetupModalPage open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}