import { Outlet } from "react-router-dom"
import { HeaderTop } from "../components/HeaderTop"
import { Container } from "../components/style/Container_styled"

export const LayoutApp = () => {
    return (<>
        
        <div>
            <Outlet />
        </div>
    </>)
}