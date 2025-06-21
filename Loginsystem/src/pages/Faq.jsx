import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Suspense } from "react";
import DataGrid from "../components/DataGrid";
import {
  CardBody,
} from "../components/style/Card_styled"; 

import { useEffect } from "react";
import { loadPage } from "../features/page/page_slice";
import { FaqModal } from "../features/Faq/FaqModal";

export const Faq = () => {
  const dispatch = useDispatch();
  // const faqData = useSelector((state) => state.faq);
  // const [faq_id, set_faq_id] = useState(0);
  // const [remove, setRemove] = useState(false);
  // const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  // const [editOpen, setEditOpen] = useState(false);
  // const [rows, set_rows] = useState([]);

  const colums = [
    {
      headerName: "Id",
      field: "faq_id",
      key: true,
      type: "number",
      hide: true,
    },
    {
      headerName: "Question",
      field: "question",
      description: "question",
      type: "string",
      width:"400px"
    },
    {
      headerName: "Answer",
      field: "answer",
      description: "answer",
      type: "string",
    },
    {
      headerName: "action",
      field: "",
      type: "action",
      icons: ["edit", "delete"],
      colors: ["success", "error"],
      descriptions:["Edit FAQ", "Delete FAQ"],
      callBacks: [
        (faq_id) => {
          var rowdata = data.find((d) => d.faq_id == faq_id);
          setEditOpen(true);
          setData(rowdata); 

        },
        (faq_id) => {
          var data = data.find((d) => d.faq_id == faq_id);
          setRemove(true);
          set_faq_id(faq_id);
        },
      ],
    },

  
  ];

    useEffect(() => {
    
      dispatch(
        loadPage({
          title: "FAQ",
          button: true,
          onClick: () => { 
            setOpen(true);
          },
          buttonText: "Add Faq", 
        })
      );
    }, []);

let rwData=[{"question":"What is streaming?","answer":"Streaming is a method of viewing video or listening to audio content without actually downloading the media files."}];
    return  (<>
    <Suspense fallback={<Loader />}>
      
      <Flex row>
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
            <CardBody>
              <DataGrid
                colums={colums}
                rows={rwData || []}
              />
            </CardBody>
            <FaqModal open={open} setOpen={setOpen} add />

        </Flex>
      </Flex>

    </Suspense>
    </>
    
    )  
        
  };

