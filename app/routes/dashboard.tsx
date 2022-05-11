import { Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { monitorMarketParams } from "~/models/prediction.server"
import dashboardStylesheetUrl from "../styles/dashboard.css"
import background from '../../public/assets/golden-gate.png'

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: dashboardStylesheetUrl },
  ];
};

// TODO: retrieve names and set currentImage based on timer and Pause/Play
const currentImage = "finn_bridge.jpeg"
const screensaver = `min-h-screen bg-[url(../assets/${currentImage})]`

export default function Dashboard(){
  return (
    <main className={screensaver}>
        <Outlet />
    </main>
  );
}

// {props.predictionChild ? props.predictionChild : "Uh oh! No prediction child rendered! Oopsie"}
