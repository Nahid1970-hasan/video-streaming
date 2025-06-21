
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice"
import { Suspense, useState } from "react"
import { useEffect } from "react"
import { ContainerBody } from "../components/style/Container_styled"
import { Typography } from "../components/style/Typography_styled"
import AliceCarousel from "react-alice-carousel"
import { InfoCard } from "../components/style/Card_styled"
import styled from "styled-components"
import { loadSubsEvents } from "../features/subsEvent/subs_event_slice"
import { Loading } from "../components/Loading"
import { getChannelCode, getSSCode } from "../utils/helper"


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


export const SubsEventsPage = () => {
    const subsEventData = useSelector((state) => state.subsevents);  
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
 
    useEffect(() => {
    //     console.log("22a1607a-14b7-4e67-9945-492c5fd6a85f");
    //     var stKey = "073142277";
    //     var code = "22a1607ceea-14v0b7-4e67-994k4k04sq5-492c5fd6a85f";
    //     var tmpCode = ""
    //     console.log("START---"+code)
    //     for (var i=stKey.length;i>2;i-=3){ 
    //         const fnum = parseInt(stKey.substring(i-1, i));
    //         const fpos = parseInt(stKey.substring(1-3, i-1));
    //         tmpCode = getSSCode(fpos, fnum, code); 
    //         console.log(i+"----"+tmpCode);
    //    }
    //    console.log("FINAL---"+tmpCode)
        
         //getChannelCode("22a1607ceea-14v0b7-4e67-994k4k04sq5-492c5fd6a85f","073142277");
        dispatch(loadSubsEvents());
        dispatch(
            loadPage({
                title: ("Channels"),
                button: false,

            })
        );
    }, []);

    const itemMini= subsEventData?.list?.map((item, index) => {
        const style = { width: "300px", height: "200px", border: "2px solid", margin: "0 5px", background: "#3e3e3e" };
        return (<div style={style}>
            <InfoCard position="center" key={index}>
                <Flex row>
                    <Flex padding={"10px 0!important"} md={12}>
                        <GallerImg>
                            <img src={""} alt="Preview Photo" />
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
                            {item?.event_name||""}
                        </Typography>
                        <Typography
                            color={'font'}
                            textAlign="left"
                            fontSize={"smFont"}
                            fontFamily={"--dashboard-font"}
                            notResize >
                             {item?.event_desc||""}
                        </Typography>
                        <Typography
                            color={'font'}
                            textAlign="left"
                            fontSize={"smFont"}
                            fontFamily={"--dashboard-font"}
                            notResize >
                            {item?.subscription_expiry||""}
                        </Typography>
                    </Flex>
                </Flex>
            </InfoCard>
        </div>);
    });
 
    function handleOnClick() { 
        navigate("/pub-reg");
    }

    useEffect(() => {
        subsEventData.loading == "pending" ? setIsLoading(true): setTimeout(() =>  setIsLoading(false), 2000);
    }, [subsEventData.loading]);

    return subsEventData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) :(<>
        <Suspense>
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
                </Flex>
            </ContainerBody> 
        </Suspense>
        <Loading open={isLoading} />
    </>)
}