import { Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { UserType } from "~/models/user.server"
import type { LinksFunction } from "@remix-run/node";
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { monitorMarketParams } from "~/models/prediction.server"
import dashboardStylesheetUrl from "../styles/dashboard.css"
import carouselStyles from 'react-multi-carousel/lib/styles.css';
import { authenticator } from "~/models/auth.server";

import bg1 from "../../public/assets/1.jpeg";
import bg2 from "../../public/assets/2.jpeg";
import bg3 from "../../public/assets/3.jpeg";
import bg4 from "../../public/assets/4.jpeg";


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



export default function Dashboard() {
  const userData = useLoaderData();
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(userData)
  }, [userData])

  const [currentBg, setBg] = useState({
    backgroundImage: `linear-gradient(0deg, rgba(var(--clr-grey-800), var(--alpha-medium)) -20.22%, rgba(0, 0, 0, 0) 15.98%), linear-gradient(231.76deg, rgba(81, 81, 81, 0) 30.25%, rgba(0, 0, 0, 0.193) 66.06%, #111111 98.99%), url(${bg4})`
  });


  const userContext: UserContext = user;

  return (
    <main className={"screensaver"}>
      {user === 'loading' ? <Outlet /> : <Outlet context={userContext} />}
    </main>
  );

}

// {props.predictionChild ? props.predictionChild : "Uh oh! No prediction child rendered! Oopsie"}
