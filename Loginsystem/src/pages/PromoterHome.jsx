import React, { useState } from 'react';
import { Container } from "../components/style/Container_styled";
import { Typography } from '../components/style/Typography_styled';
import { Flex } from '../components/style/Flex_styled';
import { InfoCard, ModalCard } from '../components/style/Card_styled';
import { FaqForm, SearchBar } from '../components/style/FAQ_Style';
import styled from 'styled-components';
import { AlertButton, PrimaryButton } from '../components/Button';

// Modal and JSONViewer styles
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const JSONViewer = styled.pre`
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap;
  overflow-x: auto;
`;

const DIV = styled.div` 
  padding: 5px 0 !important;
`;

export const PromoterHome = () => {
    // Example data structure with JSON data
    const list = [
        {
            question: "Category",
            answers: [
                {
                    text: "Channel 1",
                    options: {
                        date: "2024-01-01",
                        time: "12:00",
                        Channel_Name: "Channel 1",
                        description: "Live Channel 1",
                        image: "channel1.jpg",
                        action: "View",
                        jsonData: { detail: "Detail for Channel 1" }
                    }
                },
                {
                    text: "Channel 2",
                    options: {
                        date: "2024-01-02",
                        time: "14:00",
                        Channel_Name: "Channel 2",
                        description: "Recorded Channel 2",
                        image: "channel2.jpg",
                        action: "View",
                        jsonData: { detail: "Detail for Channel 2" }
                    }
                }
            ]
        },
    ];

    const [searchResults, setSearchResults] = useState(list);
    const [searchText, setSearchText] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [expandedAnswerIndex, setExpandedAnswerIndex] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showJSON, setShowJSON] = useState(false);
    const [jsonData, setJsonData] = useState(null);

    const searchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const toggleAnswer = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
            setExpandedAnswerIndex(null);
            setSelectedChannel(null);
        } else {
            setExpandedIndex(index);
            setSelectedChannel(null);
        }
    };

    const toggleAnswerDetail = (answerIndex, options) => {
        if (expandedAnswerIndex === answerIndex) {
            setExpandedAnswerIndex(null);
            setSelectedChannel(null);
        } else {
            setExpandedAnswerIndex(answerIndex);
            setSelectedChannel(options);
        }
    };

    const handleActionClick = (jsonData) => {
        setJsonData(jsonData);
        setShowJSON(true);
    };

    return (
        <Container>
            <Flex md={12} padding="0!important">
                <InfoCard>
                    <Flex row>
                        <Flex md={12} padding="0 !important">
                            <Typography textAlign="center" fontSize="bodyTitleFontSize" fontWeight="bold" margin="0 0!important">
                                Promoter Dashboard
                            </Typography>
                        </Flex>
                        {/* <Flex md={2} padding="0 !important">
                            <FaqForm>
                                <svg viewBox="0 0 512 512" width="100" title="search">
                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                                </svg>
                                <SearchBar type='text' placeholder={('Search')} onChange={searchTextChange} value={searchText} />
                            </FaqForm>
                        </Flex> */}
                    </Flex>
                </InfoCard>
            </Flex>

            <DIV>
                <InfoCard>
                    <Flex row>
                        <Flex md={2} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Date
                            </Typography>
                        </Flex>
                        <Flex md={2} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Time
                            </Typography>
                        </Flex>
                        <Flex md={2} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Channel Name
                            </Typography>
                        </Flex>
                        <Flex md={3} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Description
                            </Typography>
                        </Flex>
                        <Flex md={2} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Image
                            </Typography>
                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography textAlign="center" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                Action
                            </Typography>
                        </Flex>
                    </Flex>

                    <Flex padding={"0 !important"} md={12} flexDirection="column">
                        {searchResults?.map((item, index) => (
                            <div key={index} style={{ marginBottom: '1rem' }}>
                                <Flex row>
                                <Flex alignItems="center" padding="0!important" md={1}>
                                    <Typography
                                        fontSize="bodysubFontSize"
                                        onClick={() => toggleAnswer(index)}
                                        style={{ cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}
                                        textAlign="left"
                                    >
                                        {item.question}
                                    </Typography>
                                    
                                </Flex>
                                <Flex md={1} padding="5px 0 0 0 !important">
                                <Typography
                                        onClick={() => toggleAnswer(index)}
                                        style={{ cursor: 'pointer' }}
                                        textAlign="left"
                                    >
                                        {expandedIndex === index ? '▲' : '▼'}
                                    </Typography>
                                </Flex>
                                </Flex>
                                
                                {expandedIndex === index && (
                                    <div>
                                        {item.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex}>
                                                <Flex alignItems="center" padding="0!important">
                                                    <Typography
                                                        onClick={() => toggleAnswerDetail(answerIndex, answer.options)}
                                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                        textAlign="left"
                                                    >
                                                        {answer.text}
                                                    </Typography>

                                                </Flex>
                                                {expandedAnswerIndex === answerIndex && (
                                                    <Typography textAlign="left" style={{ paddingLeft: '1rem' }}>
                                                        {answer.details}
                                                    </Typography>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Flex>

                    <ModalCard >
                        <Flex row>
                            {selectedChannel ? (
                                <>
                                    <Flex md={2}><Typography textAlign="center">{selectedChannel.date}</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center">{selectedChannel.time}</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center">{selectedChannel.Channel_Name}</Typography></Flex>
                                    <Flex md={3}><Typography textAlign="center">{selectedChannel.description}</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center"><img src={selectedChannel.image} alt="Channel" style={{ width: '50px', height: '50px' }} /></Typography></Flex>
                                    <Flex md={1}>
                                        <Typography textAlign="center" onClick={() => handleActionClick(selectedChannel.jsonData)} style={{ cursor: 'pointer' }}>
                                            {selectedChannel.action}
                                        </Typography>
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <Flex md={2}><Typography textAlign="center">All Dates</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center">All Times</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center">All Channels</Typography></Flex>
                                    <Flex md={3}><Typography textAlign="center">All Descriptions</Typography></Flex>
                                    <Flex md={2}><Typography textAlign="center">All Images</Typography></Flex>
                                    <Flex md={1}><Typography textAlign="center">...</Typography></Flex>
                                </>
                            )}
                        </Flex>
                    </ModalCard>
                </InfoCard>
            </DIV>
            {showJSON && (
                <Modal>
                    <ModalContent>
                        <Typography fontWeight="bold" marginBottom="10px">JSON Data:</Typography>
                        <JSONViewer>{JSON.stringify(jsonData, null, 2)}</JSONViewer>
                        <AlertButton onClick={() => setShowJSON(false)}>Close</AlertButton>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};
