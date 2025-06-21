import { StyledHeaderTop } from "./style/headertop_styled";
import ImgBack from "../assets/img/banner5.jpg";
import Bmd from "../assets/img/bmdlogo.png";
import logom from "../assets/img/bmdaislogomobile.jpg";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getBNFont, langs, useOutsideClicker } from "../utils/helper";
import { useRef } from "react";
import { StyledNavbar } from "../components/style/navbar_styled";
import { Typography } from "../components/style/Typography_styled";
import styled from "styled-components";
import { Flex } from "./style/Flex_styled";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";
import { IconButton } from "./IconButton";
import { useTranslation } from "react-i18next";
import AppStoreImg from "../assets/app_store.png"
import PlayStoreImg from "../assets/play_store.png"
import { DateTime } from "luxon";
import { Img } from "./style/Img_Styled";
import { CardHeaderButton } from "./style/Card_styled";
import { Picture } from "./style/TextArea";
const CustFlex = styled(Flex)` 
    display: flex;
    align-items: flex-start; 
    justify-content:  ${({ contentAlign }) => (contentAlign ? contentAlign : 'space-evenly')}; ;
    width: 100%;
    margin: ${({ margin }) => (margin ? margin : '0')}; 
    padding:  ${({ padding }) => (padding ? padding : '0')};
    
    a {
        font-size:  ${({ fontSize, theme }) => getBNFont(theme.fontSize[fontSize ? fontSize : 'font'])};
        font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
    }
`;
const CustDiv = styled.div`  
    display: flex;
    width:100%;
  
    padding: 5px 10px; 
    margin: ${({ margin }) => (margin ? margin : "0")};
    & > ul {
        position: relative;
        display: flex;
        & li {
          position: relative;
          list-style: none;
          text-align: left;
          margin: auto 0;
          a {
            text-decoration: none;
            padding: 8px;
          }
        }
        & svg {
          stroke: none;
          fill: ${({ theme }) => theme.colors.primary};
        }
      } 
`;

const CustTy = styled.div`  
@media(max-width:${theme.layout.xs}){
    & >span{
        font-size: 15px;
        margin-right:8px;
    } 
  }
`;

const Div = styled.div`  
    display: flex;
    width:100%;  
    // background-image: url("../src/assets/img/banner.jpg");
    background-size: contain;
    background: ${(props) => `url(${props.imgUrl})`};
    background-repeat: round;
    height:100px;
`;

export const HeaderTop = ({ search }) => {
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const currentDate = useSelector((state) => state.todayData.currentdate);
    const wraperRef = useRef(null);
    const { t, i18n } = useTranslation();
    useOutsideClicker(wraperRef, () => { setOpen(false) });

    useEffect(() => {
        if (user.login) {
            navigate("/app");
        }
    }, [user]);

    return <>
        <StyledNavbar position={"block"} width={"auto"}>
            <Div imgUrl={ImgBack}>
                <Flex row>
                    <Flex md={6} padding="0!important">
                        {/* <Flex row>
                            <Link to="/">
                                <img src={Bmd} srcSet={` `} />
                            </Link>
                        </Flex> */}
                    </Flex>
                    <Flex md={6} padding="0">
                        <Flex row>
                            {/* <CustFlex padding="0 10px" contentAlign={"flex-start"} md={6} > 
                                <a href="https://apps.apple.com/app/id6466733624" target="_blank" ><Img noborder width={'95px'} src={AppStoreImg} /></a>
                                <a href="https://play.google.com/store/apps/details?id=com.bmd.bmdais" target="_blank"> <Img noborder width={'95px'} src={PlayStoreImg} /></a>
                               
                            </CustFlex> */}
                            <CustFlex margin="10px 0" contentAlign={"flex-end"} md={12} >
                                <Typography
                                    color={'font'}
                                    margin="0 10px"
                                    textAlign="end"
                                    fontWeight="bold"
                                    fontSize={"font"} >
                                    {DateTime.fromJSDate(new Date(currentDate?.currentdate_en || DateTime.now().toFormat("yyyy-MM-dd"))).setLocale(localStorage.i18nextLng).toLocaleString(DateTime.DATE_HUGE)}
                                    {/* {localStorage.i18nextLng=="bn"?currentDate?.currentdate_bn??"":currentDate?.currentdate_en??""} */}
                                </Typography>
                                <IconButton padding={'0'} alignment={'end'} display={'block'} nothover color='font' onClick={(e) => {
                                    i18n.changeLanguage(localStorage.i18nextLng == "bn" ? "en" : "bn");
                                }}>
                                    <div style={{ fontSize: theme.fontSize[localStorage.i18nextLng == 'en' ? 'fontBn' : 'font'] }}>{langs[localStorage.i18nextLng == "bn" ? "en" : "bn"].nativeName}</div>
                                </IconButton>

                            </CustFlex>
                        </Flex>
                        <Flex row>
                            <Flex md={12} padding={"0"}>
                                <CustTy>
                                    <Typography
                                        color={'title_color'}
                                        margin="0"
                                        textAlign="right"
                                        fontSize={"titleLargeFontSize"}
                                    >
                        
                                        {t("ais_title")}
                                    </Typography>
                                </CustTy>

                            </Flex>
                        </Flex>
                    </Flex>

                </Flex>
            </Div>

        </StyledNavbar>

    </>
}
