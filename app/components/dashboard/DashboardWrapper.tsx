import type { Theme, Indicator } from "~/models/theme.server";
import { Link } from "@remix-run/react";
import React from 'react';

interface WrapperProps {
  themes: Theme[];
  indicators: Indicator[];
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
}

export function DashboardWrapper(props: WrapperProps){
  return(
    <>
    <div className="DashboardFocus">
      {props.focusChild}
    </div>
    <div className="DashboardThemeSelection">
      <div className="DashboardThemeSelectionWelcomeWrapper">
        <h1>Hello <strong>Farnney the Dinosaur</strong></h1>
      </div>
      <div className="DashboardThemeCarousel">
      {props && props.themes.map((theme)=>(
          <div key={theme.id} className="ThemeButton">
            <Link to={`theme/${theme.slug}`}>
            <p>{theme.name}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
    <div className="DashboardCarousel">
      {props && props.indicators.map((indicator) => (
        React.cloneElement(props.linkChild, {key: indicator.id, indicator: indicator})
      ))}
    </div>
    </>
  )
}
