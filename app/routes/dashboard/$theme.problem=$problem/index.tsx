import type { LinksFunction } from "@remix-run/node"
import dashboardIndexStylesheetURL from "~/styles/dashboard-index.css"


export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: dashboardIndexStylesheetURL}
  ];
};


export default function DashboardIndex(){
  return(
    <div className="DashboardIndexWrapper">
    // PROBLEM GOES HERE
    </div>
  )
}
