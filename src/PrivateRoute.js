import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    return JSON.parse(isAuthenticated) ? <Outlet /> : <Navigate to="login"/>
}

export default PrivateRoute;