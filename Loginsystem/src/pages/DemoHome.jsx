import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "../components/style/Container_styled";
import { Typography } from "../components/style/Typography_styled";
import { Flex } from "../components/style/Flex_styled";
import { InfoCard } from "../components/style/Card_styled";
import strlImage from '../assets/image/GORJON.jpg';
import football from '../assets/image/foot8.jpg';
import mukti from '../assets/image/mukti.jpg';
import cricket from '../assets/image/bn_ind .jpg'; 
import islam from '../assets/image/islamic.jpg';
import horseM from '../assets/image/horseM.png'; 
import bikerace from '../assets/image/bikerace.jpg';
import bike from '../assets/image/bike1.jpg';
import cycle from '../assets/image/cycle3.jpeg';
import horse from '../assets/image/horse.jpg'; 
import t20 from '../assets/image/t20.jpg'; 
import footBall from '../assets/image/foot.jpg'; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AliceCarousel from 'react-alice-carousel';


const Image = styled.img`
   width: 100%;
   height: 500px;
   object-fit: cover;
`;
const Channel = styled.img`
   width: 100%;
   height: 180px;
`;

const StyledSlider = styled(Slider)`
   position: relative;
   .slick-slide img {
      margin: auto;
   }
   .slick-prev, .slick-next {
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .slick-prev {
      left: -45px;
   }
   .slick-next {
      right: -45px;
   }
`;

// Custom Previous Button


// Function to return all slider images in one div
const slideImages = () => {
    const images = [
        { src: strlImage, alt: 'GORJON' },
        { src: football, alt: 'Football' },
        { src: mukti, alt: 'Mukti' },
        { src: cricket, alt: 'Cricket' },
        { src: islam, alt: 'Islamic' }
    ];

    return images.map((image, index) => (
        <div key={index}>
            <Link to="/login">
                <Image src={image.src} alt={image.alt} />
            </Link>
        </div>
    ));
};

export const DemoHome = () => {
    const itemsLength = Array.from({ length: 5 });

    const itemSrc = [
        "/src/assets/image/foot.jpg",
        "/src/assets/image/t20.jpg",
        "/src/assets/image/horse.jpg",
        "/src/assets/image/bike1.jpg",
        "/src/assets/image/cycle3.jpeg"
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

    };



    return (
        <div>
            <Container>
                <InfoCard margin="1px 0">
                    <Flex row>
                        <Flex md={12} padding="0">
                            <div>
                                <StyledSlider {...settings}>
                                    {slideImages()}
                                </StyledSlider>
                            </div>
                        </Flex>
                    </Flex>
                </InfoCard>



                <InfoCard margin="5px 0">
                    <Typography fontSize="bodyTitleFontSize" fontWeight="bold" margin="0 0 10px 0">
                        Best and Latest(Live)
                    </Typography>
                    <Flex row >
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={islam} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={horseM} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={bikerace} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={t20} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={footBall} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 0 5px 0 !important">

                            <Link to="/login">
                                <Channel src={islam} alt="Channel" />
                            </Link>


                        </Flex>
                    </Flex>
                </InfoCard>
                <InfoCard margin="5px 0">
                    <Typography fontSize="bodyTitleFontSize" fontWeight="bold" margin="0 0 10px 0">
                        Upcomming
                    </Typography>
                    <Flex row >
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={cricket} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={football} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={mukti} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={cycle} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 5px 5px 0 !important">

                            <Link to="/login">
                                <Channel src={horse} alt="Channel" />
                            </Link>


                        </Flex>
                        <Flex md={2} padding="0 0 5px 0 !important">

                            <Link to="/login">
                                <Channel src={bike} alt="Channel" />
                            </Link>


                        </Flex>
                    </Flex>
                </InfoCard>
             

            </Container>
        </div>
    );
};
