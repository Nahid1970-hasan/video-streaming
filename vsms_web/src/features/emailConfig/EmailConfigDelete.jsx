 
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled"; 
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { deleteEmailConfig } from "./email_config_slice";
  
export const EmailConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch(); 
    const emailConfig = useSelector((state) => state.emailconfig);

    useEffect(() => {
        if (emailConfig.addUpdateLoading == "succeeded") setOpen(false) 
    }, [emailConfig.addUpdateLoading]);

    function deleteEmail(e) {
        e.preventDefault();
        dispatch(deleteEmailConfig(data)); 
    }
    return <Modal  title={"Delete Email Configuration"} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row>
            <Flex md={12}>  {"Are you sure, want to delete records?"}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {"Cancel"}
            </SecondaryButton>
            <AlertButton onClick={deleteEmail}>
            {"Delete"}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}