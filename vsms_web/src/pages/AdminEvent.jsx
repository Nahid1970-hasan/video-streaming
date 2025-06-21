
import { useDispatch, useSelector } from "react-redux" 
import { Flex } from "../components/style/Flex_styled" 
import { loadPage } from "../features/page/page_slice"
import { Suspense, useState } from "react"
import { useEffect } from "react"
import UnAuthorized from "./UnAuthorized"
import { Loading } from "../components/Loading"
import { loadEventSetup } from "../features/admEvents/adm_events_slice"
import { loadCategoryList } from "../features/admCategory/adm_category_slice"
import { EventSetupGridPage } from "../features/admEvents/EventSetupGrid"
import { EventSetupModalPage } from "../features/admEvents/EventSetupModal"


export const AdminEventPage = () => {
    const eventSetupData = useSelector((state) => state.admevents);
    const catItemData = useSelector((state) => state.catitem);
    const chnlData = useSelector((state) => state.channelconfig);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        dispatch(loadEventSetup());
        dispatch(
            loadPage({
              title:  "Events",
              button: true,
              onClick: () => {
                setOpen(true);
                dispatch(loadCategoryList())
              },
              buttonText: "Add Event",
              // buttonIcon: "add",
            })
          );
    }, []);

    useEffect(() => {
        eventSetupData.loading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [eventSetupData.loading]);

    useEffect(() => {
        chnlData.loading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [chnlData.loading]);

    useEffect(() => {
        catItemData.loading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [catItemData.loading]);


    useEffect(() => {
        eventSetupData.addUpdateLoading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [eventSetupData.addUpdateLoading]);


    return  eventSetupData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
        <Suspense>
            <Flex row>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <EventSetupGridPage/>
                </Flex>
            </Flex>
            <EventSetupModalPage open={open} setOpen={setOpen} add/>
            <Loading open={isLoading} />
        </Suspense>

    </>
    );
}