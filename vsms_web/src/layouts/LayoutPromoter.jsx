import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useRef } from "react";
import { PromtSideBar } from "./PromtSidebar";
import { PromtNavbar } from "./PromtNavbar";
import { useSelector } from "react-redux";

export const LayoutPromoter = () => {
    const user = useSelector((state) => state.user); 
    const sideBarRef = useRef(null);
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.login) {
            navigate("/login");
        } else {
            if (localStorage.user_type == "ADM") {
                navigate("/app");
              }
        }
    }, [user]);
    
    useEffect(()=>{console.log = function (param) {return;} },[])

    useEffect(() => {
        let element = sliderRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;
        let toggle = true;
        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginRight = "-271px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginRight = sideBarRef.current.style.marginRight != "0px" ? "0px" : "-271px";
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
        <><div style={{ width: "100%", background: "#aab4ba" }}>
            <PromtSideBar ref={sideBarRef} />
            <div ref={bodyRef}>
                <PromtNavbar ref={sliderRef} />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
        </>)
}