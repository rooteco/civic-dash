import { Outlet } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import dashboardStylesheetUrl from "~/styles/dashboard.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: dashboardStylesheetUrl },
  ];
};

export default function Dashboard(){
  return (
    <main className="min-h-screen">
        <div className="min-h-screen flex flex-row">
          <div className="DashboardGrid">
            <Outlet />
          </div>
          <div className="DashboardInset">
          </div>
        </div>
    </main>
  );
}
