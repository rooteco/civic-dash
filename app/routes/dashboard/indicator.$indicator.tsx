import { useLoaderData, Outlet } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetIndexStylesheetURL from "~/styles/widget-index.css";
import { json } from "@remix-run/node";
import { getThemes, getIndicatorsByFavourite } from "~/models/theme.server";
import { DashboardWrapper } from "~/components/dashboard/DashboardWrapper"
import { IndexIndicatorLink } from "~/components/dashboard/linking-components/index-indicator-link";
import { IndexCarousel } from "~/components/dashboard/theme-carousel-components/index-carousel";
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
    themes,
    ...indicators
  }
  return json(data)
};

export default function WidgetIndex(){
  const data = useLoaderData<LoaderData>();
  return(
    <DashboardWrapper
        focusChild={<Outlet />}
        linkChild={<IndexIndicatorLink indicators={data.indicators}/>}
        themeCarouselChild={<IndexCarousel themes={data.themes}/>}
    />
  )
}
