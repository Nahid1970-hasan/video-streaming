 
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
 
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { deleteCategoryItem } from "./adm_category_slice";



export const DeleteCategoryItemModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch(); 
    const admCatItem = useSelector((state) => state.catitem);

    useEffect(() => {
        if (admCatItem.addUpdateLoading == "succeeded") setOpen(false) 
    }, [admCatItem.addUpdateLoading]);

    function deleteEmailConfig(e) {
        e.preventDefault();
        dispatch(deleteCategoryItem(data)); 
    }
    return <Modal  title={"Delete Category Name"} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row>
            <Flex md={12}>  {"Are you sure, want to delete record?"}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {"Cancel"}
            </SecondaryButton>
            <AlertButton onClick={deleteEmailConfig}>
            {"Delete"}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}