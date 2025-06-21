import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import DataGrid from "../../components/DataGrid";
import { Card, CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { loadCategoryList } from "./adm_category_slice";
import { DeleteCategoryItemModal } from "./DeleteCategoryItemModal";

export const CategoryItemGridPage = () => {

    const admCatItem = useSelector((state) => state.catitem);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [category_id, set_category_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        admCatItem.addUpdateLoading == "succeeded" && dispatch(loadCategoryList());
    }, [admCatItem.addUpdateLoading]);

    const colums = [
        {
            headerName: "ID",
            field: "category_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Category Name",
            field: "category_name",
            description: "Category Name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: "Action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["delete"],
            colors: ["error"],
            descriptions: ["Delete"],
            callBacks: [
                (category_id) => {
                    setRemove(true);
                    set_category_id(category_id);
                },
            ],
        },
    ];


    return <Suspense fallback={<Loader />}>
        <>
            {(admCatItem.addUpdateLoading == "idle" || admCatItem.addUpdateLoading == "pending") ? <></> : (
                admCatItem.addUpdateLoading == "succeeded" ? (
                    <Toast msg={admCatItem.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={admCatItem.msg} />
                )
            )}
            <CardBody>
                <DataGrid colums={colums} rows={admCatItem.list || []} />
            </CardBody>
            <DeleteCategoryItemModal open={remove} setOpen={setRemove} data={{ category_id }} />

        </>

    </Suspense>;
}