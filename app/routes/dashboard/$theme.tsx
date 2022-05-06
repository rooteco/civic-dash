import { Link, useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import widgetThemeStylesheetURL from "~/styles/widget-theme.css";
import { getProblems } from "~/models/theme.server";
import { deslugify } from '~/utils/deslugify';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: widgetThemeStylesheetURL}
  ]
};

type LoaderData = {
  problems: Awaited<ReturnType<typeof getProblems>>;
}

export const loader: LoaderFunction = async () => {
  const problems = await getProblems();
  const data: LoaderData = {
    problems
  }
  return json(data)
}

export default function WidgetTheme(){
  const params = useParams();
  const data = useLoaderData<LoaderData>();
  console.log(data)
  return (
    <>
      <div className="WidgetThemeSelection">
        <div className="WidgetThemeCarousel">
            <div className="WidgetActiveTheme">
              <div className="ThemeButtonActive">
                <p>{params ? deslugify(params.theme) : ""}</p>
              </div>
            </div>
            <div className="WidgetIndicatorCarousel">
              {data && data.problems.map((problem)=>(
                  <div key={problem.id} className="ProblemButton">
                    <Link to={problem.slug}>
                    <p>{problem.name}</p>
                    </Link>
                  </div>
              ))}
            </div>
        </div>
      </div>
      <div className="WidgetCarousel">
      </div>
    </>
  )
};
