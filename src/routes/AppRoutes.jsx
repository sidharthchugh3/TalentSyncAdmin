import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import NotFound from "../pages/NotFound"
import Login from "../pages/Login";



function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
