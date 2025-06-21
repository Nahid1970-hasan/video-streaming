import { useEffect } from "react";
import { useState } from "react";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { InfoCard, ModalCard } from "../components/style/Card_styled";
import { Img } from "../components/style/Img_Styled";
import { Typography } from "../components/style/Typography_styled";
import { AlertButton, DownloadButton, PrimaryButton, ReactButton } from "../components/Button";
import styled from "styled-components";
import { Center } from "../components/style/Center_styled";
import ErrorWidget from "./ErrorWidget";
import { loadEventListDetails } from "../features/proEvent/pro_event_slice";
import { getDayFromDate } from "../utils/helper";
import { DateTime } from "luxon";
import { config } from "../config/config";

// Background header section
const Header = styled.div`
   position: relative;
   width: 100%;
   height: 400px;
   background-image: ${({ img }) => img ? 'url(' + img + ')' : '#'};
   background-size: cover;
   background-position: center;
   overflow: hidden;
   padding: 0;
`;



const CategoryButtonsWrapper = styled.div`
   position: absolute;
   bottom: 20px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 2;
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`;

const ScheduleWrapper = styled.div`
   padding: 10px 0;
`;

const SectionTitle = styled.h2`
   color: #d12d72;
   margin: 0 10px 10px 10px;
`;

const EventRow = styled.div`
   display: flex;
   text-align:center;
   justify-content: space-between;
   padding: 10px 10px;
   border-bottom: 1px solid #ddd;
`;

const DayButtonGroup = styled.div`
display:flex;
   justify-content: center;
   margin-top: 20px;
`;

const DayButton = styled.button`
   padding: 10px 20px;
   margin: 0 5px;
   background-color: ${({ isActive }) => (isActive ? '#d12d72' : '#fff')};
   color: ${({ isActive }) => (isActive ? 'white' : '#d12d72')};
   border: ${({ isActive }) => (isActive ? 'none' : '1px solid #d12d72')};
   border-radius: 5px;
   cursor: pointer;

   &:hover {
      background-color: ${({ isActive }) => (isActive ? '#c5005c' : '#f5f5f5')};
   }
`;

const LiveButton = styled.button`
   background-color: #e1006a;
   border: none;
   border-radius: 50px;
   padding: 10px 20px;
   color: white;
   font-weight: bold;
   display: flex;
   align-items: center;
   cursor: auto;

   &:before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: white;
      border-radius: 50%;
      margin-right: 10px;
   }

   &:hover {
      background-color: #c5005c;
   }
`;

const LinkButton = styled(Link)`
    background-color: #87CEEB;
    width: 100%;
    padding: 10px;
    text-align:center;
    font-size: 25px;
    border-radius: 8px;
    text-decoration: none;

`

