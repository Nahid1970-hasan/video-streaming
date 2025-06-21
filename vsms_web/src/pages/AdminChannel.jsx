import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import {
  CardBody,
  InfoCard,
} from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import DataGrid from "../components/DataGrid";
import { Toast } from "../components/Toast";
import { loadChannelList } from "../features/channels/adm_channel_slice";
import { ChannelConfigModal } from "../features/channels/ChannelConfigModal";
import { loadCategoryList } from "../features/admCategory/adm_category_slice";
import UnAuthorized from "./UnAuthorized";


export const AdminChannelPage = () => {
  const channelData = useSelector((state) => state.channelconfig);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const admCatItemData = useSelector((state) => state.catitem);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadChannelList());
    dispatch(loadPage({ title: "Channels", button: false }));
  }, []);

  useEffect(() => {
    channelData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
  }, [channelData.loading]);

  useEffect(() => {
    channelData.addUpdateLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [channelData.addUpdateLoading]);

  useEffect(() => {
    admCatItemData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [admCatItemData.loading]);


  const colums = [
    {
      headerName: "ID",
      field: "channel_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: "Channel Name",
      field: "channel_name",
      description: "Channel Name",
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
      width: "200px"
    },

    {
      headerName: "Channel Description",
      field: "channel_desc",
      description: "Channel Description",
    },
    {
      headerName: "Expire Date",
      field: "channel_expiry",
      description: "Expire Date",
    },

    {
      headerName: "Status",
      field: "channel_status",
      description: "status",
      width: "100px"
    },

    {
      headerName: "Action",
      field: "",
      hide: userReadOnly,
      type: "action",
      icons: ["edit"],
      colors: ["success"],
      descriptions: ["Update"],
      callBacks: [
        (channel_id) => {
          dispatch(loadCategoryList());
          var rowdata = channelData?.list?.find((d) => d.channel_id == channel_id);
          setData(rowdata);
          setOpen(true)
        },

      ],
    },
  ];


  return  channelData.loading === "unauthorized" ? (
    <UnAuthorized />
) :(<>
    {(channelData.addUpdateLoading == "idle" || channelData.addUpdateLoading == "pending") ? <></> : (
      channelData.addUpdateLoading == "succeeded" ? (
        <Toast msg={channelData.msg} icon="task_alt" color="success" />
      ) : (
        <Toast color="error" msg={channelData.msg} />
      )
    )}
    <Suspense>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <CardBody>
            <DataGrid colums={colums} rows={channelData.list || []} />
          </CardBody>
        </Flex>
      </Flex>
    </Suspense>
    <ChannelConfigModal open={open} setOpen={setOpen} data={data} />
    <Loading open={isLoading} />
  </>
  );
};
