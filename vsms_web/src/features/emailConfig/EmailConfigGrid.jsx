import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadEmailConfig } from "./email_config_slice";
import { EmailConfigDelete } from "./EmailConfigDelete";
import { EmailConfigModal } from "./EmailConfigModal";


export const EmailConfigGrid = () => {

    const emailConfig = useSelector((state) => state.emailconfig);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [config_id, set_config_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        emailConfig.addUpdateLoading == "succeeded" && dispatch(loadEmailConfig());
    }, [emailConfig.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "config_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Sender Name",
            field: "sender_name",
            description: "Sender Name",
            sortable: true,
            filterable: true, 
            type: "string",
        },
        {
            headerName: "Sender Email",
            field: "sending_email_address",
            description: "Sender Email", 
        },
        {
            headerName: "Email Server",
            field: "email_server",
            description: "Email Server", 
        },
        {
            headerName: "SSL",
            field: "enable_ssl",
            description: "ssl", 
            width: "100px"
        },
        {
            headerName: "Credential Email",
            field: "network_cred_user_email",
            description: "Credential Email", 
        }, 
        {
            headerName: "Port",
            field: "port",
            type: "string",
            width: "80px", 
            description: "Port",
        },
        {
            headerName: "Used for",
            description: "Used for",
            field: "used_for"
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
                (config_id) => {
                    var rowdata = emailConfig?.list?.find((d) => d.config_id == config_id);
                    setOpen(true);
                    setData(rowdata); 
                },
                (config_id) => {
                    setRemove(true);
                    set_config_id(config_id);
                },
            ],
        },
    ];


    return <Suspense fallback={<Loader />}>
        <>
            {(emailConfig.addUpdateLoading == "idle" || emailConfig.addUpdateLoading == "pending") ? <></> : (
                emailConfig.addUpdateLoading == "succeeded" ? (
                    <Toast msg={emailConfig.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={emailConfig.msg} />
                )
            )}
            <CardBody>
                <DataGrid colums={colums} rows={emailConfig.list || []} />
            </CardBody>
            <EmailConfigDelete open={remove} setOpen={setRemove} data={{ config_id }} />
            <EmailConfigModal open={open} setOpen={setOpen} data={data} />
        </>

    </Suspense>;
}