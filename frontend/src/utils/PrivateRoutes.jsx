import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const userToken = localStorage.getItem('access-token')
        ? JSON.parse(localStorage.getItem('access-token'))
        : null
    return (
        userToken ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default PrivateRoutes