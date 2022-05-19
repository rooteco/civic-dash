import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import indicatorSingleStylesheetUrl from "~/styles/indicator-displays/single.css"
import plottingStyles from '~/styles/plotting.css';
import { ChartCanvas } from '~/components/charts/ChartCanvas';
import { getDatasetFromIndicator, getConfigFromIndicator, getIndicatorFromSlug } from "~/models/indicator.server"
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorSingleStylesheetUrl},
    {rel: "stylesheet", href: plottingStyles}
  ];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getDatasetFromIndicator>>;
  config: Awaited<ReturnType<typeof getConfigFromIndicator>>;
  indicator: Awaited<ReturnType<typeof getIndicatorFromSlug>>;

}

export const loader: LoaderFunction = async ({
    params
  }) => {
  invariant(params.indicator, "params.indicator is required")
  const dataset = await getDatasetFromIndicator(params.indicator);
  const indicator = await getIndicatorFromSlug(params.indicator);
  const config = await getConfigFromIndicator(params.indicator);
  // Uncomment this invariant once the datasets are all set up
  // invariant(dataset, `${params.indicator} does not have an associated Redis value`)
  const data: LoaderData = {
    dataset: dataset,
    config: config,
    indicator: indicator
  }
  return json(data)
}

export default function Indicator(){
  const data = useLoaderData<LoaderData>();
  return(
    <ChartCanvas dataset={data.dataset}
                 config={data.config[0]}
                 indicator={data.indicator}/>
  )
}
