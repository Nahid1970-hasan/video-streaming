
import { Center } from "../components/style/Center_styled";
import { Typography } from "../components/style/Typography_styled";

export default () => {
    return <div style={{ userSelect: "none", height:"80vh" }}>
        <Center>
            <Typography margin="20px 0" fontWeight={100} fontSize="extraLargeFontSize" color="primary">404</Typography>
            <Typography fontSize="headingLargeFontSize" lineHeight="60px">
                The page cannot be displayed, Please try again!
            </Typography>
        </Center>
    </div>
}