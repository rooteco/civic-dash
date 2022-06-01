import { useEffect } from "react";
import type { LinksFunction } from "@remix-run/node"
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { ThemeIntro } from "~/components/dashboard/focus-components/theme-intro"
import { getThemeDescription } from "~/models/theme.server"


export const loader = async ({ params }) => {
  const themeDescription = await getThemeDescription(params.theme)

  return json({themeDescription})
}

export default function DashboardIndex(){
  // Displays information about a selected theme
  const data = useLoaderData();


  return(
    <div className="DashboardIndexWrapper">
      <ThemeIntro themeDescription={data.themeDescription.description}/>
    </div>
  )
}
