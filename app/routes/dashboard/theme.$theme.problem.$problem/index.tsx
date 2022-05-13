import type { LinksFunction } from "@remix-run/node"
import { ProblemIntro } from "~/components/dashboard/focus-components/problem-intro"


export default function DashboardIndex(){
  return(
    <ProblemIntro />
  )
}
