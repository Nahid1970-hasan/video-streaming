import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import {
  CardBody,
} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";  
import { Toast } from "../../components/Toast"; 
import { loadPromtUserRole } from "./um_subs_user_role_slice";
import { SubsUserRole } from "./SubsUserRole";
import { SubsUserDelete } from "./SubsUserDelete";
import { SubsUserModal } from "./SubsUserModal";

export const SubsUserGrid = () => {
  const userConfig = useSelector((state) => state.umsubsuser);
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
      headerName: "Expire Date",
      field: "expire_date",
      fontFamily:"var(--dashboard-font)",
      description: "Expired Date", 
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
        <SubsUserDelete
          open={remove}
          setOpen={setRemove}
          data={{ delete_user_id: user_id }}
        />
        <SubsUserModal open={open} setOpen={setOpen} data={data} />
        <SubsUserRole open={settingOpen} setOpen={setSettingOpen} data={{ role_user_id: user_id }} />
      </>
    </Suspense>
  );
};
