import { Outlet, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { UserType } from "~/models/user.server"
import type { LinksFunction } from "@remix-run/node";
import { IndexPrediction } from "~/components/dashboard/prediction-components/index-prediction"
import { monitorMarketParams } from "~/models/prediction.server"
import dashboardStylesheetUrl from "../styles/dashboard.css"
import carouselStyles from 'react-multi-carousel/lib/styles.css';
import { authenticator } from "~/models/auth.server";

import Menu from "~/components/dashboard/menu"

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

  const randomBg = () => {
    const bgs = [bg1, bg2, bg3, bg4]

    // filter out current bg
    try {
      const filteredBgs = bgs.filter(bg => bg !== currentBg)
      const randomIndex = Math.floor(Math.random() * filteredBgs.length)
      setBg(filteredBgs[randomIndex])
    } catch (e) {
      const randomIndex = Math.floor(Math.random() * bgs.length)
      return bgs[randomIndex]
    }
  }

  const nextBg = () => {
    const bgs = [bg1, bg2, bg3, bg4]
    const currentIndex = bgs.indexOf(currentBg)
    const nextIndex = currentIndex + 1
    if (nextIndex >= bgs.length) {
      setBg(bgs[0])
    } else {
      setBg(bgs[nextIndex])
    }
  }

  useEffect(() => {
    setUser(userData)
  }, [userData])

  const [currentBg, setBg] = useState(bg1);

  const screensaver = {
    backgroundImage: `linear-gradient(0deg, rgba(var(--clr-grey-800), var(--alpha-medium)) 25%, rgba(0, 0, 0, 0) 35%), linear-gradient(195deg, rgba(81, 81, 81, 0) 45.25%, rgba(0, 0, 0, 0) 15%, #111111 95%), url(${currentBg})`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    transition: 'background-image 1s ease-in-out',
  }


  const userContext: UserContext = user;

  return (
    <main style = {screensaver}>
      <Menu changeBg = {nextBg}/>
      {user === 'loading' ? <Outlet /> : <Outlet context={userContext} />}
    </main>
  );

}