import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, Outlet } from "@remix-run/react"
import { json } from "@remix-run/node"
import indicatorDoubleStylesheetUrl from "~/styles/indicator-displays/double.css"

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorDoubleStylesheetUrl}
  ];
};

export default function IndicatorDouble(){
  return(
    <div className="DoubleIndicatorWrapper">
      <div className="DoubleIndicatorChart">
        <h1>Double Chart (1)</h1>
      </div>
      <div className="DoubleIndicatorChart">
        <h1>Double Chart (2)</h1>
      </div>
    </div>
  )
}
