
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { CardBody } from "../components/style/Card_styled";
import styled from "styled-components";
import { Typography } from "../components/style/Typography_styled";
import { useEffect } from "react";
import { loadPage } from "../features/page/page_slice";

const UnderLine = styled.div`
    display:block;
    height: 1.5px; 
    width: 100%;
    background-color: #a7a4a4;
`;
export const Profile = () => {
    const dispatch = useDispatch();
    // const profileLoading = useSelector(state => state.self);

    useEffect(() => {
        dispatch(loadPage({
            title: "Profile",
            button: false,
            //  onClick: () => {
            //     setEditModal(true);
            // }
        }))
    }, []);

    return <>
        <CardBody>
            <Flex row>
                <Flex padding="0 !important" md={12} sm={12}>
                    <Typography textAlign="left" fontWeight="bold" notResize fontSize="bodyTitleFontSize" >
                       Admin Name {/* <p>{user.fullname || "---"}</p> */}
                    </Typography>
                </Flex>
                <Flex padding="10px 0 !important" md={12} sm={12}>
                    <UnderLine />
                </Flex>
            </Flex>
            <Flex row>
                <Flex padding="0 !important" md={6} sm={12}><Typography textAlign="left" fontSize="bodysubFontSize" fontWeight="bold">
                    {("Designation")}{" "}{":"}
                </Typography></Flex>
                <Flex padding="0 !important" md={6} sm={12} > <Typography notResize textAlign="left" fontSize="bodysubFontSize" >
                 {/* {":"} {" "} <p>{user.designation || "---"}</p> */}
                </Typography>
                </Flex>
            </Flex>

            <Flex row>
                <Flex padding="0 !important" md={6} sm={12} ><Typography textAlign="left" fontSize="bodysubFontSize" fontWeight="bold">
                    {("Email")}{" "}{":"}
                </Typography></Flex>

                <Flex padding="0 !important" md={6} sm={12}  > <Typography notResize textAlign="left" fontSize="bodysubFontSize" >
                    {/* {":"} {" "} <p>{user.email || "---"}</p> */}
                </Typography>
                </Flex>
            </Flex>
            <Flex row>
                <Flex padding="0 !important" md={6} sm={12} ><Typography textAlign="left" fontSize="bodysubFontSize" fontWeight="bold">
                    {("Contact Number")}{" "}{":"}
                </Typography></Flex>

                <Flex padding="0 !important" md={6} sm={12} > <Typography textAlign="left" fontSize="bodysubFontSize">
                    {/* {":"} {" "} {parseInt(user?.contact_number) ? getBNNumber(user.contact_number, true) : user?.contact_number || "---"} */}
                </Typography>
                </Flex>
            </Flex>
            
        </CardBody>
    </>
}