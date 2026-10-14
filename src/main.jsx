import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout.jsx"
import ItemsList from "./pages/ItemsList.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import MyBids from "./pages/MyBids.jsx"
import Logout from "./pages/Logout.jsx"
import ItemDetail from "./pages/ItemDetail.jsx"
import AuthGuard from './components/AuthGuard.jsx'
import CreateItem from './components/CreateItem'
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route index element={<ItemsList />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route 
                    path="bids" 
                    element={
                        <AuthGuard>
                        <MyBids />
                    </AuthGuard>} />
                    <Route path="item/:id" element={<ItemDetail />} />
                        <Route 
                        path="CreateItem"
                        element={
                        <AuthGuard>
                            <CreateItem />
                            </AuthGuard>} />
                </Route>
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)