import { Link, useLoaderData, Outlet } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetIndexStylesheetURL from "~/styles/widget-index.css";
import { json } from "@remix-run/node";
import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { slugify } from '~/utils/slugify';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetIndexStylesheetURL}
  ]
};

type LoaderData = {
  themes: Awaited<ReturnType<typeof getThemes>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>;
};

export const loader: LoaderFunction = async () => {
  const themes = await getThemes();
  const indicators = await getIndicatorsByFavourite();
  const data: LoaderData = {
    themes,
    indicators
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <>
    <div className="DashboardFocus">
      <Outlet />
    </div>
    <div className="DashboardThemeSelection">
      <div className="DashboardThemeCarousel">
      {data && data.themes.map((theme)=>(
          <div key={theme.id} className="ThemeButton">
            <Link to={`/dashboard/theme/${theme.slug}`}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
    <div className="DashboardCarousel">
      {data && data.indicators.map((indicator) => (
        <div className="IndicatorContainer" key={indicator.id}>
          <Link to={`/dashboard/indicator/${indicator.slug}/${slugify(indicator.config.layout)}`}>
            <h1>{indicator.name}</h1>
          </Link>
        </div>
      ))}
    </div>
    </>
  )
}
