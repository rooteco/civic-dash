import React from 'react';

interface WrapperProps {
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
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
        {props.themeCarouselChild}
      </div>
    </div>
    <div className="DashboardCarousel">
      {props.linkChild}
    </div>
    </>
  )
}
