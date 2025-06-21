import React, { Suspense } from 'react';
import { Typography } from "../components/style/Typography_styled";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Flex } from '../components/style/Flex_styled';
import { Container, ContainerBody } from '../components/style/Container_styled';
import styled from 'styled-components';
import { InfoCard } from '../components/style/Card_styled';
import { useNavigate } from 'react-router-dom';

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
        height: 120px;
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
        color: #fff;
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


export const PromtHomePage = () => {
    const itemsLength = Array.from({ length: 5 });
    const navigate = useNavigate();
    const itemSrc = [
        "/src/assets/image/ind.png",
        "/src/assets/image/jamuna.png",
        "/src/assets/image/logo.jpg",
        "/src/assets/image/somoy.jpg",
        "/src/assets/image/sky-tv.jpg"
    ]
    const itemDescrp = [
        "Independent TV",
        "Jamuna TV",
        "Live Streaming",
        "Somoy TV",
        "Sky Sports"
    ]
    const items = itemsLength.map((item, index) => {
        const style = { width: "800px", display: "flex", height: "450px", border: "2px solid", marginRight: "5px", background: "#3e3e3e" };
        return (<div style={style}>
            <img width={"100%"} src={itemSrc[index]}></img>
        </div>);
    });

    const itemMini = itemsLength.map((item, index) => {
        const style = { width: "300px", height: "200px", border: "2px solid", margin: "0 5px", background: "#3e3e3e" };
        return (<div style={style}>
            <InfoCard position="center" key={index}>
                <Flex row>
                    <Flex padding={"10px 0!important"} md={12}>
                        <GallerImg>
                            <img src={itemSrc[index]} alt="Preview Photo" />
                            <button onClick={handleOnClick}>Play</button>
                        </GallerImg>
                       
                    </Flex>
                    <Flex padding={"0 !important"} md={12}>
                        <Typography
                            color={'font'}
                            textAlign="left"
                            fontSize={"smFont"}
                            fontFamily={"--dashboard-font"}
                            notResize >
                            {itemDescrp[index]}
                        </Typography>
                    </Flex>
                </Flex>
            </InfoCard>
        </div>);
    });

    function handleOnClick() { 
        navigate("/pub-reg");
    }

    return (
        <Suspense>
            <Flex row>
                <Flex md={12}>
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
            </Flex>
            <ContainerBody>
                <Flex row>
                    <Flex md={12}>
                        <Typography fontSize="bodyTitleFontSize" color="primaryFont" textAlign="left">
                            Events
                        </Typography>
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
                    </Flex>
                    <Flex md={12}>
                        <Typography fontSize="bodyTitleFontSize" color="primaryFont" textAlign="left">
                            Events
                        </Typography>
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
                    </Flex>
                </Flex>
            </ContainerBody>

        </Suspense>
    );
};
