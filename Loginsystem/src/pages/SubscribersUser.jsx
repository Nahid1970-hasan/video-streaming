
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { AdmSubscriberGrid } from "../features/admSubscribers/AdmSubscriberGrid";
import { AdmSubscriberModal } from "../features/admSubscribers/AdmSubscriberModal";
import { loadSubscriberConfig } from "../features/admSubscribers/adm_subscriber_slice";



export const SubscribersUser = () => {
  const userConfig = useSelector((state) => state.admuser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadSubscriberConfig());
    dispatch(
      
      loadPage({
        title: ("Subscriber User"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "Add Subscriber",
        // buttonIcon: "add",
      })
    );
  }, []);
  useEffect(() => {
    userConfig.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
  }, [userConfig.loading]);

  return  (
    <>
      <Flex row>
          <AdmSubscriberGrid />
      </Flex>
      <AdmSubscriberModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};