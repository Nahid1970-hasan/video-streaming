import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
 
import { Flex } from "../components/style/Flex_styled"; 
import { loadPage } from "../features/page/page_slice";
import { loadSubsUserConfig } from "../features/umSubsUser/um_subs_user_slice";
import { SubsUserGrid } from "../features/umSubsUser/SubsUserGrid";
import { SubsUserModal } from "../features/umSubsUser/SubsUserModal";
import UnAuthorized from "./UnAuthorized";


export const AdminSubscriberUserPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userConfigData = useSelector((state) => state.umsubsuser);

  useEffect(() => {
    dispatch(loadSubsUserConfig());
    dispatch(loadPage({
      title: "Subscriber Users", 
      button: false,
     
    }));
  }, []);

  useEffect(() => {
    userConfigData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [userConfigData.loading]);

  useEffect(() => {
    userConfigData.addUpdateLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [userConfigData.addUpdateLoading]);

  return userConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
) :(<>
    <Suspense>
      <Flex row>
        <SubsUserGrid />
      </Flex>
      <SubsUserModal open={open} setOpen={setOpen} data={{}} add />
    </Suspense>
    <Loading open={isLoading} />
  </>
  );
};
