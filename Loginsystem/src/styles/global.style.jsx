import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  :root{
    --body-font: Cambria; // poppinsRegular;
    --navbar-font:  Cambria; //poppinsRegular // PoppinsSemiBold;
    --footer-title: Cambria;  //poppinsRegular;
    --footer-text: Cambria ; //poppinsRegular;
    --title-primary: Cambria ; //poppinsRegular;
    --title-secondary: Cambria; // poppinsRegular;
    --bangla-font: Nikosh;

    --dashboard-font: Cambria; //poppinsRegular;
    --dashboard-title: Cambria; //poppinsRegular ;// UniNeueBold;
    --bg: #fff;
    --font: #000;
    --primary: #30b256; //#006332
    --secondary: #217b3c; // #26b355
    --button-primary: #1e9c82;
    --button-secondary: #065a48;
    --button-font: #fff;
    --font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    background: "../assets/img/bmdaislogo.jpg";
    color: #161D25;
    font-family: var(--body-font), sans-serif;
    font-size: var(--font-size);
    margin: 0; 
    padding: 0;
    height: 100%;
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height:100%;
  }

  label{
    display: inline-block;
    /* margin-top: 0.75rem; */
  }

  input:not([type="checkbox"]) + label {
    margin-top: 0.75rem;
  }

  input:disabled {
    cursor: default;
    background-color:#dfdfdf;  
    border-radius: 0.3rem;
}
 
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px #fff;
	background-color: transparent;
}

::-webkit-scrollbar
{
	width: 4px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb
{
	background-color: #000000;
}
.react-datepicker-wrapper input {
    display: block;
    padding: 0.375rem 0.75rem;
    margin-top: 0.15rem;
    margin-left: 0px;
    border: 1px solid gainsboro;
    border-radius: 0.3rem;
    font-size: var(--font-size);
    font-weight: 400;
    line-height: 1.5;
    color: var(--font);
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    cursor: pointer;
    background-color: var(---bg);
    background-clip: padding-box;
    appearance: menulist-button;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    font-family: var(--dashboard-font);
}
 
.react-datepicker__month .react-datepicker__month-text, .react-datepicker__month .react-datepicker__quarter-text {
  display: inline-block;
  width: auto;
  margin: 5px 10px;
  height: auto;
  font-size: var(--font-size);
  font-family: var(--dashboard-font);
  padding: 5px 10px;
}

.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    margin-top: 0px;
    color: var(--button-font);
    font-weight: bold;
    font-size: var(--font-size);
    font-family: var(--dashboard-font);
    background: var(--primary);
}
.__json-pretty__{
  text-wrap: wrap;
  word-break: break-all;
  font-family: var(--dashboard-font);
  font-size: 14px;
}
.each-slide-effect > div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 350px;
}

.each-slide-effect span {
  padding: 20px;
  font-size: 20px;
  background: #efefef;
  text-align: center;
}


.spinner {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.spinner span {
  font-size: 2rem;
  color: var(--bg);
  animation: fade 2s linear 0s infinite;
  padding-right: 1rem;
}

.half-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--bg);
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear 0s infinite;
}


.eventpopupactionapp{
  height: 100vh;
  & .gm-ui-hover-effect {
    opacity: .6;
    display: none !important;
  }
  & .gm-style .gm-style-iw {
    font-weight: 300;
    font-size: 10px;
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-c {
    padding: 0px !important;
    background-color: transparent;
  }
  & .gm-style .gm-style-iw-d {
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-tc {
    display: none !important;
  }
}

.eventpopupaction{
  height: 80vh;
  & .gm-ui-hover-effect {
    opacity: .6;
    display: none !important;
  }
  & .gm-style .gm-style-iw {
    font-weight: 300;
    font-size: 10px;
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-c {
    padding: 0px !important;
    background-color: transparent;
  }
  & .gm-style .gm-style-iw-d {
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-tc {
    display: none !important;
  }
}
.popupaction {
  height: 100%;
  & .gm-ui-hover-effect {
    opacity: .6;
    display: none !important;
  }
  & .gm-style .gm-style-iw {
    font-weight: 300;
    font-size: 12px;
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-c {
    padding: 8px 5px !important;
    background-color: #fff;
  }
  & .gm-style .gm-style-iw-d {
    overflow: hidden !important;
  }
  
}

.pub-home {
  & .alice-carousel__stage-item {
      margin: 0 5px;
  }
}

.home-infowindow {
  height: 100%;
  & .gm-ui-hover-effect {  
    background-color: #fff !important;
    top: -5px !important;
    right: -5px !important;
    width: 30px !important;
    height: 30px !important;
  }
  & .gm-ui-hover-effect>span {
    background-color: maroon !important;
    margin: 4px !important;
    width: 20px !important;
    height: 20px !important;
  }
  & .gm-style .gm-style-iw {
    font-weight: 300;
    font-size: 12px;
    overflow: hidden !important;
  }
  & .gm-style .gm-style-iw-c {
    padding: 8px 5px !important;
    background-color: #fff;
  }
  & .gm-style .gm-style-iw-d {
    overflow: hidden !important;
  }
  & .gm-style-iw-ch {
    padding-top: 0;
  }
}

.completed {
  font-size: 2rem;
  color: #03fc4e;

  animation: bigger 1s linear;
}

@keyframes bigger {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(2);
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;


