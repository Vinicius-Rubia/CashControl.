import { Home } from "@/pages/Home";
import { ViewBankStatements } from "@/pages/ViewBankStatements";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bank-statements" element={<ViewBankStatements />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
