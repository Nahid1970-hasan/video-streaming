import { useState } from "react";
import { MenuListItem } from "./MenuListItem";
import { Typography } from "./style/Typography_styled";

export const SidebarMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false);

  return (
    <>
      {!item.sub_module ? (

        <MenuListItem title={item.module_name} icon={item.icon_name} link={item.page_name} />

      ) : (
        <li
          className={!subMod ? "collapsible collapsed" : "collapsible"}
        >
          <a onClick={() => setSubMod(!subMod)}><Typography
            textAlign="left"
            color="font"
          >
           {item.icon_name && <span className="material-icons md-18">{item.icon_name}</span>} 
            {item.module_name}
          </Typography></a>
          <ul style={{ display: subMod ? "block" : "none" }}>
            {item.sub_module.map(
              (subMenu, i) =>
                <MenuListItem key={i} title={subMenu.sub_module_name} link={subMenu.page_name} />
            )}
          </ul>
        </li>
      )}
    </>
  );
};
