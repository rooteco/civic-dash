import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetIndexStylesheetURL from "~/styles/widget-index.css";
import { json } from "@remix-run/node";
import { getThemes } from "~/models/theme.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetIndexStylesheetURL}
  ]
};

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
};

export const loader: LoaderFunction = async () => {
  const themes = await getThemes();
  const data: LoaderData = {
    themes
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <>
    <div className="DashboardThemeSelection">
      <div className="DashboardThemeCarousel">
      {data && data.themes.map((theme)=>(
          <div key={theme.id} className="ThemeButton">
            <Link to={theme.slug}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
    <div className="DashboardCarousel">
      {}
    </div>
    </>
  )
}
