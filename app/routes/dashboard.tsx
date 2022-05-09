import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import dashboardStylesheetUrl from "~/styles/dashboard.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: dashboardStylesheetUrl },
  ];
};

export default function Dashboard(){
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
}
