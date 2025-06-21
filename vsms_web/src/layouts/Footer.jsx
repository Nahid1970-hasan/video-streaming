import React from "react";
import styled from "styled-components";
import { Container } from "../components/style/Container_styled";
import { FooterStyled } from "../components/style/footer_styled";
import { Flex } from "../components/style/Flex_styled"; 
import { HL, Typography } from "../components/style/Typography_styled"; 
import { DateTime } from "luxon";
 
const FooterMenu = styled.div`
  width: 100%;
  display: flex;
  height: auto;
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
 
const Footer = () => {
  return (
    <>
      <Container border={"none"}>
        <FooterStyled color="font">
          <FooterMenu>
            <Flex row>
              <Flex md={12} padding="0!important">
                <Typography margin={"10px 0"} fontWeight={"bold"} fontSize="font">  © {DateTime.now().toFormat("yyyy")} King <HL>Digital</HL> Recharge Ltd. | All Rights Reserved</Typography>
              </Flex>
            </Flex>
          </FooterMenu>
        </FooterStyled>
      </Container>
    </>
  );
};

export default Footer;
