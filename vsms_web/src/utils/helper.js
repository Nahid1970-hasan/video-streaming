import { DateTime } from "luxon";
import React, { useRef, useEffect } from "react";
import { theme } from "../styles/theme";
/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClicker(ref, callback) {
  // console.log(callback);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        //alert("You clicked outside of me!");
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// /**
//  * Component that alerts if you click outside of it
//  */
// export function OutsideClick(props) {
//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef, props.callback);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }

export const stringSearch = (items, str, field, delay = 500) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          items.filter((item) =>
            !!field
              ? item[field].toLowerCase().includes(str.toLowerCase())
              : item.includes(str)
          )
        ),
      delay
    )
  );
};

export const getDate = (datestr) => {
  let date = new Date(datestr);

  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const langs = {
  bn: { nativeName: "বাংলা" },
  en: { nativeName: "English" },
};

export const formatGridDate = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd").toFormat("MMM dd")
}

export const formatPubDateTime = (str) => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() - h);
    return this;
  }
  return DateTime.fromJSDate(new Date(str))
    .setLocale(localStorage.i18nextLng)
    .toFormat("hh:mm a, dd MMM yyyy")
}

export const formatGridDatetime = (str) => {
  return DateTime.fromFormat(str, "yyyy-MM-dd HH:mm").toFormat("yyyy-MM-dd HH:mm")
}

export const formatGridTimeStamp = (str) => {
  var date = '---';
  try {
    date = DateTime.fromFormat(str, "yyyy-MM-dd HH:mm:ss").toFormat("hh:mm:ss a, dd MMM yyyy")
  } catch (error) {
    date = str;
  }
  return date;
}

export const formatGridTime = (str) => {
  var date = '---';
  try {
    date = DateTime.fromFormat(str, "HH:mm:ss").toFormat("HH:mm")
  } catch (error) {
    date = str;
  }
  return date;
}


export const formatGridDateALt = (str) => {
  var date = '---';
  try {
    date = DateTime.fromFormat(str, "yyyy-MM-dd").toFormat("MMM dd, yyyy")
  } catch (error) {
    date = str;
  }
  return date;
}

export const getFinanCialYear = (size) => {
  var fnYear = [];
  var currentMonth = DateTime.now().month;
  for (let i = 1; i <= size; i++) {
    var nextYear = currentMonth > 5 ? DateTime.now().plus({ year: 1 }) : DateTime.now();
    var cYear = nextYear.minus({ year: i });
    fnYear.push(cYear.toFormat("yyyy") + "-" + cYear.plus({ year: 1 }).toFormat("yy"))
  }
  return (fnYear);
};

export const getBackYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth - i)
  }
  return (ttYear);
};

export const getDDNumber = (size) => {
  var ttYear = [];
  for (let i = 0; i <= size; i++) {
    ttYear.push(i + 1);
  }
  return (ttYear);
};

export const getNextYearList = (size) => {
  var ttYear = [];
  var currentMonth = DateTime.now().year;
  for (let i = 0; i <= size; i++) {
    ttYear.push(currentMonth + i)
  }
  return (ttYear);
};

export const getCurrentYear = () => {
  var currentMonth = DateTime.now().year;
  return (currentMonth);
};
export const getBNFont = (font, lang) => {
  var fontInt = parseInt(font?.split("px")[0]);
  var chFont = fontInt ? fontInt + 1 + "px" : theme.fontSize.smFont;
  var bnFont = fontInt ? fontInt - 3 + "px" : theme.fontSize.smFont;
  return localStorage.i18nextLng == 'en' ? font : lang ? bnFont : chFont;
};

export const gettimeDay = (data) => {
  var am9 = DateTime.now().set({ hour: 9, minute: 0, second: 0 });
  var pm12 = DateTime.now().set({ hour: 12, minute: 0, second: 0 });
  var pm3 = DateTime.now().set({ hour: 15, minute: 0, second: 0 });
  var pm6 = DateTime.now().set({ hour: 18, minute: 0, second: 0 });
  var ddd = DateTime.now();
  return data ?? ddd > pm6
    ? localStorage?.i18nextLng == "bn" ? data.sky_state_6pm_bn : data.sky_state_6pm_en
    : ddd > pm3
      ? localStorage?.i18nextLng == "bn" ? data.sky_state_3pm_bn : data.sky_state_3pm_en
      : ddd > pm12
        ? localStorage?.i18nextLng == "bn" ? data.sky_state_12pm_bn : data.sky_state_12pm_en
        : ddd > am9
          ? localStorage?.i18nextLng == "bn" ? data.sky_state_9am_bn : data.sky_state_9am_en
          : localStorage?.i18nextLng == "bn" ? data.sky_state_6pm_bn : data.sky_state_6pm_en;
};

