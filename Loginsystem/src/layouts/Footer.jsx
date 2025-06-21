import React from "react";
import styled from "styled-components";
import { Container } from "../components/style/Container_styled";
import { FooterStyled } from "../components/style/footer_styled";
import { Flex } from "../components/style/Flex_styled";
import { Img } from "../components/style/Img_Styled";
import { Typography } from "../components/style/Typography_styled";
import { getBNFont, getCurrentYear } from "../utils/helper";


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



const FooterMenu = styled.div`
  width: 100%;
  display: flex;
  height:300px,
  justify-content: center; 
  color: ${({ theme }) => theme.colors.bodyContent}; 
  
  &> a {
    color: ${({ theme }) => theme.colors.font};
    font-size: ${({ theme }) => theme.fontSize.bodyTitleFontSize};
    margin-right: 2px;
    margin-left: 2px;
    padding: 0 5px; 
    &:hover {
      background:${({ theme }) => theme.colors.primaryHover} ; 
    }
  }

`;
const ALink = styled.a`
text-decoration: none;
`;
const Footer = () => {
    return (
        <>
            <Container border={"none"}>
                <FooterStyled color="font">
                    <FooterMenu>
                        <Flex row>

                            <Flex md={12} padding="0!important">

                                <Typography fontFamily="var(--dashboard-font)" fontSize="bodyTitleFontSize" color="font" width={"100%"} margin="5px 0">
                                      All Rights Reserved.

                                </Typography>

                            </Flex>
                            {/* <Flex md={2}>
                <DownloadButton onClick={(() => {
                  window.open("http://ais.bmd.gov.bd:48080/c12_files/downloads/api_manual/API-Manual.pdf", "_blank")
                })}>
                  {t("api_manual")}
                  <span className="material-icons">download</span>
                </DownloadButton>
              </Flex> */}
                        </Flex>
                    </FooterMenu>
                </FooterStyled>
            </Container>
        </>
    );
};

export default Footer;
