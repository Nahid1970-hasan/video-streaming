import styled from "styled-components";
import { getBNFont } from "../../utils/helper";

export const MenuItem = styled.li`
  padding: 5px 5px !important;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  background: ${({ theme, active }) => theme.colors[active?'primaryActive':'primary']};
  font-size: ${({ fontSize  , theme}) => getBNFont(theme.fontSize[fontSize ? fontSize:'font'])};
  ${({highlight})=> highlight&& "border-top: 1px solid #ddd;"}
  &:hover {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.primaryHover};
  } 
`;
