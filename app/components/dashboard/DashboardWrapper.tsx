import React from 'react';
import SlidingPane from "react-sliding-pane";

interface WrapperProps {
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
  predictionChild?: React.ReactNode;
}

export function DashboardWrapper(props: WrapperProps){
  return(
    <>
    <div className="min-h-screen flex flex-row">
      <div className="DashboardGrid">
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
      </div>
      <div className="DashboardInset" id="ModalAnchor">
        {props.predictionChild ? props.predictionChild : ""}
      </div>
    </div>
    </>
  )
}
