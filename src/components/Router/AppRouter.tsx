import { Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

import MainLayout from "../Layout/MainLayout/MainLayout";
// import Displaylayout from "../Layout/DisplayLayout/Displaylayout";
import NewTapPage from "@/pages/NewTapPage";
import {
  ROUTE_CHALLENGERS,
  ROUTE_SCOREBOARD,
  ROUTE_TEAMS,
  ROUTE_TIMER,
  ROUTE_TIMERDISPLAY,
} from "../config/constants";
import Challengers from "@/pages/Challengers";
import Teams from "@/pages/Teams";
import Displaylayout from "../Layout/DisplayLayout/Displaylayout";
import Timer from "@/pages/Timer";
import TimerDisplay from "@/pages/TimerDisplay";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Challengers />} />{" "}
        {/* Challengers as home page */}
        <Route path={ROUTE_CHALLENGERS} element={<Challengers />} />
        <Route path={ROUTE_TEAMS} element={<Teams />} />
        <Route path={ROUTE_TIMER} element={<Timer />} />
        {/* <Route path={ROUTE_SCOREBOARD} element={<NewTapPage />} /> */}
      </Route>

      <Route path={ROUTE_SCOREBOARD} element={<Displaylayout />}>
        <Route index element={<NewTapPage />} />
        <Route path="*" element={<Navigate to={ROUTE_SCOREBOARD} replace />} />
      </Route>
      <Route path={ROUTE_TIMERDISPLAY} element={<Displaylayout />}>
        <Route index element={<TimerDisplay />} />
        <Route
          path="*"
          element={<Navigate to={ROUTE_TIMERDISPLAY} replace />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
