import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Flex } from "../../components/style/Flex_styled";
import { EventCodePage } from "./ProEventCode";


export const ProEventGridPage = () => {

    const proEventData = useSelector((state) => state.proevents); 
    const dispatch = useDispatch(); 
    const [rwdata, set_rwdata] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "event_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "Date",
            field: "event_date",
            description: "Event date", 
             width: "120px",
             type:"date"
        },
        {
            headerName: "Time",
            description: "Event Time",
            field: "event_time",
            width: "80px"
        },
        {
            headerName: "Name",
            field: "event_name",
            description: "Event Name",
            sortable: true,
            filterable: true, 
            type: "string",
        },
        
        {
            headerName: "Description",
            field: "event_desc",
            description: "Event Description", 
        },
       
        {
            headerName: "Image",
            field: "event_logo",
            description: "Event Logo", 
            type:"image",
            height: "100px",
            width: "200px"
            
        },
         
        
        {
            headerName: "Action",
            field: "", 
            type: "action",
            icons: ["more_horiz"],
            colors: ["font"],
            descriptions: ["Get Code"],
            callBacks: [
                (event_id) => {
                    var rowdata = proEventData?.list?.find((d) => d.event_id == event_id);  
                    set_rwdata(rowdata);
                    setOpen(true);
                },
                
            ],
        },
    ];

 
    return <Suspense fallback={<Loader />}>
        <> 
            <Flex row>
                <DataGrid colums={colums} rows={proEventData.list || []} />
            </Flex> 
            <EventCodePage open={open} setOpen={setOpen} data={rwdata}/>
        </> 
    </Suspense>;
}