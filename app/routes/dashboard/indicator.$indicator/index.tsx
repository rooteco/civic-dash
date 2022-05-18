import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import indicatorSingleStylesheetUrl from "~/styles/indicator-displays/single.css"
import plottingStyles from '~/styles/plotting.css'
import { ChartCanvas } from '~/components/charts/ChartCanvas'
import { getDatasetFromIndicator } from "~/models/indicator.server"
import { getConfigFromIndicator } from "~/models/indicator.server"
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorSingleStylesheetUrl},
    {rel: "stylesheet", href: plottingStyles},
  ];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getDatasetFromIndicator>>;
  config: Awaited<ReturnType<typeof getConfigFromIndicator>>;
}

export const loader: LoaderFunction = async ({
    params
  }) => {
  invariant(params.indicator, "params.indicator is are required")
  const dataset = await getDatasetFromIndicator(params.indicator);
  // Uncomment this invariant once the datasets are all set up
  // invariant(dataset, `${params.indicator} does not have an associated Redis value`)
  const config = await getConfigFromIndicator(params.indicator)

  const data: LoaderData = {
    dataset: dataset,
    config: config
  }
  return json(data)
}

export default function IndicatorSingle(){
  const data = useLoaderData<LoaderData>();
  console.log("PROPS.CONFIG:", data.config)
  return(
    <ChartCanvas dataset={data.dataset} config={data.config[0]}/>
  )
}
