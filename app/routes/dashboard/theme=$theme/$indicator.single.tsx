import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, Outlet } from "@remix-run/react"
import { json } from "@remix-run/node"
import indicatorSingleStylesheetUrl from "~/styles/indicator-displays/single.css"

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorSingleStylesheetUrl}
  ];
};

export default function IndicatorSingle(){
  return(
    <div className="SingleIndicatorWrapper">
      <div className="SingleIndicatorChart">
        <h1>Single Chart</h1>
      </div>
    </div>
  )
}
