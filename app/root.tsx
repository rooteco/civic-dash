import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import sharedStylesheetUrl from "~/styles/shared.css"
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import styles from "~/styles/app.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: sharedStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
    // { rel: "icon", href: "/_static/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "CivicDash",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
