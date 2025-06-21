import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadEventSetup } from "./event_setup_slice";
import { EventSetupModal } from "./EventSetupModal";
import { EventSetupDelete } from "./EventSetupDelete";
import { Flex } from "../../components/style/Flex_styled";


export const EventSetupGrid = () => {

    const eventSetup = useSelector((state) => state.eventSetup);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [event_id, set_event_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        eventSetup.addUpdateLoading == "succeeded" && dispatch(loadEventSetup());
    }, [eventSetup.addUpdateLoading]);

 
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
            headerName: "Category Name",
            field: "category_name",
            type: "string",
            sortable: false,
        },
        {
            headerName: "Event Name",
            field: "event_name",
            description: "Event Name",
            sortable: true,
            filterable: true, 
            type: "string",
        },
        {
            headerName: "Event Description",
            field: "event_desc",
            description: "Event Description", 
        },
        {
            headerName: "Channel Name",
            field: "channel_name",
            description: "Channel Code", 
            hide:true,
            
        },
        {
            headerName: "Event Status",
            field: "event_status",
            description: "Event Status", 
        },
        {
            headerName: "Event Date",
            field: "event_date",
            description: "Event date", 
        },
        {
            headerName: "Event Time",
            description: "Event Time",
            field: "event_time"
        },
        {
            headerName: "Event Expiry",
            description: "Event Expiry",
            field: "event_expiry",
         
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
                    var rowdata = eventSetup?.list?.find((d) => d.event_id == event_id);
                    setOpen(true);
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
            {(eventSetup.addUpdateLoading == "idle" || eventSetup.addUpdateLoading == "pending") ? <></> : (
                eventSetup.addUpdateLoading == "succeeded" ? (
                    <Toast msg={eventSetup.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={eventSetup.msg} />
                )
            )}
            <Flex row>
                <DataGrid colums={colums} rows={eventSetup.list || []} />
            </Flex>
            <EventSetupDelete open={remove} setOpen={setRemove} data={{ event_id }} />
            <EventSetupModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}