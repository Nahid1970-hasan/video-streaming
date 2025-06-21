import { createContext, useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { config } from "../config/config";
import { getChannelCode } from "../utils/helper";

export const PlayerContext = createContext();

export default function ({ churl }) { 
    const [tv_id , set_tv_id ] = useState("");
    const [tv_etxn , set_tv_extn ] = useState("");
    const [tv_chc , set_tv_chc ] = useState("");
    const {VURL, VTYP} = config;
    useEffect(()=>{
        set_tv_id(VURL+'/'+VTYP);
    },[VURL]);
 
    useEffect(()=>{ 
      var dt = churl?.split(":tkn")|| ['', '']; 
      set_tv_chc(getChannelCode(dt[0],dt[1]));
      set_tv_extn("m3u8") 
  },[churl]);


    return (
        <PlayerContext.Provider value={{ tvurl: tv_id, tvextn: tv_etxn, tvchc:tv_chc}}>
          <VideoPlayer/>
        </PlayerContext.Provider>
      );

}