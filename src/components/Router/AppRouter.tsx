import { Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

import MainLayout from "../Layout/MainLayout/MainLayout";
import Displaylayout from "../Layout/DisplayLayout/Displaylayout";
import NewTapPage from "@/pages/NewTapPage";
import { ROUTE_CHALLENGERS, ROUTE_TEAMS } from "../config/constants";
import Challengers from "@/pages/Challengers";
import Teams from "@/pages/Teams";
// import { useAppSelector } from '../../state/redux-hooks'

const AppRouter = () => {
  // const fetchData = async () => {
  //   const deviceId = await GenerateDeviceId();
  //   console.log("appRouter fetch data");

  //   if (isloggedIn && session?.accessToken) {
  //     console.log("setting axios headers", deviceId, session);
  //     await setAxiosHeaders({
  //       deviceId: deviceId as string,
  //       authorization: session?.accessToken,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path={ROUTE_CHALLENGERS} element={<Challengers />} />
        <Route path={ROUTE_TEAMS} element={<Teams />} />
      </Route>
      <Route path={"/scoreboard"} element={<Displaylayout />}>
        <Route index element={<NewTapPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
