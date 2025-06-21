import { Outlet } from "react-router-dom"

export const LayoutLogin = () => {
    return (<>
        
        <div style={{width:"100%",height:"100vh", background: "#465c64"}}>
            <Outlet />
        </div>
    </>)
}