import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { loadAdmProfile } from "../features/profile/adm_profile_slice";
import { Typography } from "../components/style/Typography_styled";
import styled from "styled-components";

const UnderLine = styled.div`
    display:block;
    height: 1.5px; 
    width: 100%;
    background-color: #a7a4a4;
`;

export const AdminProfilePage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const profileData = useSelector(state => state.admprofile);

    useEffect(() => {
       // setIsLoading(true);
        // dispatch(loadAdmProfile({ "adm_user_id": localStorage.user_id }));
        dispatch(loadPage({ title: "Profile", button: false }))
    }, []);

    useEffect(() => {
        profileData.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [profileData.loading]);


    return <>
        {(profileData.updateLoading == "idle" || profileData.updateLoading == "pending") ? <></> : (
            profileData.updateLoading == "succeeded" ? (
                <Toast msg={profileData.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={profileData.msg} />
            )
        )}
        <Flex row>
            <Flex padding="0 !important" md={6} sm={10} xs={12}>
                <Flex row>
                    <Flex padding="0 !important" md={12} sm={12}>
                        <Typography textAlign="left" fontWeight="bold" notResize fontSize="bodyTitleFontSize" >
                            <p>{profileData.fullname || "---"}</p>
                        </Typography>
                    </Flex>
                    <Flex padding="10px 0 !important" md={12} sm={12}>
                        <UnderLine />
                    </Flex>
                </Flex>
                <Flex row>
                    <Flex padding="0 !important" md={6} sm={12}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {"Designation"}
                    </Typography></Flex>
                    <Flex padding="0 !important" md={6} sm={12} > <Typography notResize textAlign="left" fontSize="bodySubTitleFontSize" >
                        {":"} {" "} <p>{profileData.designation || "---"}</p>
                    </Typography>
                    </Flex>
                </Flex>

                <Flex row>
                    <Flex padding="0 !important" md={6} sm={12}><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {"Nickname"}
                    </Typography></Flex>
                    <Flex padding="0 !important" md={6} sm={12} > <Typography notResize textAlign="left" fontSize="bodySubTitleFontSize" >
                        {":"} {" "} <p>{profileData.nickname || "---"}</p>
                    </Typography>
                    </Flex>
                </Flex>

                <Flex row>
                    <Flex padding="0 !important" md={6} sm={12} ><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {"Email"}
                    </Typography></Flex>

                    <Flex padding="0 !important" md={6} sm={12}  > <Typography notResize textAlign="left" fontSize="bodySubTitleFontSize" >
                        {":"} {" "} <p>{profileData.email || "---"}</p>
                    </Typography>
                    </Flex>
                </Flex>
                <Flex row>
                    <Flex padding="0 !important" md={6} sm={12} ><Typography textAlign="left" fontSize="bodySubTitleFontSize" fontWeight="bold">
                        {"Contact Number"}
                    </Typography></Flex>

                    <Flex padding="0 !important" md={6} sm={12} > <Typography textAlign="left" fontSize="bodySubTitleFontSize">
                        {":"} {" "} {parseInt(profileData?.contact_number) ? getBNNumber(profileData.contact_number, true) : profileData?.contact_number || "---"}
                    </Typography>
                    </Flex>
                </Flex> 
            </Flex>
        </Flex>
        <Loading open={isLoading} />
    </>
}