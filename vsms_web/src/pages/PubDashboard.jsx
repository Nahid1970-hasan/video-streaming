import React, { Suspense, useEffect, useState } from 'react';
import { Container, ContainerBody } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { CardBody, InfoCard, ModalCard } from "../components/style/Card_styled";
import KDPlayer from '../components/KDPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { loadSubsUserEvents } from '../features/subsUser/subs_user_slice';
import UnAuthorized from './UnAuthorized';
import { Loading } from '../components/Loading';
import styled from 'styled-components';
import { getDayFromDate } from '../utils/helper';
import { Link } from 'react-router-dom';
import { DateTime } from "luxon";
import { DownloadButton, PrimaryButton } from '../components/Button';
import { config } from '../config/config';

const EventRow = styled.div`
   display: flex;
   text-align:center;
   justify-content: space-between;
   padding: 10px 10px;
   border-bottom: 1px solid #ddd;
`;

const ScheduleWrapper = styled.div`
   padding: 10px 0;
`;

const SectionTitle = styled.h3`
   color: #d12d72;
   margin: 10px;
`;

const SectionTitleHeader = styled.h3`
   background: #aab4ba;
   color: #000; 
   padding: 10px;
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


const CategoryButtonsWrapper = styled.div` 
   bottom: 20px;  
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`;

export const PubDashboard = () => {
  const subUserData = useSelector((state) => state.subsusers);
  const [selectedGroup, setSelectedGroup] = useState('News');
  const [activeVideo, setActiveVideo] = useState(null);
  const [chTitle, setChTitle] = useState("");
  const dispatch = useDispatch();
  const { WIDURL } = config;
  const [activeDescription, setActiveDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState('live');
  const [activeDay, setActiveDay] = useState(DateTime.now().toFormat("yyyy-MM-dd"));
  const [eventList, setEventList] = useState([]);
  const [liveEVList, setLiveEVList] = useState([]);
  const [upcEVTData, setUpcEVData] = useState([]);

  const [reqUrl, setReqUrl] = useState("#");

  const channelsData = [

    {
      "ch_title": "ALJAZEERA",
      "ch_status": "Active",
      "ch_description": "ALJAZEERA Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/035e5737-921b-42e7-ab3a-6ece6bd8ce0e.m3u8",
      "ch_id": "kdrl_chid_2",
      "ch_logo": "aljazeera.png",
      "ch_group": "News"
    },

    {
      "ch_title": "ANIMAL PLANET",
      "ch_status": "Active",
      "ch_description": "ANIMAL PLANET Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://denver1769.pages.dev/Discovery/animal_planet_hd_english.m3u8",
      "ch_id": "kdrl_chid_5",
      "ch_logo": "animal_planet.png",
      "ch_group": "Documentary"
    },

    {
      "ch_title": "T SPORTS",
      "ch_status": "Active",
      "ch_description": "T SPORTS Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/3f2b6bf1-5b06-4ed0-a83d-1ebff274f61b.m3u8",
      "ch_id": "kdrl_chid_8",
      "ch_logo": "tsports.png",
      "ch_group": "Sports"
    },


    {
      "ch_title": "WILD EARTH",
      "ch_status": "Active",
      "ch_description": "WILD EARTH Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/08f70acc-24e2-433e-81dd-b1bba7dd4585.m3u8",
      "ch_id": "kdrl_chid_11",
      "ch_logo": "wild_earth.png",
      "ch_group": "Documentary"
    },


    {
      "ch_title": "BTV HD",
      "ch_status": "Active",
      "ch_description": "BTV HD Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/2bc79ce8-b278-4deb-8e47-406bf6a0f212.m3u8",
      "ch_id": "kdrl_chid_14",
      "ch_logo": "btv_hd.png",
      "ch_group": "Entertainment"
    },

    {
      "ch_title": "CHANNEL 24",
      "ch_status": "Active",
      "ch_description": "CHANNEL 24 Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://livess.ncare.live/live-orgin/channel24-sg-e8e.stream/playlist.m3u8",
      "ch_id": "kdrl_chid_16",
      "ch_logo": "channel_24.png",
      "ch_group": "News"
    },

    {
      "ch_title": "DBC NEWS",
      "ch_status": "Active",
      "ch_description": "DBC NEWS Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/35684091-9de4-4fc9-865d-75c7eee789d7.m3u8",
      "ch_id": "kdrl_chid_18",
      "ch_logo": "dbc_news.png",
      "ch_group": "News"
    },
    {
      "ch_title": "DEEPTO TV",
      "ch_status": "Active",
      "ch_description": "DEEPTO TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/4416a6d6-b7b3-4c0f-8228-43a4408a44ef.m3u8",
      "ch_id": "kdrl_chid_19",
      "ch_logo": "deepto_tv.png",
      "ch_group": "Entertainment"
    },

    {
      "ch_title": "MASRANGA TV",
      "ch_status": "Active",
      "ch_description": "MASRANGA TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/fabb2cb2-e2d5-4b44-9b9c-0bd44ce193df.m3u8",
      "ch_id": "kdrl_chid_20",
      "ch_logo": "machranga_tv.png",
      "ch_group": "Entertainment"
    },

    {
      "ch_title": "DISCOVERY BANGLA",
      "ch_status": "Active",
      "ch_description": "DISCOVERY BANGLA Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://varun-iptv.netlify.app/m3u/discoverybengali.m3u8",
      "ch_id": "kdrl_chid_21",
      "ch_logo": "discovery_bangla.png",
      "ch_group": "Documentary"
    },

    {
      "ch_title": "EKUSHEY TV",
      "ch_status": "Active",
      "ch_description": "EKUSHEY TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/fbbc34cf-5d10-49bf-8b55-fd7dc21f2133.m3u8",
      "ch_id": "kdrl_chid_24",
      "ch_logo": "ekushey_tv.png",
      "ch_group": "Entertainment"
    },


    {
      "ch_title": "IQRA BANGLA",
      "ch_status": "Active",
      "ch_description": "IQRA BANGLA Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://208.86.19.13:81/507.stream/index.m3u8",
      "ch_id": "kdrl_chid_29",
      "ch_logo": "iqra_bangla.png",
      "ch_group": "Islamic"
    },

    {
      "ch_title": "JAMUNA TV",
      "ch_status": "Active",
      "ch_description": "JAMUNA TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/ad852dab-fc68-4b1f-827f-c8889c22693a.m3u8",
      "ch_id": "kdrl_chid_31",
      "ch_logo": "jamuna_tv.png",
      "ch_group": "News"
    },


    {
      "ch_title": "MADANI BANGLA",
      "ch_status": "Active",
      "ch_description": "MADANI BANGLA Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://cloudflare2.iftyer23.workers.dev/c/@MadaniChannelBanglaLive.m3u8",
      "ch_id": "kdrl_chid_34",
      "ch_logo": "madani_bangla.png",
      "ch_group": "Islamic"
    },
    {
      "ch_title": "MY TV",
      "ch_status": "Active",
      "ch_description": "MY TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/464fa086-14de-4d75-9d96-2d6a97009874.m3u8",
      "ch_id": "kdrl_chid_35",
      "ch_logo": "my_tv.png",
      "ch_group": "Entertainment"
    },

    {
      "ch_title": "PEACE TV BANGLA",
      "ch_status": "Active",
      "ch_description": "PEACE TV BANGLA Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/4c48b4dd-448a-4eeb-896c-9465d82878af.m3u8",
      "ch_id": "kdrl_chid_39",
      "ch_logo": "peacetv_bangla.png",
      "ch_group": "Islamic"
    },

    {
      "ch_title": "SOMOY TV",
      "ch_status": "Active",
      "ch_description": "SOMOY TV Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/018727dc-86e5-4924-b872-30cc5e2d4a79.m3u8",
      "ch_id": "kdrl_chid_43",
      "ch_logo": "somoy_tv.png",
      "ch_group": "News"
    },
    {
      "ch_title": "WILLOW CRCICKET",
      "ch_status": "Active",
      "ch_description": "WILLOW CRCICKET Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/a148e220-6b24-405b-b5c7-3bd592b90e23.m3u8",
      "ch_id": "kdrl_chid_44",
      "ch_logo": "willow_cricket.png",
      "ch_group": "Sports"
    },

  ];

  const liveChannelList = [
    {
      "ch_title": "T SPORTS",
      "ch_status": "Active",
      "ch_description": "T SPORTS Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/3f2b6bf1-5b06-4ed0-a83d-1ebff274f61b.m3u8",
      "ch_id": "kdrl_chid_8",
      "ch_logo": "tsports.png",
      "ch_group": "Sports"
    },
    {
      "ch_title": "WILD EARTH",
      "ch_status": "Active",
      "ch_description": "WILD EARTH Live Streaming powered by KDRL Streamer.",
      "ch_url": "http://192.168.1.198:8080/memfs/08f70acc-24e2-433e-81dd-b1bba7dd4585.m3u8",
      "ch_id": "kdrl_chid_11",
      "ch_logo": "wild_earth.png",
      "ch_group": "Documentary"
    },
  ]


  const groups = Array.from(new Set(subUserData?.othlist?.map(channel => channel.category_name)));

  const filteredChannels = subUserData?.othlist?.filter(channel => channel.category_name === selectedGroup);

  const handleVideoClick = (videoUrl, code, description, title) => {
    setActiveVideo(videoUrl + ":tkn" + code);
    setChTitle(title);
    setActiveDescription(description);
  };

  useEffect(() => {
    subUserData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [subUserData.loading]);

  useEffect(() => { dispatch(loadSubsUserEvents()) }, []);


  useEffect(() => {
    if (subUserData?.othlist?.length > 0) {
      setSelectedGroup(subUserData?.othlist[0]?.category_id);
      setEventList(subUserData?.othlist[0]?.events || []);
      setLiveEVList(subUserData?.othlist[0]?.events_live || [])
    }
  }, [subUserData?.othlist]);

  useEffect(() => {
    if (subUserData?.livelist?.length > 0) {
      var data = subUserData?.livelist[0]; 
      setActiveVideo(data.channel_code + ":tkn" + data.channel_mask);
      setChTitle(data.event_name);
      setActiveDescription(data.event_desc);
    }
  }, [subUserData?.livelist]);


  function handleEvnClik(e, data) {
    e.preventDefault(); 
    var durl = WIDURL + '/#/event/sub-request/promt' + (data?.promoter_code || "") + "&evnt" + (data?.event_code || ""); 
    window.open(durl, "_blank", "noreferrer");
  }

  return subUserData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (<>
    <Suspense>
      <Container>
        <Flex row>
          <Flex md={7.5} padding="10px 10px !important">
            <InfoCard overflow="visible" background="font" height="580px">
              {activeVideo && <KDPlayer churl={activeVideo} />}
              {chTitle && (<>
                <Typography
                  fontSize="bodySubTitleFontSize"
                  fontWeight="bold"
                  color='primaryFont'
                  textAlign={"left"}
                >
                  {chTitle}
                </Typography>
                <Typography
                  color='primaryFont'
                  fontSize="bodyContentFontSize"
                  textAlign={"left"}
                >
                  {activeDescription}
                </Typography></>

              )}
            </InfoCard>
          </Flex>
          <Flex md={4.5} padding="10px 10px 10px 0 !important">
            <InfoCard overflow="scroll" height="580px">
              <ul style={{ display: 'flex', listStyle: 'none', padding: 0, borderBottom: '2px solid #ccc', backgroundColor: '#333' }}>
                <li
                  onClick={() => { setSelectedCat("live"); }}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedCat === "live" ? '#b2dbf3' : 'transparent',
                    color: selectedCat === "live" ? '#000' : '#fff',
                    fontWeight: selectedCat === "live" ? 'bold' : 'normal',
                    borderBottom: selectedCat === "live" ? '4px solid #b2dbf3' : 'none',
                    textAlign: 'left',
                  }}
                >
                  {"Live Now"}
                </li>
                <li
                  onClick={() => { setSelectedCat("upc") }}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedCat === "upc" ? '#b2dbf3' : 'transparent',
                    color: selectedCat === "upc" ? '#000' : '#fff',
                    fontWeight: selectedCat === "upc" ? 'bold' : 'normal',
                    borderBottom: selectedCat === "upc" ? '4px solid #b2dbf3' : 'none',
                    textAlign: 'left',
                  }}
                >
                  {"Coming Up"}
                </li>
              </ul>
              {selectedCat === "live" ? <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginTop: '10px'
                }}
              >
                {subUserData?.livelist?.map((channel, i) => (
                  <div
                    key={i}
                    onClick={() => handleVideoClick(channel.channel_code, channel.channel_mask, channel.event_desc, channel.event_name)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: activeVideo === channel.channel_code ? '#eee' : '#fff',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}
                  >
                    <img
                      src={channel.event_logo || ""}
                      alt={channel.event_name}
                      style={{ width: '100%', height: '75px', objectFit: 'contain', marginBottom: '10px' }}
                    />
                    <Typography fontSize="bodyContentFontSize" fontWeight="bold">
                      {channel.event_name}
                    </Typography>
                  </div>
                ))}
              </div> :
                <ModalCard height="515px">
                  <header>
                    <Flex row>
                      <Flex padding={"10px 0 0 10px !important"} md={2}>
                        <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Date</Typography>
                      </Flex>
                      <Flex padding={"10px 0 !important"} md={2}>
                        <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Time</Typography>
                      </Flex>
                      <Flex padding={"10px 0 !important"} md={4}>
                        <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Title</Typography>
                      </Flex>
                      <Flex padding={"10px 0 !important"} md={4}>
                        <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Description</Typography>
                      </Flex>
                    </Flex>
                  </header>
                  <Flex row>
                    <Flex md="12">
                      {subUserData?.upclist?.map((d, i) =>
                        <EventRow key={i}>
                          <Flex row>
                            <Flex padding={"0 !important"} md={2}>
                              <Typography textAlign="left">{d.event_date}</Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={2}>
                              <Typography textAlign="left">{d.event_time}</Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={4}>
                              <Typography textAlign="left">{d.event_name}</Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={4}>
                              <Typography textAlign="left">{d.event_desc}</Typography>
                            </Flex>
                          </Flex>
                        </EventRow>)}
                    </Flex>
                  </Flex>
                </ModalCard>}
            </InfoCard>
          </Flex>
        </Flex>
        <ContainerBody padding="0 10px 10px 10px !important">
          <InfoCard overflow={'visible'}>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0, borderBottom: '2px solid #ccc', backgroundColor: '#333' }}>
              {subUserData?.othlist.length ? subUserData?.othlist?.map((d, i) =>
                <li
                  key={i}
                  onClick={() => { setSelectedGroup(d.category_id); setEventList(d?.events || []); setLiveEVList(d?.events_live || []) }}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedGroup === d.category_id ? '#b2dbf3' : 'transparent',
                    color: selectedGroup === d.category_id ? '#000' : '#fff',
                    fontWeight: selectedGroup === d.category_id ? 'bold' : 'normal',
                    borderBottom: selectedGroup === d.category_id ? '4px solid #b2dbf3' : 'none',
                    textAlign: 'left',
                  }}
                >
                  {d.category_name}
                </li>) : <></>}
            </ul>
            {(eventList?.length > 0 || liveEVList?.length > 0) ? <ModalCard>
              <header>
                <Flex row>
                  <Flex padding={"10px 0 0 10px  !important"} md={2}>
                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Time</Typography>
                  </Flex>
                  <Flex padding={"10px 0 !important"} md={4}>
                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Title</Typography>
                  </Flex>
                  <Flex padding={"10px 0 !important"} md={5}>
                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Description</Typography>
                  </Flex>
                  <Flex padding={"10px 0 !important"} md={1}>
                    <Typography textAlign="left" fontWeight="bold" fontSize={"bodySubTitleFontSize"}>Action</Typography>
                  </Flex>
                </Flex>
              </header>
              <Flex row>
                <Flex md="12" padding={"0 !important"}>
                  {liveEVList?.length > 0 && <SectionTitleHeader>Live Now</SectionTitleHeader>}
                </Flex>
                <Flex md="12" padding={"0 !important"}>
                  {liveEVList?.map((ev, i) => <EventRow key={i}>
                    <Flex row>
                      <Flex padding={"0 !important"} md={2}>
                        <Typography textAlign="left">{ev.event_time}</Typography>
                      </Flex>
                      <Flex padding={"0 !important"} md={4}>
                        <Typography textAlign="left">{ev.event_name}</Typography>
                      </Flex>
                      <Flex padding={"0 !important"} md={5}>
                        <Typography textAlign="left">{ev.event_desc}</Typography>
                      </Flex>
                      <Flex padding={"0 !important"} md={1}>
                        <DownloadButton color="livenow" fontColor="primaryFont" onClick={(e) => handleEvnClik(e, ev)} style={{ textAlign: "left", display: "flex", paddingLeft: "10px" }}>Watch Now</DownloadButton>
                      </Flex>
                    </Flex>
                  </EventRow>)}
                </Flex>
                <Flex md="12" padding={"0 !important"}>
                  {eventList?.length > 0 && <SectionTitleHeader>Upcoming</SectionTitleHeader>}
                </Flex>
                <Flex md="12" padding={"0 !important"}>
                  {eventList?.map((d, i) =>
                    <div key={i}>
                      <SectionTitle> {getDayFromDate(d?.event_date)}</SectionTitle>
                      {d.event_list?.map((ev, i) => <EventRow key={i}>
                        <Flex row>
                          <Flex padding={"0 !important"} md={2}>
                            <Typography textAlign="left">{ev.event_time}</Typography>
                          </Flex>
                          <Flex padding={"0 !important"} md={4}>
                            <Typography textAlign="left">{ev.event_name}</Typography>
                          </Flex>
                          <Flex padding={"0 !important"} md={5}>
                            <Typography textAlign="left">{ev.event_desc}</Typography>
                          </Flex>
                          <Flex padding={"0 !important"} md={1}>
                            <DownloadButton onClick={(e) => handleEvnClik(e, ev)} style={{ textAlign: "left", display: "flex", paddingLeft: "10px" }}>Register Now</DownloadButton>
                          </Flex>
                        </Flex>
                      </EventRow>)}
                    </div>)}
                </Flex>
              </Flex>
            </ModalCard> : <></>}
          </InfoCard>
        </ContainerBody>

      </Container>
    </Suspense>
    <Loading open={isLoading} />
  </>

  );
};
