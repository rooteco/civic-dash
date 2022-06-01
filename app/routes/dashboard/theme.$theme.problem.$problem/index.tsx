import type { LinksFunction } from "@remix-run/node"
import { ProblemIntro } from "~/components/dashboard/focus-components/problem-intro"
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { getProblemDescription } from "~/models/theme.server"

export const loader = async ({ params }) => {
  const problemDescription = await getProblemDescription(params.problem)

  return json({problemDescription})
}

export default function DashboardIndex(){
  const data = useLoaderData();

  return(
    <ProblemIntro
      problemDescription={data.problemDescription.description}
    />
  )
}
