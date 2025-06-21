
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { AdmPromoterModal } from "../features/admPromoter/AdmPromoterModal";
import { AdmPromoterGrid } from "../features/admPromoter/AdmPromoterGrid";
import { loadAdmPromoter } from "../features/admPromoter/admPromoter_slice";



export const AdmPromoter = () => {
  const userConfig = useSelector((state) => state.admuser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadAdmPromoter());
    dispatch(
      
      loadPage({
        title: ("Promoter "),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "Add Promoter",
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
          <AdmPromoterGrid />
      </Flex>
      <AdmPromoterModal open={open} setOpen={setOpen} data={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};