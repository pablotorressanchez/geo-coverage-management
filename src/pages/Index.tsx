// import { useState } from "react";
import "../styles/Index.css";
import { Sidebar } from "../layouts/Sidebar";
import { MainContent } from "../layouts/MainContent";
import { Route, Routes } from "react-router-dom";
import { Index as Indexv1 } from './v1/Index';

export default function Index() {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/v1/" element={<Indexv1 />} />
            </Routes>
            
        </>
    );

    function App() {
        return (
            <>
            <Sidebar />
            <MainContent />
            </>
        )
    }
}
