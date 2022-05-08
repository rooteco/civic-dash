import type { LinksFunction } from "@remix-run/node"
import dashboardIndexStylesheetURL from "~/styles/dashboard-index.css"
import { ThemeIntro } from "~/components/dashboard/focus-components/theme-intro"

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: dashboardIndexStylesheetURL}
  ];
};


export default function DashboardIndex(){
  // Displays information about a selected theme
  return(
    <div className="DashboardIndexWrapper">
      <ThemeIntro />
    </div>
  )
}
