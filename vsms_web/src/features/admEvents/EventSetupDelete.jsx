 
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled"; 
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { deleteEventSetup } from "./adm_events_slice";
  
export const EventSetupDeletePage = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch(); 
    const eventSetupData = useSelector((state) => state.admevents);

    useEffect(() => {
        if (eventSetupData.addUpdateLoading == "succeeded") setOpen(false) 
    }, [eventSetupData.addUpdateLoading]);

    function deleteRecord(e) {
        e.preventDefault();
        dispatch(deleteEventSetup(data)); 
    }
    return <Modal  title={"Delete Event"} xs={4} open={open} onClose={() => {
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
            <AlertButton onClick={deleteRecord}>
            {"Delete"}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}