import type { Indicator } from "~/models/theme.server"

export function evaluateIndicatorString(indicator: Indicator, location: String): String{
  switch(location){
    case "index":
      return `indicator/${indicator.slug}`

    case "theme":
      return `${indicator.slug}`

    case "indicator":
      return `/dashboard/indicator/${indicator.slug}`

    default:
      return `/dashboard`
  }
}
