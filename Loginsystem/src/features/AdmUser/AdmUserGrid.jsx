import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { loadAdmUserConfig } from "./admUser_slice";
import { AdmUserModal } from "./AdmUserModal";
import { loadUserRole } from "./user_role_slice";
import { AdmUserRole } from "./AdmUserRole";
import { AdmUserDelete } from "./AdmUserDelete";
import { Toast } from "../../components/Toast";
import { Flex } from "../../components/style/Flex_styled";

export const AdmUserGrid = () => {
  const userConfig = useSelector((state) => state.admuser);
  const userReadOnly = useSelector((state) => +state.user.read_only);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const [user_id, set_user_id] = useState(0);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  useEffect(() => {
    (userConfig.addUpdateLoading == "succeeded") && dispatch(loadAdmUserConfig());
  }, [userConfig.addUpdateLoading]);

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
      headerName: "Full Name",
      field: "fullname",
      description: "Full Name",
      fontFamily:"var(--dashboard-font)",
      sortable: true,
      filterable: true,
      type: "string",
       width:"220px"
    },
    {
      headerName: "Username",
      field: "username",
      fontFamily:"var(--dashboard-font)",
      description: "Username",
      width:"130px"
    },
    {
      headerName: "Nick Name",
      field: "nickname",
      fontFamily:"var(--dashboard-font)",
      description: "Nick Name",
      hide:true,
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
      headerName: "Date",
      field: "create_date",
      fontFamily:"var(--dashboard-font)",
      description: "Create Date",
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
          dispatch(loadUserRole({role_user_id:user_id}));
          set_user_id(user_id);
        },
        (user_id) => {
          setRemove(true);
          set_user_id(user_id);
        },
      ],
    },
  ];


  let rows = userConfig.list.map((d,i) => ({
    ...d,"serial": i + 1 ,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
  }));

  return (
    <Suspense fallback={<Loader />}>
      <>  {(userConfig.addUpdateLoading == "idle" || userConfig.addUpdateLoading == "pending") ? <></> : (
          userConfig.addUpdateLoading == "succeeded" ? (
            <Toast msg={userConfig.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={userConfig.msg} />
          )
        )}
    
        <Flex row>
          <DataGrid colums={colums} rows={rows||[]} />
        </Flex>
        <AdmUserDelete
          open={remove}
          setOpen={setRemove}
          data={{ delete_user_id: user_id }}
        />
        <AdmUserModal open={open} setOpen={setOpen} data={data} />
        <AdmUserRole open={settingOpen} setOpen={setSettingOpen} data={{ role_user_id: user_id }} />
      </>
    </Suspense>
  );
};
