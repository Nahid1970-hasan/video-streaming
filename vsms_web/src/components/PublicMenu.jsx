
import { NavLink } from "react-router-dom";
import { Typography } from "./style/Typography_styled";


export const PublicMenu = ({ item }) => {

  return (
    <>
      <li>
        <NavLink to={item?.page_name} end>
          <Typography
            textAlign="left"
            color="bg" 
            fontSize={"bodySubTitleFontSize"}
          >
            {item?.module_name}
          </Typography>
        </NavLink>
      </li>
    </>
  );
};
