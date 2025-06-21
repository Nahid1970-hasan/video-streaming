import styled from "styled-components";
import { getBNFont } from "../../utils/helper";

export const TextArea = styled.textarea`
  font-weight: 400;
  line-height: 1.5;
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize ? fontSize : 'font']};
  color:  ${({ theme }) => theme.colors.inputFont} ;
  background-color: ${({ theme }) => theme.colors.inputBackground} ;
  background-clip: padding-box;
  padding: 0.375rem 0.75rem !important;
  appearance: menulist-button;
  width: ${({ width }) => (width ? width : "auto")};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  margin-top: ${({ app }) => (app ? ".15rem" : "0.55rem")};
  border:  ${({ color, theme }) => (color ? "1px solid " + theme.colors[color] : "1px solid " + theme.colors.inputBorder)}; ;
  border-radius: 0.3rem;
  &:disabled {
    cursor: default;
    background-color: #dfdfdf;
    border-radius: 0.3rem; 
  }
`;
export const Picture = styled.div`
@media only screen and (max-width: 500px) {
  .img{
    display: block;
    width:100%;
    padding: 5px 10px; 
    object-fit: contain;
  }
}
`;
