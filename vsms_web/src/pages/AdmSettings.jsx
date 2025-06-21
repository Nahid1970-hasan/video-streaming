import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
 
import { Flex } from "../components/style/Flex_styled"; 
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { loadEmailConfig } from "../features/emailConfig/email_config_slice";
import { EmailConfigGrid } from "../features/emailConfig/EmailConfigGrid";
import { EmailConfigModal } from "../features/emailConfig/EmailConfigModal";
 
 
export const AdminSettingsPage = () => {
  const emailConfigData = useSelector((state) => state.emailconfig);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadEmailConfig());
    dispatch(
      loadPage({
        title:  "Email Configuration",
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "Add New",
        // buttonIcon: "add",
      })
    );
  }, []);

  useEffect(() => {
    emailConfigData.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
  }, [emailConfigData.loading]);

  return emailConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <EmailConfigGrid/>
        </Flex>
      </Flex>
      <EmailConfigModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
