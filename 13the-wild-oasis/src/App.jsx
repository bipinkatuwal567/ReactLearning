import React from "react";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

export default function App() {
  return (
    <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="booking" element={<Bookings />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<NewUsers />} />
        <Route path="setting" element={<Settings />} />
        <Route path="account" element={<Account />} />
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
