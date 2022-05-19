import { Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
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

export type UserType = {
  displayName: String;
  emails: Array<any>;
  id: String;
  name: {
    familyName: String;
    givenName: String;
  };
  photos: Array<any>;
  provider: String;
}

export type UserContext = {
  user: UserType
}


// TODO: retrieve names and set currentImage based on timer and Pause/Play
//const currentImage = "finn_bridge.jpeg"
//const screensaver = `min-h-screen bg-[url(../assets/${currentImage})]`

export default function Dashboard(){
  const userData = useLoaderData();
  const [user, setUser] = useState("loading")

  useEffect(()=>{
    setUser(userData)
  }, [userData])

  const userContext: UserContext = user;
  if(user === 'loading'){
    return(
      <>
      </>
    )
  }

  return (
    <main className={"Screensaver"}>
        <Outlet context={userContext} />
    </main>
  );
}

// {props.predictionChild ? props.predictionChild : "Uh oh! No prediction child rendered! Oopsie"}
