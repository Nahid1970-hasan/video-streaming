import { Outlet } from "react-router-dom"
import { HeaderTop } from "../components/HeaderTop"
import { Container } from "../components/style/Container_styled"

export const LayoutLogin = () => {
    return (<>
        <header>
            <Container>
                <HeaderTop />
            </Container>
        </header>
        <div style={{ marginTop: 30 }}>
            <Outlet />
        </div>
    </>)
}