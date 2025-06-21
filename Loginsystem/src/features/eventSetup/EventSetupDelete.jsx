 
import { useDispatch, useSelector } from "react-redux";
import { AlertButton,  SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled"; 
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { deleteEventSetup } from "./event_setup_slice";
  
export const EventSetupDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch(); 
    const eventSetup = useSelector((state) => state.eventSetup);

    useEffect(() => {
        if (eventSetup.addUpdateLoading == "succeeded") setOpen(false) 
    }, [eventSetup.addUpdateLoading]);

    function deleteEmail(e) {
        e.preventDefault();
        dispatch(deleteEventSetup(data)); 
    }
    return <Modal  title={"Delete Event Setup"} xs={4} open={open} onClose={() => {
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