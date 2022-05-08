import { Link, useLoaderData, useParams, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetThemeStylesheetURL from "~/styles/widget-theme.css";
import { getProblemsByTheme, getIndicatorsByTheme } from "~/models/theme.server";
import { deslugify } from '~/utils/deslugify';
import { unpackRoutes } from '~/utils/unpackRoutes';
import { slugify } from '~/utils/slugify';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetThemeStylesheetURL}
  ]
};

type LoaderData = {
  problems: Awaited<ReturnType<typeof getProblemsByTheme>>;
  indicators: Awaited<ReturnType<typeof getIndicatorsByTheme>>;
}

export const loader: LoaderFunction = async ({
  params
}) => {
  const problems = await getProblemsByTheme(params.theme ? params.theme : "");
  const indicators = await getIndicatorsByTheme(params.theme ? params.theme : "")
  const data: LoaderData = {
    problems,
    ...indicators
  }
  return json(data)
}

export default function WidgetTheme(){
  const params = useParams();
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <div className="DashboardFocus">
        <Outlet />
      </div>
      <div className="DashboardThemeSelection">
      <div className="DashboardThemeSelectionWelcomeWrapper">
        <h1>Hello <strong>Farnney the Dinosaur</strong></h1>
      </div>
        <div className="WidgetThemeCarousel">
            <div className="WidgetActiveTheme">
              <div className="ThemeButtonActive">
                <p>{params ? deslugify(unpackRoutes(params.theme ? params.theme : "")) : ""}</p>
              </div>
            </div>
            <div className="WidgetIndicatorCarousel">
              {data && data.problems.map((problem)=>(
                  <div key={problem.id} className="ProblemButton">
                    <Link to={`problem/${problem.slug}`}>
                    <p>{problem.name}</p>
                    </Link>
                  </div>
              ))}
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
