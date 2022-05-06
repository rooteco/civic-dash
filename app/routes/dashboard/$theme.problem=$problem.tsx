import { Link, useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetThemeStylesheetURL from "~/styles/widget-theme.css";
import { getIndicatorsByProblem } from "~/models/theme.server";
import { deslugify } from '~/utils/deslugify';
import { slugify } from '~/utils/slugify';
import { unpackRoutes } from '~/utils/unpackRoutes';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetThemeStylesheetURL}
  ]
};

type LoaderData = {
  indicators: Awaited<ReturnType<typeof getIndicatorsByProblem>>;
}

export const loader: LoaderFunction = async ({
  params
}) => {
  const indicators = await getIndicatorsByProblem(params.problem)
  const data: LoaderData = {
    indicators
  }
  return json(data)
}

export default function WidgetIndicator(){
  const params = useParams();
  const data = useLoaderData<LoaderData>();
  return (
    <>
    <div className="DashboardFocus">
      <Outlet />
    </div>
      <div className="WidgetThemeSelection">
        <div className="WidgetThemeCarousel">
            <div className="WidgetActiveTheme">
              <div className="ThemeButtonActive">
                <p>{params ? deslugify(unpackRoutes(params.theme)) : ""}</p>
              </div>
            </div>
            <div className="WidgetActiveProblem">
              <div className="ProblemButtonActive">
                <p>{params ? deslugify(params.problem) : ""}</p>
              </div>
            </div>
      </div>
    </div>
    <div className="DashboardCarousel">
      {data && data.indicators.map((indicator) => (
        <div className="IndicatorContainer" key={indicator.id}>
          <Link to={`${indicator.slug}/${slugify(indicator.config.layout)}`}>
            <h1>{indicator.name}</h1>
          </Link>
        </div>
      ))}
    </div>
    </>
  )
};
