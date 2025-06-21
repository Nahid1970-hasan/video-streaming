import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import {
    InfoCard,
} from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import { loadCategoryList } from "../features/admCategory/adm_category_slice";
import UnAuthorized from "./UnAuthorized";
import { CategoryItemGridPage } from "../features/admCategory/CategoryItemGrid";
import { AddCategoryItemModal } from "../features/admCategory/AddCategoryItemModal";

export const AdminMasterDataPage = () => {
    const admCatItem = useSelector((state) => state.catitem);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadCategoryList());
        dispatch(
            loadPage({
                title: "Cateogry Page",
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "Add New",
                // buttonIcon: "add",
            })
        );
    }, []);

    useEffect(() => {
        admCatItem.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [admCatItem.loading]);

    useEffect(() => {
        admCatItem.addUpdateLoading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [admCatItem.addUpdateLoading]);

    return admCatItem.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
        <Suspense>
            <Flex row>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <CategoryItemGridPage/>
                </Flex>
            </Flex>
            <AddCategoryItemModal open={open} setOpen={setOpen}/>
            <Loading open={isLoading} />
        </Suspense>

    </>
    );
};
