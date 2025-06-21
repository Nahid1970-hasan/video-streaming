import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { useState } from "react";
import { loadPage } from "../features/page/page_slice";
import DataGrid from "../components/DataGrid";
import { EmailConfigModal } from "../features/emailConfig/EmailConfigModal";

export const EmailConfig = () => {
  // const emailConfig = useSelector((state) => state.emailConfig);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      loadPage({
        title: ("Email Config"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "Add Email",
        // buttonIcon: "add",
      })
    );
  }, []);

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
        headerName: ("Name"),
        field: "name",
        description: "name",
        sortable: true,
        filterable: true,
        fontFamily:"var(--dashboard-font)",
        type: "string",
    },
    {
        headerName: ("Email"),
        field: "email",
        description: "email",
        fontFamily:"var(--dashboard-font)",
    },


    { headerName: ("Used For"),
    description: "used_for",
     field: "used_for" },

    // {
    //     headerName: ("action"),
    //     field: "",
    //     hide: userReadOnly,
    //     type: "action",
    //     icons: ["edit", "delete"],
    //     colors: ["success", "error"],
    //     descriptions: ["Edit", "Delete"],
    //     callBacks: [
    //         (config_id) => {
    //             var rowdata = gridData.find((d) => d.config_id == config_id); 
    //             setOpen(true); 
    //             setData(rowdata);
    //         },
    //         (config_id) => {
    //             setRemove(true);
    //             set_config_id(config_id);
    //         },
    //     ],
    // },
];

let rwData=[{"name":"Hasan","email":"hasan@gmail.com","used_for":"Live Tv"}]
  return (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
        <DataGrid
                colums={colums}
                rows={rwData || []}
              />
        </Flex>
      </Flex>
      <EmailConfigModal open={open} setOpen={setOpen} data ={{}} add />
    </>
  );
};
