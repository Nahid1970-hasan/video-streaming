import { NavLink } from "react-router-dom";
import { Typography } from "./style/Typography_styled";
import styled from "styled-components";
import { theme } from "../styles/theme";
const MenuLabel = styled(Typography)`
    display: flex;
    background: ${theme.colors.darkbg}
`
export const SidebarCustMenu = ({ item }) => {

    return (
        <>
            <li>
                <NavLink to={item.page_name} end>
                    <MenuLabel
                        textAlign="left"
                        color="font"
                        fontSize={"navbarFontSize"}
                    > {item.module_name_en}
                    </MenuLabel>
                </NavLink>
            </li>
        </>
    );
};
