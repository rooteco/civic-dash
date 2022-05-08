import type { LinksFunction } from "@remix-run/node"
import dashboardIndexStylesheetURL from "~/styles/dashboard-index.css"
import { ProblemIntro } from "~/components/dashboard/focus-components/problem-intro"

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: dashboardIndexStylesheetURL}
  ];
};


export default function DashboardIndex(){
  return(
    <ProblemIntro />
  )
}