export const gettimeDayAlt = (data) => {
  var am9 = DateTime.now().set({ hour: 9, minute: 0, second: 0 });
  var pm12 = DateTime.now().set({ hour: 12, minute: 0, second: 0 });
  var pm3 = DateTime.now().set({ hour: 15, minute: 0, second: 0 });
  var pm6 = DateTime.now().set({ hour: 18, minute: 0, second: 0 });
  var ddd = DateTime.now();
  return data ?? ddd > pm6
    ? data.sky_state_6pm
    : ddd > pm3
      ? data.sky_state_3pm
      : ddd > pm12
        ? data.sky_state_12pm
        : ddd > am9
          ? data.sky_state_9am
          : data.sky_state_6pm;
};

export const getBNNumber = (paramstr, isFormat) => {
  var retStr = paramstr || "";
  var enData = retStr;
  var finalEnlishToBanglaNumber = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
  for (var x in finalEnlishToBanglaNumber) {
    retStr = retStr.toString().replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
  }
  var d11 = retStr.length == 11 && retStr.substring(0, 5).concat("-") + retStr.substring(5, retStr.length);
  var d14 = retStr.length == 14 && retStr.substring(0, 0).concat("(") + retStr.substring(0, 3).concat(") ") + retStr.substring(3, 8).concat("-") + retStr.substring(8, retStr.length)
  return localStorage?.i18nextLng == "bn" ? isFormat ? retStr.length == 14 ? d14 : retStr.length == 11 ? d11 : retStr || "NaN" : retStr : enData;
}

export const getChannelCode = (channel_code, usermask) => {
  var masked_code = "", temp_code = "";

  const fpos = parseInt(usermask.substring(0, 2));
  const fnum = parseInt(usermask.substring(2, 3));
  const spos = parseInt(usermask.substring(3, 5));
  const snum = parseInt(usermask.substring(5, 6));
  const tpos = parseInt(usermask.substring(6, 8));
  const tnum = parseInt(usermask.substring(8, 9));

  masked_code = channel_code;
  for (var i = 0; i < masked_code.length; i++) {
    if (i >= tpos && i < tpos + tnum) {

    } else {
      if (temp_code === "") {
        temp_code = masked_code.charAt(i) + "";
      } else {
        temp_code = temp_code + masked_code.charAt(i) + "";
      }
    }
  }

  masked_code = temp_code; 
  temp_code = "";
  for (var i = 0; i < masked_code.length; i++) {
    if (i >= spos && i < spos + snum) {

    } else {
      if (temp_code === "") {
        temp_code = masked_code.charAt(i) + "";
      } else {
        temp_code = temp_code + masked_code.charAt(i) + "";
      }
    }
  } 
  masked_code = temp_code; 
  temp_code = "";
  for (var i = 0; i < masked_code.length; i++) {
    if (i >= fpos && i < fpos + fnum) {

    } else {
      if (temp_code === "") {
        temp_code = masked_code.charAt(i) + "";
      } else {
        temp_code = temp_code + masked_code.charAt(i) + "";
      }
    }
  }
  masked_code = temp_code;  
  return masked_code;
}

export const getSSCode = (position, number, code) => {
  var temp_code = "";
  for (var i = 0; i < code.length; i++) {
    if (i >= position && i < position + number) {

    } else {
      if (temp_code === "") {
        temp_code = code.charAt(i) + "";
      } else {
        temp_code = temp_code + code.charAt(i) + "";
      }
    }
  }
  return temp_code;
}


export const getDayFromDate = (fDate) => {
  var rtDay = fDate;
  var fFulldate = fDate;
  var tdy = DateTime.now().toFormat("yyyy-MM-dd");
  var tmrw = DateTime.now().plus({ day: 1 }).toFormat("yyyy-MM-dd");
  var tmwk = DateTime.now().plus({ day: 7 }).toFormat("yyyy-MM-dd");
  var dayname = DateTime.fromFormat(fFulldate, "yyyy-MM-dd").toLocaleString({ weekday: 'long'});
  var yrcmt = DateTime.fromFormat(fFulldate, "yyyy-MM-dd").toFormat("MMM dd");
  if(fFulldate==tdy){
     rtDay = "Today"
  }else if(fFulldate==tmrw){
    rtDay = "Tommorrow";
  }else if(fFulldate>tmrw && fFulldate<tmwk){
    rtDay = dayname;
  } else {
    rtDay = yrcmt;
  } 
  return rtDay;
}