export const EventWidgetPage = () => {
    const proEventDData = useSelector((state) => state.proevents);
    const [eventList, setEventList] = useState([]);
    const [liveEVData, setLiveEVData] = useState([]);
    const [upcEVTData, setUpcEVData] = useState([]);
    const [detailData, setDetailData] = useState({});
    const { WIDURL } = config; 
    const location = useLocation();
    const nevigate = useNavigate();
    const { data } = useParams();
    const [tokenstr] = useState(data.split("partner=")[1]);
    const [isLoading, setIsLoading] = useState(false);
    const [reqUrl, setReqUrl] = useState("#");
    const dispatch = useDispatch();

    const [activeDay, setActiveDay] = useState(DateTime.now().toFormat("yyyy-MM-dd"));

    const handleDayClick = (data) => {
        setUpcEVData(data?.event_list || []);
        setActiveDay(data?.event_date);
    };

    useEffect(() => {
        var dt = tokenstr.split("&evt");
        var reqdata = {
            "promoter_code": dt[0],
            "event_code": dt[1]
        }
        dispatch(loadEventListDetails(reqdata));
    }, [data]);

    useEffect(() => {
        setDetailData(proEventDData?.eventDetails || {});
        var durl = WIDURL+'/#/event/sub-request/promt'+proEventDData.eventDetails.promoter_code+"&evnt"+proEventDData.eventDetails.event_code;
        setReqUrl(durl);
    }, [proEventDData.eventDetails]);

    useEffect(() => {
        if (proEventDData?.detailList?.length) {
            setLiveEVData(proEventDData?.detailList[0]?.events_live)
            setEventList(proEventDData?.detailList[0]?.events);
        }else{
            setLiveEVData([]);
            setEventList([]);
        }
    }, [proEventDData.detailList]);

    useEffect(() => {
        if (eventList?.length) {
            setUpcEVData(eventList[0]?.event_list||[]);
        }else{
            setUpcEVData([])
        }
    }, [eventList]);

    useEffect(() => {
        proEventDData.ddLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 5000);
    }, [proEventDData.ddLoading]);

    function handleEvnClik(e, data){
        e.preventDefault();
        var durl = WIDURL+'/#/event/sub-request/promt'+ (data?.promoter_code||"") + "&evnt" + (data?.event_code||"");
        window.open(durl, "_blank", "noreferrer"); 
    }
    return proEventDData.ddLoading === "unauthorized" ? (<UnAuthorized />) : proEventDData.ddLoading == "idle" || proEventDData.ddLoading == "pending" ? <></> : proEventDData.ddLoading === "succeeded" ? (<>
        <div>
            <Header img={detailData?.event_banner || "banner"}>
                <div style={{ height: "100%", display: "flex", background: "#000", opacity: "0.7", justifyContent: "center", alignItems: "center" }}>
                   {Object.keys(detailData||{}).length>0?<Center>
                        <Typography fontSize="titleLargeFontSize" color="primaryFont" fontWeight="bold">{detailData?.event_name || ""}</Typography>
                        <Typography fontSize="titleLargeFontSize" color="primaryFont" fontWeight="bold">{detailData?.event_time || ""}</Typography>
                        <div style={{ width: "200px", opacity: "0.9", display: "flex", marginTop: "15px" }}><LinkButton to={reqUrl} target="_blank">Play Now</LinkButton></div>
                    </Center>:<Typography fontSize="titleLargeFontSize" color="primaryFont" fontWeight="bold">Invalid Event Request</Typography>}
                </div>
                <CategoryButtonsWrapper>
                    {
                        proEventDData?.detailList?.map((d, i) => <PrimaryButton onClick={() => { setEventList(d?.events || []), setLiveEVData(d?.events_live||[]) }} key={i}>{d.category_name || ""}</PrimaryButton>)
                    }
                </CategoryButtonsWrapper>
            </Header>
            {eventList.length > 0 ? <InfoCard>
                <Flex row>
                    <DayButtonGroup>
                        {eventList?.map((d, i) => (
                            <DayButton
                                key={i}
                                isActive={activeDay === d?.event_date}
                                onClick={() => handleDayClick(d)}
                            >
                                {getDayFromDate(d?.event_date)}
                            </DayButton>
                        ))}
                    </DayButtonGroup>
                </Flex>
            </InfoCard> : <></>}
            <ScheduleWrapper>
                {liveEVData.length > 0 ? <InfoCard>
                    <SectionTitle>ON NOW</SectionTitle>
                    <ModalCard>
                        <header>
                            <Flex row>
                                <Flex padding={"10px 0 0 10px !important"} md={2}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Time</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Event Title</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Description</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Expiry Time</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={1}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Status</Typography>
                                </Flex>
                            </Flex>
                        </header>
                        {liveEVData?.map((d, i) =>
                            <EventRow key={i}>
                                <Flex row>
                                    <Flex padding={"0 !important"} md={2}>
                                        <Typography textAlign="left">{d.event_time}</Typography>
                                    </Flex>
                                    <Flex padding={"0 !important"} md={3}>
                                        <Typography textAlign="left">{d.event_name}</Typography>
                                    </Flex>
                                    <Flex padding={"0 !important"} md={3}>
                                        <Typography textAlign="left">{d.event_desc}</Typography>
                                    </Flex>
                                    <Flex padding={"0 !important"} md={3}>
                                        <Typography textAlign="left">{d.event_expiry}</Typography>
                                    </Flex>
                                    <Flex padding={"0 !important"} md={1}>
                                        <LiveButton>LIVE</LiveButton>
                                    </Flex>
                                </Flex>
                            </EventRow>)}

                    </ModalCard>
                </InfoCard> : <></>}
                {upcEVTData.length > 0 ? <InfoCard>
                    <SectionTitle>COMING UP</SectionTitle>
                    <ModalCard>
                        <header>
                            <Flex row>
                                <Flex padding={"10px 0 0 10px !important"} md={2}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Time</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Event Title</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Description</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={3}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Buy Ticket</Typography>
                                </Flex>
                                <Flex padding={"10px 0 !important"} md={1}>
                                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Action</Typography>
                                </Flex>
                            </Flex>
                        </header>
                        <Flex row>
                            <Flex md="12">
                                {upcEVTData?.map((d, i) => <EventRow key={i}>
                                    <Flex row>
                                        <Flex padding={"0 !important"} md={2}>
                                            <Typography textAlign="left">{d.event_time}</Typography>
                                        </Flex>
                                        <Flex padding={"0 !important"} md={3}>
                                            <Typography textAlign="left">{d.event_name}</Typography>
                                        </Flex>
                                        <Flex padding={"0 !important"} md={3}>
                                            <Typography textAlign="left">{d.event_desc}</Typography>
                                        </Flex>
                                        <Flex padding={"0 !important"} md={3}>
                                            {d?.ticket_url?<Link style={{textAlign:"left", display:"flex", paddingLeft:"10px"}} to={d?.ticket_url || "#"} target="_blank">Get Ticket</Link>: <Typography textAlign="left">---</Typography>}
                                        </Flex>
                                        <Flex padding={"0 !important"} md={1}>
                                            <DownloadButton onClick={(e)=>handleEvnClik(e, d)} style={{textAlign:"left", display:"flex", paddingLeft:"10px"}}>Register Now</DownloadButton>
                                        </Flex>
                                    </Flex>

                                </EventRow>)}
                            </Flex>
                        </Flex>

                    </ModalCard>
                </InfoCard> : <></>}
            </ScheduleWrapper>
        </div>
        <Loading open={isLoading} />
    </>
    ) : (<><ErrorWidget /></>);
};
