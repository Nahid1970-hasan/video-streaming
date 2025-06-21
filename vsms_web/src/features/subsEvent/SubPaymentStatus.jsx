
import { useEffect, useState } from "react";
import { AlertButton, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { Link, useNavigate } from "react-router-dom";
import { Center } from "../../components/style/Center_styled";
import { useSelector } from "react-redux";


export const SubPaymentStatusModal = ({ open, setOpen = () => { } }) => {
    const subValidEvt = useSelector((state) => state.subsvalidevents);
    const nevigate = useNavigate();

    return <Modal title={"Payment Status"} xs={4} open={open} onClose={() => {
        setOpen(false);
        nevigate("/");
    }} outsideclick>
        <Flex row>
            <Flex md={12}>
                <Typography fontWeight={100} fontSize="headingLargeFontSize" color="success">
                    Success
                </Typography>
                <Typography fontSize="bodyTitleFontSize" lineHeight="23px" color="font">
                   {subValidEvt.msg||""}
                </Typography>
                <Typography lineHeight="3rem" fontSize="bodyTitleFontSize" color="font">
                    Thank you for being with us
                </Typography>
                <Center>
                    <PrimaryButton onClick={()=>{nevigate("/")}} fontSize="bodySubTitleFontSize">
                        Watch Now!
                    </PrimaryButton>
                </Center>
            </Flex>
        </Flex>
    </Modal>
}