import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { Flex } from "../components/style/Flex_styled"; 
import { loadPage } from "../features/page/page_slice";
import { loadAdmUserConfig } from "../features/umAdminUser/um_admin_user_slice";
import { AdmUserGrid } from "../features/umAdminUser/AdmUserGrid";
import { AdmUserModal } from "../features/umAdminUser/AdmUserModal";
import { Loading } from "../components/Loading";
import UnAuthorized from "./UnAuthorized";
 
 
export const AdminUserPage = () => { 
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userConfigData = useSelector((state) => state.umadmuser);

  useEffect(() => {
    dispatch(loadAdmUserConfig());
    dispatch( 
      loadPage({
        title: ("Admin Users"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "Add user",
        // buttonIcon: "add",
      })
    );
  }, []);

  useEffect(() => {
      userConfigData.loading == "pending" ? setIsLoading(true): setTimeout(() =>  setIsLoading(false), 2000);
  }, [userConfigData.loading]);

  useEffect(() => {
    userConfigData.addUpdateLoading == "pending" ? setIsLoading(true): setTimeout(() =>  setIsLoading(false), 2000);
}, [userConfigData.addUpdateLoading]);

  return userConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
) :(<>
    <Suspense>
    <Flex row>
          <AdmUserGrid />
      </Flex>
      <AdmUserModal open={open} setOpen={setOpen} data={{}} add />
    </Suspense> 
    <Loading open={isLoading} />
  </>
  );
};
