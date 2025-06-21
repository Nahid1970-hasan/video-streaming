
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice"
import { Suspense, useRef, useState } from "react"
import { useEffect } from "react"
import UnAuthorized from "./UnAuthorized"
import { Loading } from "../components/Loading"
import { loadEventSetup, uploadEventFile, initLoader, loadEventData } from "../features/admEvents/adm_events_slice" 
import { Typography } from "../components/style/Typography_styled"
import { Select } from "../components/style/Select_styled"
import { DownloadButton } from "../components/Button"
import { Input } from "../components/style/Input_styled"
import { Label } from "../components/style/Label" 
import { Img } from "../components/style/Img_Styled"
import { Toast } from "../components/Toast"


export const AdminUpdateEventPage = () => {
    const eventSetupData = useSelector((state) => state.admevents); 
    const dispatch = useDispatch(); 
    const [event_id, set_event_id] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [upltype, set_upltype] = useState("");

    const [logoFilename, setLogoFileName] = useState(" ");
    const [selectedLogoFiles, setSelectedLogoFiles] = useState([]);
    const [logoUrl, setLogoUrl] = useState();
    const logoRef = useRef();

    const [bannerFilename, setBannerFileName] = useState(" "); 
    const [selectedBannerFiles, setSelectedBannerFiles] = useState([]);
    const [bannerUrl, setBannerUrl] = useState();
    const bannerRef = useRef();

    const [promoVFilename, setPromoVFileName] = useState(" "); 
    const [selectedPromVFiles, setSelectedPromoVFiles] = useState([]);
    const [promoVUrl, setPromoVUrl] = useState();
    const promoRef = useRef();

    useEffect(() => {
        dispatch(loadEventSetup());
        dispatch(
            loadPage({
                title: "Update Event",
                button: false,
                // buttonIcon: "add",
            })
        );
    }, []);


    useEffect(() => {
        if(eventSetupData?.eventData){
            var lgURL = eventSetupData.eventData.event_logo||"";
            var bnURL = eventSetupData.eventData.event_banner||"";
            var vdURL = eventSetupData.eventData.event_video||"";
            setLogoUrl(lgURL);
            setBannerUrl(bnURL);
            setPromoVUrl(vdURL);
        }
    }, [eventSetupData.eventData]);

    useEffect(() => {
        eventSetupData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [eventSetupData.loading]);
 
    
  useEffect(() => {
    if (eventSetupData.uploading == "pending") {
        setIsLoading(true)
    }else if (eventSetupData.uploading == "succeeded") { 
        if(upltype=="event"){
            setLogoFileName(" ");
            setSelectedLogoFiles([]);
            logoRef.current.value=""
        } else if(upltype=="banner"){
            setBannerFileName(" ");
            setSelectedBannerFiles([]);
            bannerRef.current.value=""
        }else if(upltype=="video"){
            setPromoVFileName(" ");
            setSelectedPromoVFiles([]);
            promoRef.current.value=""
        }
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false)}, 2000);
    } else if (eventSetupData.uploading != "idle") {
      setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
    }
  }, [eventSetupData.uploading]);

    return eventSetupData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
      {(eventSetupData.uploading == "idle" || eventSetupData.uploading == "pending") ? <></> : (
                eventSetupData.uploading == "succeeded" ? (
                    <Toast msg={eventSetupData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={eventSetupData.msg} />
                )
            )}
        <Suspense>
            <Flex row>
                <Flex md="2" padding="0 !important">
                    <Typography fontSize="bodySubTitleFontSize" textAlign="left">
                        Event Name
                    </Typography>
                </Flex>
                <Flex md="2" padding="0 !important">
                    <Select
                        app
                        name="division"
                        onChange={(e) => {
                            var catID = e.target.value;
                            set_event_id(catID); 
                            dispatch(loadEventData({ event_id: catID }));
                        }}
                        value={event_id || 0}
                    >
                        <option disabled value={0}>{"--select value"}</option>
                        {eventSetupData?.list?.map((d, i) => (
                            <option value={d.event_id} key={i}>
                                {d.event_name}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </Flex>

            <Flex row>
                <Flex md={6} padding="15px 5px 0 0 !important">
                    <Flex row>
                        <Flex md={4} sm={4} xs={12} padding="0 !important">
                            <Typography fontSize="bodySubTitleFontSize" textAlign="left">
                                Event Logo
                            </Typography>
                        </Flex>
                        <Flex md={6} sm={8} xs={12} padding="0 !important" >
                            <Input
                                app
                                type="file"
                                ref={logoRef}
                                name="filename"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    if (e.target.value && e.target.files) {
                                        var length = e.target.files[0].size / 1024;
                                        var fileName = e.target.files[0].name;
                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                                            if (length > 2048) {
                                                setLogoUrl('');
                                                setLogoFileName("");
                                                console.log("Image Size: ", length.toFixed(2) + " KB")
                                            } else {
                                                setSelectedLogoFiles(e.target.files[0])
                                                setLogoUrl(URL.createObjectURL(e.target.files[0]));
                                                setLogoFileName(fileName)
                                            }
                                        } else {
                                            setLogoUrl('');
                                            setLogoFileName("");
                                        }
                                    } else {
                                        console.log("Nothing choose")
                                    }
                                }}
                            />
                            {
                                !logoFilename ? <Label>Logo File is required</Label> : null
                            }
                        </Flex>
                        <Flex md={2} sm={8} xs={12} padding="0 5px 0 0!important">
                            <DownloadButton
                                type="Upload"
                                full
                                margin={"0.2rem"}
                                onClick={() => {
                                    var fileData = new FormData();
                                    fileData.append('file', selectedLogoFiles);  
                                    fileData.append('file_tag','logo');
                                    fileData.append('event_id', event_id);
                                    fileData.append('type', 'save_event_files');
                                    dispatch(uploadEventFile(fileData));
                                    set_upltype("event");
                                }}
                                disabled={!(logoFilename.trim()!="" && event_id)}
                            >
                                Upload
                            </DownloadButton>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex md={12} padding="10px 0 !important">
                            <Img height={"200px"} margin={"0"} src={logoUrl} alt="Preview Photo"></Img>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex md={6} padding="15px 0 0 5px !important">
                    <Flex row>
                        <Flex md={4} sm={4} xs={12} padding="0 !important">
                            <Typography fontSize="bodySubTitleFontSize" textAlign="left">
                                Event Banner
                            </Typography>
                        </Flex>
                        <Flex md={6} sm={8} xs={12} padding="0 !important" >
                            <Input
                                app
                                type="file"
                                ref={bannerRef}
                                name="filename_banner"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    if (e.target.value && e.target.files) {
                                        var length = e.target.files[0].size / 1024;
                                        var fileName = e.target.files[0].name;
                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                                            if (length > 2048) {
                                                setBannerUrl('');
                                                setBannerFileName("");
                                                console.log("Image Size: ", length.toFixed(2) + " KB")
                                            } else {
                                                setSelectedBannerFiles(e.target.files[0])
                                                setBannerUrl(URL.createObjectURL(e.target.files[0]));
                                                setBannerFileName(fileName)
                                            }
                                        } else {
                                            setBannerUrl('');
                                            setBannerFileName("");
                                        }
                                    } else {
                                        console.log("Nothing choose")
                                    }
                                }}
                            />
                            {
                                !bannerFilename ? <Label>Banner File is required</Label> : null
                            }
                        </Flex>
                        <Flex md={2} sm={8} xs={12} padding="0 5px 0 0!important">
                            <DownloadButton
                                type="Upload"
                                full
                                margin={"0.2rem"}
                                onClick={() => {
                                    var fileData = new FormData();
                                    fileData.append('file', selectedBannerFiles);
                                    fileData.append('file_tag','banner');
                                    fileData.append('event_id', event_id);
                                    fileData.append('type', 'save_event_files');
                                    dispatch(uploadEventFile(fileData));
                                    set_upltype("banner");
                                }} 
                                disabled={!(bannerFilename.trim()!="" && event_id )}
                            >
                                Upload
                            </DownloadButton>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex md={12} padding="10px 0 !important">
                            <Img height={"200px"} margin={"0"} src={bannerUrl} alt="Preview Photo"></Img>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex row>
                <Flex md={6} padding="15px 0 0 5px !important">
                    <Flex row>
                        <Flex md={4} sm={4} xs={12} padding="0 !important">
                            <Typography fontSize="bodySubTitleFontSize" textAlign="left">
                                Event Promo Video
                            </Typography>
                        </Flex>
                        <Flex md={6} sm={8} xs={12} padding="0 !important" >
                            <Input
                                app
                                type="file"
                                ref={promoRef}
                                name="filename_v"
                                accept=" video/*"
                                onChange={(e) => {
                                    if (e.target.value && e.target.files) {
                                        var length = e.target.files[0].size / 1024;
                                        var fileName = e.target.files[0].name;
                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                        if (extFile == "mp4" || extFile == "mkv") {
                                            if (length > 204800) {
                                                setPromoVUrl('');
                                                setPromoVFileName("");
                                                console.log("Image Size: ", length.toFixed(2) + " KB")
                                            } else {
                                                setSelectedPromoVFiles(e.target.files[0])
                                                setPromoVUrl(URL.createObjectURL(e.target.files[0]));
                                                setPromoVFileName(fileName)
                                            }
                                        } else {
                                            setPromoVUrl('');
                                            setPromoVFileName("");
                                        }
                                    } else {
                                        console.log("Nothing choose")
                                    }
                                }}
                            />
                            {
                                !promoVFilename ? <Label>Promo Video File is required</Label> : null
                            }
                        </Flex>
                        <Flex md={2} sm={8} xs={12} padding="0 5px 0 0!important">
                            <DownloadButton
                                type="Upload"
                                full
                                margin={"0.2rem"}
                                onClick={() => {
                                    var fileData = new FormData();
                                    fileData.append('file', selectedPromVFiles);
                                    fileData.append('file_tag','video');
                                    fileData.append('event_id', event_id);
                                    fileData.append('type', 'save_event_files');
                                    dispatch(uploadEventFile(fileData));
                                    set_upltype("video");
                                
                                }} 
                                disabled={!(promoVFilename.trim()!="" && event_id)}
                            >
                                Upload
                            </DownloadButton>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex md={12} padding="10px 0 !important">
                    <video height={"300px"} width="100%" margin={"0"} src={promoVUrl} alt="Preview Photo" controls></video>
                </Flex>
            </Flex>
            <Loading open={isLoading} />
        </Suspense>

    </>
    );
}