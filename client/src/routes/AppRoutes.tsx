import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Organization from "../pages/Organization";
import Board from "../pages/Board";
import List from "../pages/List";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/organization" element={<Organization/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/list" element={<List/>}/>
        </Routes>
    );
}

export default AppRoutes