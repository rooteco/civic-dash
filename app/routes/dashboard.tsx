import { Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { monitorMarketParams } from "~/models/prediction.server"
import dashboardStylesheetUrl from "../styles/dashboard.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: dashboardStylesheetUrl },
  ];
};


export default function Dashboard(){
  const data = useLoaderData();
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
}

// {props.predictionChild ? props.predictionChild : "Uh oh! No prediction child rendered! Oopsie"}
