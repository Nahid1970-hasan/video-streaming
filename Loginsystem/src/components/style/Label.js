import styled from "styled-components";
import {theme} from "../../styles/theme";
import { getBNFont } from "../../utils/helper";

export const  Label = styled.span`
  display: flex; 
  align-items: center;
 // line-height: 1;
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "left")}; 
  margin: ${({margin}) => ( margin ? margin : "4px 0 10px 0")};
  font-size : ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  color: ${({theme, color }) =>color?theme.colors[color]:theme.colors.error}; 
  & input {
    margin-top: 0;
  }

  // &::before {
  //   content: '◀';
  //   margin: 0 10px;
  // }
`;

export const HLLabel = styled.div`
  background: ${theme.colors.bodySubTitle};
  color: ${getBNFont(theme.colors.bodySubTitleFont)};
  font-size : ${theme.fontSize.bodySubTitleFontSize};
  padding: 5px;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  margin: ${({margin})=>margin?margin:"0"}
`;