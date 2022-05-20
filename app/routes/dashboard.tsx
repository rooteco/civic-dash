import { Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { UserType } from "~/models/user.server"
import type { LinksFunction } from "@remix-run/node";
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { monitorMarketParams } from "~/models/prediction.server"
import dashboardStylesheetUrl from "../styles/dashboard.css"
import background from '../../public/assets/golden-gate.png'
import carouselStyles from 'react-multi-carousel/lib/styles.css';
import { authenticator } from "~/models/auth.server";


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: dashboardStylesheetUrl },
    { rel: "stylesheet", href: carouselStyles },
  ];
};
export const loader = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    // failureRedirect: "/dashboard",
    });
    return user
};


export type UserContext = {
  user: UserType
}


// TODO: retrieve names and set currentImage based on timer and Pause/Play
//const currentImage = "finn_bridge.jpeg"
//const screensaver = `min-h-screen bg-[url(../assets/${currentImage})]`

export default function Dashboard(){
  const userData = useLoaderData();
  const [user, setUser] = useState()

  useEffect(()=>{
    setUser(userData)
  }, [userData])

  const userContext: UserContext = user;
  if(user === 'loading'){
    return(
      <main className={"screensaver"}>
          <Outlet/>
      </main>
    )
  }

  return (
    <main className={"screensaver"}>
        <Outlet context={userContext} />
    </main>
  );
}

// {props.predictionChild ? props.predictionChild : "Uh oh! No prediction child rendered! Oopsie"}
