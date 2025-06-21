import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import { BodyContent } from "../components/style/BodyContent_styled"
import { DashboardHeader } from "./DashboardHeader"
import { SideBar } from "./Sidebar"
import { theme } from "../styles/theme"

export const Layout = () => {
    const sideBarRef = useRef(null);
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        let element = sliderRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;

        let toggle = window.innerWidth < +theme.layout.sm.replace("px", '');

        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginLeft = "-271px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginLeft = toggle ? "0px" : "-271px";
            bodyRef.current.style.paddingLeft = toggle && window.innerWidth > +theme.layout.sm.replace("px", '')
                ? "270px" : "10px";

            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        }

        element.addEventListener("click", clickSlider);
        obsDom.addEventListener("click", collapsedSidebar);


        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        }

    }, [sliderRef]);

    return (
        <>
            <SideBar ref={sideBarRef} />
            <BodyContent ref={bodyRef}>
                <DashboardHeader ref={sliderRef} />
                <main>
                    <Outlet />
                </main>
            </BodyContent>
        </>)
}