import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../../components/Dashboard Page/Home"
import Login from "../../components/Login Page/Login"
import Edit from "../../components/Edit Page/Edit";
import Error from "../Error Page/Error";
import Task from "../../components/Task Details Page/Task";

function Navigation() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Task" element={<Task />} />
                    <Route path="/Edit/:id" element={<Edit />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigation;