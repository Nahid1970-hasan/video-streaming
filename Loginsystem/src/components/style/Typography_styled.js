import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
export const Typography = styled.span`
  display:block;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  width: ${({ width }) => (width ? width : "auto")};
  font-size: ${({ fontSize, notResize, theme  }) =>!!notResize? theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'] :getBNFont(theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'])};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  text-align:${({  textAlign }) => ( textAlign ? textAlign : "center")};
  margin: ${({  margin }) => ( margin ? margin : "0")};
  &>p{
    display:inline-block;
    font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : "var(--dashboard-font)")};
    font-size: ${({notResize , fontSize, theme }) =>!!notResize? theme.fontSize[fontSize ? fontSize:'bodyContentFontSize'] :theme.fontSize.bodyContentFontSize};
  }
`;
