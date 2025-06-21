import React, { useRef, useState, useEffect } from 'react';
import Hls from 'hls.js'; // Import Hls.js
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { Typography } from "../components/style/Typography_styled";
import { CardBody, InfoCard } from "../components/style/Card_styled";

// Sample JSON data (abbreviated)
const redDotStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'red',
  display: 'inline-block',
  marginRight: '8px',
};

const greenDotStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'green',
  display: 'inline-block',
  marginRight: '8px',
};

const imageStyle = {
  width: '120px',
  height: '75px',
  borderRadius: '4px',
  marginRight: '10px',
};

export const Dashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState('News');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeDescription, setActiveDescription] = useState('');
  const videoRef = useRef(null);
  const channelsData = [
    { "ch_title": "ABP ANANDA", "ch_status": "Active", "ch_description": "ABP ANANDA Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/5cfef873-1d35-429e-aa43-062f7fbf5ee1.m3u8", "ch_id": "kdrl_chid_1", "ch_logo": "http://192.168.1.198:8080/Icons/abp_ananda.png", "ch_group": "Entertainment" },
    { "ch_title": "ALJAZEERA", "ch_status": "Active", "ch_description": "ALJAZEERA Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/ee5324b9-4f01-4e71-98a2-cb66618afbb1.m3u8", "ch_id": "kdrl_chid_2", "ch_logo": "http://192.168.1.198:8080/Icons/aljazeera.png", "ch_group": "News" },
    { "ch_title": "ANIMAL PLANET", "ch_status": "Active", "ch_description": "ANIMAL PLANET Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/b8e0a2a0-fdef-4a5b-abc9-1a4a68bc17e9.m3u8", "ch_id": "kdrl_chid_5", "ch_logo": "http://192.168.1.198:8080/Icons/animal_planet.png", "ch_group": "Documentary" },
    { "ch_title": "CHANNEL 24", "ch_status": "Active", "ch_description": "CHANNEL 24 Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/3a0dd310-63fa-4801-88d6-4820350b5763.m3u8", "ch_id": "kdrl_chid_16", "ch_logo": "http://192.168.1.198:8080/Icons/channel_24.png", "ch_group": "News" },
    { "ch_title": "DBC NEWS", "ch_status": "Active", "ch_description": "DBC NEWS Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/12390921-d53c-4d64-b9f9-7bf9e86c9216.m3u8", "ch_id": "kdrl_chid_18", "ch_logo": "http://192.168.1.198:8080/Icons/dbc_news.png", "ch_group": "News" },
    { "ch_title": "DISCOVERY BANGLA", "ch_status": "Active", "ch_description": "DISCOVERY BANGLA Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/745df80a-b803-446b-99b7-78d1a4cd0eb2.m3u8", "ch_id": "kdrl_chid_21", "ch_logo": "http://192.168.1.198:8080/Icons/discovery_bangla.png", "ch_group": "Documentary" },
    { "ch_title": "IQRA BANGLA", "ch_status": "Active", "ch_description": "IQRA BANGLA Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/3ad96ff2-876e-4d26-82b4-1f45cfd88716.m3u8", "ch_id": "kdrl_chid_29", "ch_logo": "http://192.168.1.198:8080/Icons/iqra_bangla.png", "ch_group": "Islamic" },
    { "ch_title": "JAMUNA TV", "ch_status": "Active", "ch_description": "JAMUNA TV Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/1301acfa-1d1a-4607-862c-c4c4f07da17c.m3u8", "ch_id": "kdrl_chid_31", "ch_logo": "http://192.168.1.198:8080/Icons/jamuna_tv.png", "ch_group": "News" },
    { "ch_title": "MADANI BANGLA", "ch_status": "Active", "ch_description": "MADANI BANGLA Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/1822f1ee-e647-45cf-9e31-98da1c7e50a4.m3u8", "ch_id": "kdrl_chid_34", "ch_logo": "http://192.168.1.198:8080/Icons/madani_bangla.png", "ch_group": "Islamic" },
    { "ch_title": "PEACE TV", "ch_status": "Active", "ch_description": "PEACE TV Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/5f206800-6f25-45f7-a951-39e692cd822c.m3u8", "ch_id": "kdrl_chid_38", "ch_logo": "http://192.168.1.198:8080/Icons/peace_tv.png", "ch_group": "Islamic" },
    { "ch_title": "SOMOY TV", "ch_status": "Active", "ch_description": "SOMOY TV Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/52a61cc2-9b49-472e-aa26-d36a4fd20734.m3u8", "ch_id": "kdrl_chid_43", "ch_logo": "http://192.168.1.198:8080/Icons/somoy_tv.png", "ch_group": "News" },
    { "ch_title": "STAR SPORTS 2 HD", "ch_status": "Active", "ch_description": "STAR SPORTS 2 HD Live Streaming powered by KDRL Streamer.", "ch_url": "http://192.168.1.198:8080/memfs/5591882f-d98f-4009-923a-abae5bb05029.m3u8", "ch_id": "kdrl_chid_52", "ch_logo": "http://192.168.1.198:8080/Icons/star_sports_2_hd.png", "ch_group": "Sports" }

  ];

  const groups = Array.from(new Set(channelsData.map(channel => channel.ch_group)));
  const filteredChannels = channelsData.filter(channel => channel.ch_group === selectedGroup);

  const handleVideoClick = (videoUrl, description) => {
    setActiveVideo(videoUrl);
    setActiveDescription(description);
  };

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      const hls = new Hls();
      const video = videoRef.current;
      if (Hls.isSupported()) {
        hls.loadSource(activeVideo);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = activeVideo;
        video.addEventListener('canplay', () => {
          video.play();
        });
      }
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [activeVideo]);

  return (
    <Container>
      <CardBody>
        <Flex md={12} padding="10px 0!important">
          <Typography textAlign="center" fontSize="bodyTitleFontSize" fontWeight="bold">
            Dashboard
          </Typography>

          <Flex row>
            <Flex md={8}>
              <InfoCard>
                {activeDescription && (
                  <Typography
                    fontSize="bodySubTitleFontSize"
                    fontWeight="bold"
                    style={{ marginBottom: '10px', textAlign: 'center' }}
                  >
                    {activeDescription}
                  </Typography>
                )}
                <video
                  ref={videoRef}
                  width="100%"
                  height="600px"
                  controls
                  style={{ backgroundColor: '#000' }}
                ></video>
              </InfoCard>
            </Flex>

           
            <Flex md={4} direction="column" padding="0 5px 0 0!important">
              <ul style={{ display: 'flex', listStyle: 'none', padding: 0, borderBottom: '2px solid #ccc', backgroundColor: '#333' }}>
                {groups.map(group => (
                   <li
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      backgroundColor: selectedGroup === group ? '#b2dbf3' : 'transparent',
                      color: selectedGroup === group ? '#000' : '#fff',
                      fontWeight: selectedGroup === group ? 'bold' : 'normal',
                      borderBottom: selectedGroup === group ? '4px solid #b2dbf3' : 'none',
                      textAlign: 'center',
                      flex: '1',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {group}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginTop: '20px'
                }}
              >
                {filteredChannels.map(channel => (
                  <div
                    key={channel.ch_title}
                    onClick={() => handleVideoClick(channel.ch_url, channel.ch_description)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: activeVideo === channel.ch_url ? '#eee' : '#fff',
                      borderRadius: '8px',
                      padding: '10px',
                      textAlign: 'center'
                    }}
                  >
                    <img
                      src={channel.ch_logo}
                      alt={channel.ch_title}
                      style={{ width: '100%', height: '75px', objectFit: 'contain', marginBottom: '10px' }}
                    />
                    <Typography fontSize="bodyContentFontSize" fontWeight="bold">
                      {channel.ch_title}
                    </Typography>
                  </div>
                ))}
              </div>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Container>
  );
};
