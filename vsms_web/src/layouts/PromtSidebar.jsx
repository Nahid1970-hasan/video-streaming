 
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react"; 
import { StyledRightSidebar } from "../components/style/right_sidebar_styled";
import { SidebarCustMenu } from "../components/SideBarCustMenu";

export const PromtSideBar = forwardRef((_, ref) => {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const [indexUrl, setIndexUrl] = useState("/");

  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);
    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;
    element.style.height = scrollHeight * 100 + "%";
    element.style.transform = "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }
  const MODULES = [
    { "module_id": 200, "page_name": "/about", "module_name_en": "At a Glance" },
    { "module_id": 300, "page_name": "/services", "module_name_en": "Product and Service" },
    { "module_id": 400, "page_name": "/technology",  "module_name_en": "Competency" },
    { "module_id": 500, "page_name": "/clients",  "module_name_en": "Proud to Serve" },
    { "module_id": 400, "page_name": "/contact", "module_name_en": "Get in Touch" },
    { "module_id": 400, "page_name": "/careers", "module_name_en": "Career", }
  ];
  useEffect(() => {
    let element = itemRef.current;

    function collapsedSidebar() { 
      itemRef.current.parentElement.parentElement.style.marginRight = "-271px";
      itemRef.current.parentElement.parentElement.nextElementSibling.classList.remove("obscure");
    }
    element.addEventListener("click", collapsedSidebar);

    return () => {
      element.removeEventListener("click", collapsedSidebar);
    }

  }, [itemRef]);

  return (
    <>
      <StyledRightSidebar ref={ref}>
        <div onScroll={handleScroll}>
           
          <ul  ref={itemRef}>
            {MODULES?.map((item, i) => (
              <SidebarCustMenu key={i} item={item} />
            ))}
          </ul>
        </div>
        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledRightSidebar>
      <div className=""></div>
    </>
  );
});
