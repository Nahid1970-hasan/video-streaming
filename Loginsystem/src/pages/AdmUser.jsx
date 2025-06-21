
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { useState } from "react";
import { AdmUserGrid } from "../features/AdmUser/AdmUserGrid";
import { AdmUserModal } from "../features/AdmUser/AdmUserModal";
import { loadAdmUserConfig } from "../features/AdmUser/admUser_slice";
import { Loading } from "../components/Loading";



export const AdmUser = () => {
  const userConfig = useSelector((state) => state.admuser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadAdmUserConfig());
    dispatch(
      
      loadPage({
        title: ("User Management"),
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
    userConfig.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
  }, [userConfig.loading]);

  return  (
    <>
      <Flex row>
          <AdmUserGrid />
      </Flex>
      <AdmUserModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};