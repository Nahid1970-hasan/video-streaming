import React, { Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import styled from 'styled-components';
import { Container, ContainerBody } from "../components/style/Container_styled";
import { Typography } from "../components/style/Typography_styled";
import { Flex } from "../components/style/Flex_styled";
import { CardHeaderButton, InfoCard, ModalCard } from "../components/style/Card_styled";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { PrimaryButton } from '../components/Button';

const Div = styled.div`  
     background:#4F036A;
    @media (max-width: ${({ theme }) => theme.layout.sm}) {
      height: 250px;
    }
`;

const GallerImg = styled.div`  
    height: ${({ height }) => !!height ? height : "auto"}; 
    align-items: flex-start; 
    display: inline-flex;
    width: 100%;
    &:hover>img {
        opacity: 0.3;
    }
    &:hover>button {
        opacity: 1;
    }
    &>img{ 
        height: 180px;
        width: 100%;
        opacity: 1;
        display: block;  
        transition: .5s ease;
        backface-visibility: hidden;
    }
    &>button{ 
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 40%;
        left: 50%; 
        background: red;
        color: #4F036A;
        font-size: 20px;
        padding: 8px 10px;
        cursor: pointer;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center; 
    }
    @media (max-width: ${({ theme }) => theme.layout.sm}) {
      height: 250px;
    }
`;

const Galler = styled.div`  
    height: ${({ height }) => !!height ? height : "auto"}; 
    align-items: flex-start; 
    display: inline-flex;
    width: 100%;
    &:hover>img {
        opacity: 1;
    }
    &:hover>button {
        opacity: 1;
    }
    &>img{ 
        height: 180px;
        width: 100%;
        opacity: 0.6;
        display: block;  
        transition: .5s ease;
        backface-visibility: hidden;
    }
    &>button{ 
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 40%;
        left: 50%; 
        background: red;
        color: #4F036A;
        font-size: 20px;
        padding: 8px 10px;
        cursor: pointer;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center; 
    }
    @media (max-width: ${({ theme }) => theme.layout.sm}) {
      height: 250px;
    }
`;

export const Home = () => {
    const itemsLength = Array.from({ length: 5 });
    const navigate = useNavigate();

    const itemSrc = [
        "/src/assets/image/GORJON.jpg",
        "/src/assets/image/foot8.jpg",
        "/src/assets/image/mukti.jpg",
        "/src/assets/image/bn_ind .jpg",
        "/src/assets/image/islamic.jpg"
    ];

    const itemDescrp = [
        "Independent TV",
        "Jamuna TV",
        "Live Streaming",
        "Somoy TV",
        "Sky Sports"
    ];

    const itemSlider = [
        "/src/assets/image/horseM.png",
        "/src/assets/image/bikerace.jpg",
        "/src/assets/image/bike1.jpg",
        "/src/assets/image/cycle3.jpeg",
        "/src/assets/image/horse.jpg"
    ];

    const itemupcomming = [
        "/src/assets/image/t20.jpg",
        "/src/assets/image/bikerace.jpg",
        "/src/assets/image/foot.jpg",
        "/src/assets/image/cycle3.jpeg",
        "/src/assets/image/horse.jpg"
    ];

    const items = itemsLength.map((item, index) => {
        const style = { width: "100%", display: "flex", height: "500px", border: "2px solid", margin: "2px", background: "#3e3e3e" };
        return (
            <div style={style}>
                <img width={"100%"} src={itemSrc[index]} alt={`Item ${index}`} />
            </div>
        );
    });

    const itemMini = itemsLength.map((item, index) => {
        const style = { width: "300px", height: "225px", border: "2px solid", margin: "0 5px", background: "#3e3e3e" };
        return (
            <div style={style}>
                <InfoCard position="center" key={index}>
                    <Flex row>
                        <Flex padding={"10px 0!important"} md={12}>
                            <Galler>
                                <img src={itemSlider[index]} alt="Preview Photo" />
                                <button onClick={handleOnClick}>Play</button>
                            </Galler>
                        </Flex>
                        <Flex padding={"0 !important"} md={12}>
                            <Typography
                                color={'font'}
                                textAlign="left"
                                fontSize={"smFont"}
                                fontFamily={"--dashboard-font"}
                                notResize
                            />
                        </Flex>
                    </Flex>
                </InfoCard>
            </div>
        );
    });

    const itemCHMini = itemsLength.map((item, index) => {
        const style = { width: "300px", height: "220px", border: "2px solid", margin: "0 5px", background: "#3e3e3e" };
        return (
            <div style={style}>
                <InfoCard position="center" key={index}>
                    <Flex row>
                        <Flex padding={"0!important"} md={12}>
                            <GallerImg>
                                <img src={itemupcomming[index]} alt="Preview Photo" />
                                <button onClick={handleOnClick}>Subscribe</button>
                            </GallerImg>
                        </Flex>
                    </Flex>
                </InfoCard>
            </div>
        );
    });

    function handleOnClick() {
        navigate("/login");
    }

    return (
        <Div>
            <Container>
                <Flex row>
                    <Flex md={10} padding="10px 0 0 0 !important">
                        <AliceCarousel
                            autoPlay
                            autoWidth
                            infinite
                            autoPlayInterval={2000}
                            animationDuration={1000}
                            disableButtonsControls
                            items={items}
                        />
                    </Flex>
                    <Flex md={2} padding="50px 0 0 0 !important">
                        <div style={{ height: "350px" }}>
                            <Typography color='bg' fontSize="bodyTitleFontSize">
                                Cheapest live TV streaming services
                            </Typography>
                            <Typography color='bg' textAlign="start" margin="5px 10px 5px 20px">
                                If you only care about finding movies and TV shows on-demand, then try Freevee, Peacock, Crackle, Tubi or Vudu. Content selection is the other major thing that distinguishes the free streaming services from each other.
                            </Typography>
                        </div>
                        <div style={{ marginTop: "auto" }}>
                            <Typography color='bg' fontSize="bodyTitleFontSize" margin="20px">
                                Enjoy 7 days free trial
                            </Typography>
                            <CardHeaderButton bottom>
                                <PrimaryButton onClick={() => navigate('/login')}>
                                    Sign Up Here
                                </PrimaryButton>
                            </CardHeaderButton>
                        </div>
                    </Flex>
                </Flex>
                <ContainerBody>
                    <ModalCard margin="0 5px">
                        <Flex row>
                            <Flex md={4}></Flex>
                            <Flex md={6}>
                                <Flex row>
                                    <PrimaryButton>
                                        Horse Racing
                                    </PrimaryButton>
                                    <PrimaryButton>
                                        Sports
                                    </PrimaryButton>
                                    <PrimaryButton>
                                        Music
                                    </PrimaryButton>
                                    <PrimaryButton>
                                        Shows
                                    </PrimaryButton>
                                    <PrimaryButton>
                                        Drama
                                    </PrimaryButton>
                                </Flex>
                            </Flex>
                            <Flex md={2}></Flex>
                        </Flex>
                        <Flex row>
                            <Flex md={12} padding="0!important">
                                <Typography fontSize="bodyTitleFontSize" fontWeight="bold">
                                    Live
                                </Typography>
                                <ModalCard margin="5px">
                                    <AliceCarousel
                                        autoPlay
                                        autoWidth
                                        infinite
                                        autoPlayInterval={2000}
                                        animationDuration={1000}
                                        disableButtonsControls
                                        disableDotsControls
                                        items={itemMini}
                                    />
                                </ModalCard>
                            </Flex>
                            <ModalCard margin="10px 0">
                                <Flex md={12} padding="10px !important">
                                    <Typography fontSize="bodyTitleFontSize" fontWeight="bold">
                                        Upcoming Events
                                    </Typography>
                                    <AliceCarousel
                                        autoPlay
                                        autoWidth
                                        infinite
                                        autoPlayInterval={2000}
                                        animationDuration={1000}
                                        disableButtonsControls
                                        disableDotsControls
                                        items={itemCHMini}
                                    />
                                </Flex>
                            </ModalCard>
                        </Flex>
                    </ModalCard>
                </ContainerBody>
            </Container>
        </Div>
    );
};
