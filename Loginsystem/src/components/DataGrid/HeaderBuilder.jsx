import { GridContext } from ".";

import { CellItem } from "../style/Datagrid_styled";
import { useContext, useState } from "react";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import { Checkbox } from "../Checkbox";
import { useEffect } from "react";
import { memo } from "react";

export const HeaderBuilder = memo(() => {
  const { mainSelect, setMainSelect, setRows, colums, sortGrid, asc } = useContext(GridContext);


  useEffect(() => {
    if (mainSelect == 1) {
      //setSelectIds(rows.map(d => d[colums.find(d => d.key).field]))
      setRows(rows => rows.map(d => ({ ...d, checkbox: true })));
    }
    else if (mainSelect == 0) {
      //setSelectIds([])
      setRows(rows => rows.map(d => ({ ...d, checkbox: false })));
    }
  }, [mainSelect])

  return colums.map((header, i) => (
    header.hide && !header.key ?
      "" : <CellItem child={header.child} style={{ width: header.type == "checkbox" ? "30px" : header.type == "action" ? header.icons.length < 2 ? "80px" : header.icons.length ? (40 * header.icons.length) + "px" : "auto" : header.width ? header.width : "auto" }} key={i} alignment={header.type == "action" ? 'center' : header.alignment} type={header.type} hide={header.hide} fontSize={"girdHeaderFontSize"} onClick={(e) => (header.type != "custom" && header.type != "action" && header.sortable != false) && sortGrid(i)}>

        {header.type == "checkbox" ?
          <Checkbox size="sm" selectColor="primaryFont" hoverColor={'gridRowOdd'} checked={mainSelect} onClick={(e) => { setMainSelect(+e.target.checked) }} />
          : <>
            <div style={{fontWeight:'bold'}}>
              {header.description ?
                <Tooltip position={i == (colums.length - 1) ? 'left' : 'bottom'} background={'girdHeaderalter'} color={"girdHeaderFontalter"} headerTitle={'girdHeaderFontSize'} title={(header.description)}>{(header.headerName)}</Tooltip>
                : (header.headerName)
              }
              {/* {header.type != "action"?<>&nbsp;</>:<></>}  */}
              {
                (header.type != "custom" && header.type != "action" && header.sortable != false && !header.child) &&

                (<div style={{ display: "flex" }}>
                  <div className={asc[i] == null ? "" : "show"}>
                    <IconButton key={i} onClick={(e) => { }}>
                      {(asc[i] == true || asc[i] == null) ?
                        (<span className="material-icons md-15">arrow_upward</span>) :
                        (<span className="material-icons md-15 ">arrow_downward</span>)
                      }
                    </IconButton>
                  </div>
                  {/* <div>
              <IconButton>
                <span className="material-icons md-15">more_vert</span>
              </IconButton>
            </div> */}
                </div>)
              }


            </div>
            {header.child ? <div style={{ display: "flex", justifyContent: "space-between", marginTop:'5px' }}>
              <div>{t(header.child[0].label)}</div>
              <div>{t(header.child[1].label)}</div>

            </div>
              : ""}

          </>}
      </CellItem>)
  );
});
