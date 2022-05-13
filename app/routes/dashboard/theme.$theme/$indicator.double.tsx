import type { LinksFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import indicatorDoubleStylesheetUrl from "~/styles/indicator-displays/double.css"
import Double from '~/components/indicators/double';
import { getDatasetFromIndicator } from "~/models/indicator.server"
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorDoubleStylesheetUrl}
  ];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getDatasetFromIndicator>>;
}

// TODO: Fix Type error
export const loader: LoaderFunction = async ({
    params
  }) => {
  invariant(params.indicator, "params.indicator is required")
  const dataset: LoaderData = await getDatasetFromIndicator(params.indicator);

  // Uncomment this invariant once the datasets are all set up
  // invariant(dataset, `${params.indicator} does not have an associated Redis value`)
  return json(dataset)
}

// TODO: Fix Type error
export default function IndicatorDouble(){
  const data = useLoaderData<LoaderData>();
  return(
    <Double dataset={data}/>
  )
}
