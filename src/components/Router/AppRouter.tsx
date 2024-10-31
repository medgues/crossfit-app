import { Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

import MainLayout from "../Layout/MainLayout/MainLayout";
// import Displaylayout from "../Layout/DisplayLayout/Displaylayout";
import NewTapPage from "@/pages/NewTapPage";
import {
  ROUTE_CHALLENGERS,
  ROUTE_SCOREBOARD,
  ROUTE_TEAMS,
} from "../config/constants";
import Challengers from "@/pages/Challengers";
import Teams from "@/pages/Teams";
import Displaylayout from "../Layout/DisplayLayout/Displaylayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Challengers />} />{" "}
        {/* Challengers as home page */}
        <Route path={ROUTE_CHALLENGERS} element={<Challengers />} />
        <Route path={ROUTE_TEAMS} element={<Teams />} />
        {/* <Route path={ROUTE_SCOREBOARD} element={<NewTapPage />} /> */}
      </Route>

      <Route path={ROUTE_SCOREBOARD} element={<Displaylayout />}>
        <Route index element={<NewTapPage />} />
        <Route path="*" element={<Navigate to={ROUTE_SCOREBOARD} replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
