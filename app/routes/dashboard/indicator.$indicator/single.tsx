import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import indicatorSingleStylesheetUrl from "~/styles/indicator-displays/single.css"
import Single from '~/components/indicators/single'
import { getDatasetFromIndicator } from "~/models/indicator.server"
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorSingleStylesheetUrl}
  ];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getDatasetFromIndicator>>;
}

export const loader: LoaderFunction = async ({
    params
  }) => {
  invariant(params.indicator, "params.indicator is are required")
  const dataset: LoaderData = await getDatasetFromIndicator(params.indicator);

  // Uncomment this invariant once the datasets are all set up
  // invariant(dataset, `${params.indicator} does not have an associated Redis value`)
  return json(dataset)
}

export default function IndicatorSingle(){
  const data = useLoaderData<LoaderData>();
  return(
    <Single dataset={data}/>
  )
}
