import React from 'react';
import { Container } from "../components/style/Container_styled";
import { InfoCard } from "../components/style/Card_styled";
import styled from 'styled-components';
import { Flex } from '../components/style/Flex_styled';
import { Typography } from '../components/style/Typography_styled';
import SomoyImg from '../assets/image/somoy.jpg';
import { Input } from '../components/style/Input_styled';
import { Button } from '../components/Button';
import Rating from '../components/Ratting';


const Content = styled.div`
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover; // Adjust image fitting
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;


const TourCard = ({ title, rating, time, location }) => (
    <Flex md={4} padding="20px 5px 0 0">
        <InfoCard>
            <ImageContainer>
                <Image src={SomoyImg} alt={title} />

            </ImageContainer>
            <Typography fontSize="bodySubTitleFontSize" fontWeight="bold" textAlign="start">
                {title}
            </Typography>
            <Typography fontSize="bodyTextFontSize" textAlign="start">
                {time}
            </Typography>
            <Typography fontSize="bodyTextFontSize" textAlign="start">
                {location}
            </Typography>
            <Rating rating={rating} />
        </InfoCard>
    </Flex>
);

export const Promoter = () => {
    return (
        <Container>
            <Content>
                <Flex row>
                    <Flex md={8}>
                        <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                            Cape of Good Hope & Boulder Penguins Full-Day Tour from Cape Town
                        </Typography>
                        <InfoCard>
                            <Image src={SomoyImg} alt="Cape of Good Hope and Boulder Penguins" />

                        </InfoCard>
                    </Flex>
                    <Flex md={4}>
                        <Typography fontSize="bodySubTitleFontSize" fontWeight="bold">
                            SignIn Here
                        </Typography>
                        <InfoCard>
                            <Input placeholder="Enter your email" />
                            <Button padding="5px" type="submit">Signin</Button>
                            <Button>Login</Button>
                        </InfoCard>
                    </Flex>
                </Flex>
                <Flex md={12} padding="20px 20px 10px 20px !important">
                    <InfoCard margin="5px 20px 0 0">
                        <Flex row>
                            <TourCard title="Good Hope" time="10:00 AM" location="Cape Town" rating={5} />
                            <TourCard title="Cape Town" time="1:00 PM" location="Boulders Beach" rating={4} />
                            <TourCard title="Good Hope" time="11:00 AM" location="Cape Town" rating={3} />
                        </Flex>
                    </InfoCard>
                </Flex>
            </Content>
        </Container>
    );
};
