import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledCustomNavbar = styled.nav`
  position: sticky; 
  background: ${({ theme, position }) => position == "fixed" ? theme.colors.darkNav : theme.colors.darkNav};
  box-shadow: ${({ position }) => position == "fixed" ? "rgb(25 89 66 / 30%) 0px 2px 10px 0px, rgb(25 89 66 / 30%) 0px 2px 10px 0px" : "inherit"};
  transition:  ${({ position }) => position == "fixed" ? "top 0.3s linear" : "all 0.3s ease-in-out"};
  z-index:  ${({ position }) => position == "fixed" ? "1001" : "99"};;
  top: -1px;
  left: 0px; 
  width:${({ width }) => width ?? "100%"}; 
  align-items: center;
  display: flex;
  font-family: var(--navbar-font); 
   
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between; 
    width:100%;
    padding: 10px;
    &:last-child>ul>li:last-child{
      padding: 10px 0;
    }
    &:first-child>ul>span{
        display:none; 
      cursor:pointer; 
    }

    ul {
      display: flex;
      list-style: none;
      text-transform: capitalize !important;
      align-items:center;
      justify-content: flex-end; 

      a{
          text-decoration: none; 
          cursor:pointer; 
          width: 100%;
          img {
            height: 50px;  
            padding-right:10px;
            pointer-events: none;
            display: flex;
          }  
      }
 
      li { 
        padding: 10px;
        a {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.barFont};
          font-size : ${({ theme }) => localStorage.i18nextLng == 'en' ? theme.fontSize.font : theme.fontSize.fontBn};
          cursor:pointer; 
        }
      }
      &li:hover {
        background: ${({ theme }) => theme.colors.primaryHover};
        border-radius: 5px;  
      }
      &li:has(.active){ 
        border-bottom-color:  ${({ theme }) => theme.colors.secendaryColor};  
        border-bottom-width: 3px;
        border-bottom-style: solid;
      } 
      & li.highlight{
          background-color: ${({ theme }) => theme.colors.primaryActive};
          &>a{
            color: ${({ theme }) => theme.colors.bg};
          }
      }
    } 
    @media(max-width: ${theme.layout.xs}){
      padding: 0; 
      &> div>div {   
        span {
          display: block; 
        }  
        &>div:first-child{
          a { 
            width: 100%;
            display: flex;
            justify-content: center; 
          }
        }
        &>div:last-child{
          display: none; 
        }
      } 
    }
    @media(max-width:${theme.layout.sm}) and (min-width:${theme.layout.xs}){
      &>div>div {  
        &>div:first-child{
           ul:last-child {
            span {
              display: none;  
            }
           }
        } 
        &>div:last-child{
          display: block; 
        }
      } 
    }
    @media(min-width: ${theme.layout.sm}){
      &>div>div {  
        &>div:first-child{
           ul:last-child {
            span {
              display: none;  
            }
           }
        } 
        &>div:last-child{
          display: block; 
        }
      } 
    }
`;
