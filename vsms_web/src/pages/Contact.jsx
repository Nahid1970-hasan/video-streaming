
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Typography } from "../components/style/Typography_styled"


export const Contact = () => {
    return <div style={{ userSelect: "none" }}>
        <Container>
            <Flex row>
                <Typography>
                This is a Contact page
                </Typography>
            </Flex>
            
        </Container>
    </div>
}