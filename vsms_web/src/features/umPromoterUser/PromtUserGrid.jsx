import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";  
import { Toast } from "../../components/Toast";
import { loadPromtUserRole } from "./um_promoter_user_role_slice";
import { PromtUserDelete } from "./PromtUserDelete";
import { PromtUserModal } from "./PromtUserModal";
import { PromtUserRole } from "./PromtUserRole";

export const PromtUserGrid = () => {
  const userConfig = useSelector((state) => state.umpromtuser);
  const userReadOnly = useSelector((state) => +state.user.read_only);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const [user_id, set_user_id] = useState(0);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
 

  const colums = [
    {
      headerName: "ID",
      field: "user_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Fullname",
      field: "fullname",
      description: "Fullname",
      fontFamily:"var(--dashboard-font)",
      sortable: true,
      filterable: true,
      type: "string", 
    },
    {
      headerName: "Username",
      field: "username",
      fontFamily:"var(--dashboard-font)",
      description: "Username", 
        width:"130px"
    },
    {
      headerName: "Usercode",
      field: "usercode",
      fontFamily:"var(--dashboard-font)",
      description: "Usercode", 
    },
    {
      headerName: "Address",
      field: "address",
      fontFamily:"var(--dashboard-font)",
      description: "Address", 
      width:"180px"
    },
    {
      headerName: "Contact Number",
      field: "contact_number",
      fontFamily:"var(--dashboard-font)",
      description: "Contact Number",
      width:"180px"
    },
    {
      headerName: "Email",
      field: "email",
      fontFamily:"var(--dashboard-font)",
      description: "Email",
    }, 
    {
      headerName: "Status",
      field: "status",
      fontFamily:"var(--dashboard-font)",
      type: "state",
      description: "Status",
      width:"120px"
    },

    {
      headerName: "Action",
      field: "",
      type: "action",
      hide: userReadOnly,
      icons: ["edit", "settings", "delete"],
      colors: ["success", "warning", "error"],
      descriptions: ["Edit", "Settings", "Delete"],
      callBacks: [
        (user_id) => {
          var data = rows.find((d) => d.user_id == user_id);
          data.status = data.status.label;
          setData(data); 
          setOpen(true); 
        },
        (user_id) => { 
          setSettingOpen(true);
          dispatch(loadPromtUserRole({role_user_id:user_id}));
          set_user_id(user_id);
        },
        (user_id) => {
          setRemove(true);
          set_user_id(user_id);
        },
      ],
    },
  ];
 
  let rows = userConfig?.list?.map((d,i) => ({
    ...d,"serial": i + 1 ,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
  }))||[];

  return (
    <Suspense fallback={<Loader />}>
      <>  {(userConfig.addUpdateLoading == "idle" || userConfig.addUpdateLoading == "pending") ? <></> : (
          userConfig.addUpdateLoading == "succeeded" ? (
            <Toast msg={userConfig.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={userConfig.msg} />
          )
        )}
    
        <CardBody>
          <DataGrid colums={colums} rows={rows||[]} />
        </CardBody>
        <PromtUserDelete
          open={remove}
          setOpen={setRemove}
          data={{ delete_user_id: user_id }}
        />
        <PromtUserModal open={open} setOpen={setOpen} data={data} />
        <PromtUserRole open={settingOpen} setOpen={setSettingOpen} data={{ role_user_id: user_id }} />
      </>
    </Suspense>
  );
};
