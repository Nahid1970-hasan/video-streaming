
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteAdmUserConfig as deleteConfig,
} from "./admUser_slice";
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";

export const AdmUserDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const userConfig = useSelector((state) => state.admuser);

    function deleteUserConfig(e) {
        e.preventDefault();
        dispatch(deleteConfig(data));
    }
    useEffect(() => {
        if (userConfig.addUpdateLoading == "succeeded") setOpen(false) 
    }, [userConfig.addUpdateLoading]);

    return <Modal  title={("Delete User")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }}>
       <Flex row>
            <Flex md ="12">
                {("Are you sure? you want to delete user?")}
            </Flex>
       </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
               {("Cancel")}
            </SecondaryButton>
            <AlertButton onClick={deleteUserConfig}>
                {("Ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}