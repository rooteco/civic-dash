import type { LinksFunction } from "@remix-run/node"
import { ThemeIntro } from "~/components/dashboard/focus-components/theme-intro"


export default function DashboardIndex(){
  // Displays information about a selected theme
  return(
    <div className="DashboardIndexWrapper">
      <ThemeIntro />
    </div>
  )
}
