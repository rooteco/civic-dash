import type { LinksFunction } from "@remix-run/node"
import indicatorDoubleStylesheetUrl from "~/styles/indicator-displays/double.css"
import Double from '~/components/indicators/double';

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: indicatorDoubleStylesheetUrl}
  ];
};

export default function IndicatorDouble(){
  return(
    <Double />
  )
}
