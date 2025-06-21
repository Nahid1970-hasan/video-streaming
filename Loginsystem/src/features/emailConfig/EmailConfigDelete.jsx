import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteEmailConfig as deleteEmail,
} from "./emailConfig_slice";
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";



export const EmailConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const emailConfig = useSelector((state) => state.emailConfig);

    useEffect(() => {
        if (emailConfig.addUpdateLoading == "succeeded") setOpen(false) 
    }, [emailConfig.addUpdateLoading]);

    function deleteEmailConfig(e) {
        e.preventDefault();
        dispatch(deleteEmail(data)); 
    }
    return <Modal  title={t("del_email_config")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row>
            <Flex md={12}>  {t("del_msg")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("cancel")}
            </SecondaryButton>
            <AlertButton onClick={deleteEmailConfig}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}