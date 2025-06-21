import Hls from "hls.js";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "./KDPlayer";

export const VideoPlayer = () => {
  const { tvurl, tvextn, tvchc} = useContext(PlayerContext);
  const [URL, SETURL] = useState("");
  const usePlayRef = useRef(null); 
  
  useEffect(() => {
    var video = document.getElementById('video'); 
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = URL ?? "";
    }else if (Hls.isSupported()) { 
      var hls = new Hls({ debug: false});
      hls.loadSource(URL??"");
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        video.muted = true; 
        video.play();
      });
    }   
  }, [URL]);

  // useEffect(()=>{  
  //    SETURL(tvurl+tvextn)
  // },[tvurl,tvextn]);

  useEffect(() => { 
    SETURL(tvurl+"/"+tvchc+"."+tvextn);
  }, [tvchc]);
 

  return (
    <div>
      <video ref={usePlayRef} height={500} width={"100%"} id="video" controls></video>
    </div>
  )
}