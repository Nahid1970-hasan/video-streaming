import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterStyled = styled.div`  
    bottom: 0px; 
    user-select: none;
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)}; 
    width: 1600px;
    max-width: 100%;
    padding: 0 10px;
    margin: 0 auto;
    display: block;
    height:85px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.bulletinBack}; 
    @media(max-width:${theme.layout.xs}){
        height:250px;
      }

    
`