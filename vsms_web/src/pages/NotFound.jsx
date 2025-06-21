import { Link } from "react-router-dom";
import { Center } from "../components/style/Center_styled";
import { Typography } from "../components/style/Typography_styled";

export default () => {
    return <div style={{ userSelect: "none" }}>
        <div style={{ height: "85vh" }}> 
            <Center>
                <Typography fontWeight={100} fontSize="extraLargeFontSize" color="primary">404</Typography>
                <Typography fontSize="bodyTitleFontSize" lineHeight="23px">
                    Opps something went wrong!
                </Typography>
                <Link to="/login" replace>
                    <Typography fontSize="bodySubTitleFontSize" lineHeight="3rem" color="secondary">
                        Go to Login
                    </Typography>
                </Link>
            </Center>
        </div>
    </div>
}