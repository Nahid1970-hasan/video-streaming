import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loading } from "../components/Loading";
import {
  InfoCard,
} from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import { useState } from "react";
 
export const AdminDashboard = () => {
  const dispatch = useDispatch();  
 
  useEffect(() => {   
    dispatch(loadPage({ title:  "Dashboard", button: false })); 
  }, []);
 
  return (<>
    <Suspense>
      <Flex row>
        <Flex padding="0 !important" md={4} sm={6} xs={12}>
          <InfoCard background={"emailDashbord"}>
            <Typography
              fontSize="bodySubTitleFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
             Promoter
            </Typography>
            <Typography
              fontSize="headingLargeFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
              100
            </Typography>
          </InfoCard>
        </Flex>

        <Flex padding="0 0 0 10px !important" md={4} sm={6} xs={12}>
          <InfoCard background={"dashboard"}>
            <Typography
              fontSize="bodySubTitleFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
              Public User
            </Typography>
            <Typography
              fontSize="headingLargeFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
             5000
            </Typography>
          </InfoCard>
        </Flex>

        <Flex padding="0 0 0 10px !important" md={4} sm={6} xs={12}>
          <InfoCard background={"warning"}>
            <Typography
              fontSize="bodySubTitleFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
             Channels
            </Typography>
            <Typography
              fontSize="headingLargeFontSize"
              color="font"
              width={"100%"}
              textAlign="center"
              fontWeight="bold"
            >
              1000
            </Typography>
          </InfoCard>
        </Flex> 
      </Flex>  
    </Suspense>
    
  </>
  );
};
