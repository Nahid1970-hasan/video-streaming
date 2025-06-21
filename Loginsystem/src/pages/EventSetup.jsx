import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
 
import { Flex } from "../components/style/Flex_styled"; 
import { loadPage } from "../features/page/page_slice";
import {  loadEventCatagory, loadEventSetup } from "../features/eventSetup/event_setup_slice";
import { EventSetupGrid } from "../features/eventSetup/EventSetupGrid";
import UnAuthorized from "./UnAuthorized";
import { EventSetupModal } from "../features/eventSetup/EventSetupModal";
 
 
export const EventSetup = () => {
  const eventSetupData = useSelector((state) => state.eventSetup);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    dispatch(loadEventSetup());
    dispatch(
      loadPage({
        title:  "Event Setup",
        button: true,
        onClick: () => {
          setOpen(true);
          dispatch(loadEventCatagory())
          // dispatch(loadChannel())
        },
        buttonText: "Add Event",
        // buttonIcon: "add",
      })
    );
  }, []);

  useEffect(() => {
    eventSetupData.loading == "pending"? setIsLoading(true):   setTimeout(() =>  setIsLoading(false), 2000);
  }, [eventSetupData.loading]);



  return eventSetupData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <EventSetupGrid/>
        </Flex>
      </Flex>
      <EventSetupModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
