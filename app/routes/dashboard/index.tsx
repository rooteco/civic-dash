import { Link, useLoaderData } from "@remix-run/react";
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
  indicators: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['indicators'];
  sparkData: Awaited<ReturnType<typeof getIndicatorsByFavourite>>['sparkData'];
};

export const loader: LoaderFunction = async () => {
  const themes = await getThemes();
  const indicators = await getIndicatorsByFavourite();
  const data: LoaderData = {
    themes: themes,
    ...indicators
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <>
    <div className="DashboardFocus">
      // DEFAULT INTRO GOES HERE
    </div>
    <div className="DashboardThemeSelection">
      <div className="DashboardThemeSelectionWelcomeWrapper">
        <h1>Hello <strong>Farnney the Dinosaur</strong></h1>
      </div>
      <div className="DashboardThemeCarousel">
      {data && data.themes.map((theme)=>(
          <div key={theme.id} className="ThemeButton">
            <Link to={`theme/${theme.slug}`}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
    <div className="DashboardCarousel">
      {data && data.indicators.map((indicator) => (
        <div className="IndicatorContainer" key={indicator.id}>
          <Link to={`indicator/${indicator.slug}/${slugify(indicator.config.layout)}`}>
            <h1>{indicator.name}</h1>
          </Link>
        </div>
      ))}
    </div>
    </>
  )
}
