import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import { Flex } from "../components/style/Flex_styled";
import { loadPage } from "../features/page/page_slice";
import { loadPromtUserConfig } from "../features/umPromoterUser/um_promoter_user_slice";
import { PromtUserGrid } from "../features/umPromoterUser/PromtUserGrid";
import { PromtUserModal } from "../features/umPromoterUser/PromtUserModal";
import UnAuthorized from "./UnAuthorized";


export const AdminPromoterUserPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userConfigData = useSelector((state) => state.umpromtuser);

  useEffect(() => {
    dispatch(loadPromtUserConfig());
    dispatch(
      loadPage({
        title: ("Promter Users"),
        button: false,
        
      })
    );
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
        <PromtUserGrid />
      </Flex>
      <PromtUserModal open={open} setOpen={setOpen} data={{}} add />
    </Suspense>
    <Loading open={isLoading} />
  </>
  );
};
