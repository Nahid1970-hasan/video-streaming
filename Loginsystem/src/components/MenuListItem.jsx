import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadPage } from "../features/page/page_slice";
import { Typography } from "./style/Typography_styled";

export const MenuListItem = ({ title, link, icon }) => {
    // const [pageTitle, setTitle] = useState("");
    // const menuRef = useRef(null);
    // const dispatch = useDispatch();
    // const [flag, setFlag] = useState(false);
    // //const page = useSelector(state => state.page);

    // //console.log(page);

    // function menuClickHandeler() {
    //     // console.log(menuRef.current.innerText);
    //     setTitle(menuRef.current.innerText);
    //     setFlag(!flag);
    // }

    // useEffect(() => {
    //     pageTitle != "" &&
    //         dispatch(loadPage({ title: pageTitle }));
    // }, [flag]);

    return (
        <li>
            <NavLink to={link} end>
                {

                }
                <Typography
                    textAlign="left"
                    color="font"
                >{!!icon &&
                    <span className="material-icons md-18">{icon}</span>}{title}</Typography>
            </NavLink>
        </li>);
}