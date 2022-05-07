import type { LinksFunction } from "@remix-run/node"
import dashboardIndexStylesheetURL from "~/styles/dashboard-index.css"


export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: dashboardIndexStylesheetURL}
  ];
};


export default function DashboardIndex(){
  // Displays information about a selected theme
  return(
    <div className="DashboardIndexWrapper">
    // THEME GOES HERE
    </div>
  )
}
