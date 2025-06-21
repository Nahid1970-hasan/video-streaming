import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Center } from "../components/style/Center_styled";
import { Typography } from "../components/style/Typography_styled";
import { getLogout } from "../features/user/user_slice";

export default () => {
  const dispatch = useDispatch();
  return (
    <div style={{ userSelect: "none" }}>
      <Center>
        <Typography fontWeight={100} fontSize="extraLargeFontSize" color="font">
          401
        </Typography>
        <Typography fontSize="bodyTitleFontSize" lineHeight="23px"  color="font">
          Authentication Error!
        </Typography>
        <Typography lineHeight="3rem" fontSize="bodyTitleFontSize"  color="font">
          Access expired
        </Typography>
        <Link to="/login" replace>
          <Typography onClick={() => dispatch(getLogout())} lineHeight="3rem" fontSize="bodySubTitleFontSize"   color="font">
            Please Login
          </Typography>
        </Link>
      </Center>
    </div>
  );
};
