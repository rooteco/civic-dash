import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, Outlet } from "@remix-run/react"
import { json } from "@remix-run/node"
import indicatorSingleStylesheetUrl from "~/styles/indicator-displays/single.css"
import Single from '~/components/indicators/single'

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorSingleStylesheetUrl}
  ];
};

export default function IndicatorSingle(){
  return(
    <Single />
  )
}
