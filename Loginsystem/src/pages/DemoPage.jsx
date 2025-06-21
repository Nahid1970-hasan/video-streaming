import React, { useState, useEffect } from 'react';
import { Flex } from "../components/style/Flex_styled";
import styled from 'styled-components';
import { InfoCard, ModalCard } from '../components/style/Card_styled';
import { PrimaryButton } from '../components/Button';
import SomoyImg from '../assets/image/somoy.jpg';
import PtvImg from '../assets/image/ptv.png';
import SkyImg from '../assets/image/sky-tv.jpg';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Background header section
const Header = styled.div`
   position: relative;
   width: 100%;
   height: 400px;
   background-image: url("https://storage.googleapis.com/pod_public/1300/169545.jpg");
   background-size: cover;
   background-position: center;
   overflow: hidden;
   padding: 0;
`;

const SliderWrapper = styled(Slider)`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 80%;
   z-index: 2;
`;

const SliderImage = styled.img`
   width: 100%;
   height: 80%;
   object-fit: cover;
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

const EventRow = styled(Flex)`
   justify-content: space-between;
   padding: 10px 10px;
   border-bottom: 1px solid #ddd;
`;

const DayButtonGroup = styled(Flex)`
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
   cursor: pointer;

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



// Main component
export const DemoPage = () => {
   const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
   };

   // Get the current day
   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const todayIndex = new Date().getDay();

   // Rearrange the days starting from today
   const orderedDays = [
      'Today',
      'Tomorrow',
      ...daysOfWeek.slice(todayIndex + 2).concat(daysOfWeek.slice(0, todayIndex)),
   ];

   const [activeDay, setActiveDay] = useState('Today');

   // Handle day button click
   const handleDayClick = (day) => {
      setActiveDay(day);
   };

   return (
      <>
         <Header>
            <Flex row>
               <Flex md={2}></Flex>
               <Flex md={8}>
                  <SliderWrapper {...sliderSettings}>
                     <SliderImage src={SomoyImg} alt="Slide 1" />
                     <SliderImage src={PtvImg} alt="Slide 2" />
                     <SliderImage src={SkyImg} alt="Slide 3" />
                  </SliderWrapper>
               </Flex>
               <Flex md={2}></Flex>
            </Flex>

            <Flex row>
               <Flex md={1} padding="0 !important"></Flex>
               <Flex md={8} padding="0 50px 0 0!important">
                  <CategoryButtonsWrapper>
                     <PrimaryButton>Category 1</PrimaryButton>
                     <PrimaryButton>Category 2</PrimaryButton>
                     <PrimaryButton>Category 3</PrimaryButton>
                     <PrimaryButton>Category 4</PrimaryButton>
                     <PrimaryButton>Category 5</PrimaryButton>
                     <PrimaryButton>Category 6</PrimaryButton>
                  </CategoryButtonsWrapper>
               </Flex>
               <Flex md={2}></Flex>
            </Flex>
         </Header>
         
         <InfoCard>
            <Flex row>
               {/* 7-Day Buttons */}
               <DayButtonGroup>
                  {orderedDays.map((day, index) => (
                     <DayButton
                        key={index}
                        isActive={activeDay === day}
                        onClick={() => handleDayClick(day)}
                     >
                        {day}
                     </DayButton>
                  ))}
               </DayButtonGroup>
            </Flex>
         </InfoCard>

         <ScheduleWrapper>
            <InfoCard>
               <SectionTitle>ON NOW</SectionTitle>
               <ModalCard>
                  <EventRow row>
                     <span>0:30</span>
                     <span>Racing Replay</span>
                     <span>Another chance to watch yesterday's racing action from Musselburgh.</span>
                     <LiveButton>LIVE</LiveButton>
                  </EventRow>
               </ModalCard>
            </InfoCard>

            <Flex row>
               <Flex md={12}>
                  <InfoCard>
                     <SectionTitle>COMING UP</SectionTitle>
                     <ModalCard>
                        {/* Add EventRows for COMING UP section */}
                        <EventRow row>
                           <Flex row>
                              <Flex md={1} padding="0!important">
                                 <span>1:00</span>
                              </Flex>
                              <Flex md={2.5} padding="0!important">
                                 <span>Irish Racing Replay</span>
                              </Flex>
                              <Flex md={4} padding="0!important">
                                 <span>Another chance to watch yesterday's racing action from Leopardstown.</span>
                              </Flex>
                              <Flex md={2} padding="0!important">
                                 <Link href="#">Get Ticket</Link>
                              </Flex>
                              <Flex md={2} padding="0!important">
                                 <Link href="#">Register Now</Link>
                              </Flex>
                              <Flex md={0.5} padding="0 0 0 20px!important">
                                 <span className='material-icons md-20'>notifications_active</span>
                              </Flex>
                           </Flex>
                        </EventRow>
                        <EventRow row>
                                    <Flex row>
                                        <Flex md={1} padding="0!important">
                                            <span>1:00</span>
                                        </Flex>
                                        <Flex md={2.5} padding="0!important">
                                            <span>Irish Racing Replay</span>
                                        </Flex>
                                        <Flex md={4} padding="0!important">
                                            <span>Another chance to watch yesterday's racing action from Leopardstown.</span>
                                        </Flex>
                                        <Flex md={2} padding="0!important">
                                            <Link href="#">Get Ticket</Link>
                                        </Flex>
                                        <Flex md={2} padding="0!important">
                                            <Link href="#">Register Now</Link>
                                        </Flex>
                                        <Flex md={0.5} padding="0 0 0 20px!important">
                                            <span className='material-icons md-20'>notifications_active</span>
                                        </Flex>
                                    </Flex>
                                </EventRow>
                     </ModalCard>
                  </InfoCard>
               </Flex>
            </Flex>
         </ScheduleWrapper>
      </>
   );
};
