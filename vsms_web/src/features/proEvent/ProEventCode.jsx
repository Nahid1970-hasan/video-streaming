 
import { useEffect, useState } from "react";
import { AlertButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled"; 
import { Flex } from "../../components/style/Flex_styled";
 
  
export const EventCodePage = ({ open, setOpen = () => { }, data }) => {
    const [rwdata, set_rwdata] = useState({});
    const [isCopy, setIsCopy] = useState(false);

    useEffect(()=>{
        setIsCopy(false);
    },[])
    useEffect(()=>{
        var usrCode = localStorage.getItem("usercode") || "";
        var datacode = `<div data-vi-promt-id=`+usrCode+` data-vi-widget=`+data.event_code+`></div><script async src="`+data.js_url+`"></script>`;
        set_rwdata(datacode); 
    },[data])
  
    return <Modal  title={"Event Code"} xs={4} open={open} onClose={() => {
        setOpen(false);setIsCopy(false);
      }} outsideclick>
         <Flex row>
            <Flex md={12}> 
                <textarea  value={rwdata||"Code Not Found"} readOnly></textarea>    
             </Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                    setIsCopy(false);
                }}
            >
                 {"Cancel"}
            </SecondaryButton>
            <AlertButton color="primaryButton" disabled={!rwdata||isCopy} onClick={()=>{
                navigator.clipboard.writeText(rwdata);
                setIsCopy(true);
            }}>
            {isCopy?"Copied":"Copy Code"}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}