import React from 'react';
import SlidingPane from "react-sliding-pane";

interface WrapperProps {
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
  predictionChild?: React.ReactNode;
}

export const TableOpenContext: Boolean = React.createContext(true)

export function DashboardWrapper(props: WrapperProps){
  const [tableOpen, setTableOpen] = React.useState(false)
  return(
    <>
    <TableOpenContext.Provider value={tableOpen}>
    <div className="min-h-screen flex flex-row">
      <div className="DashboardGrid">
        <div className="DashboardFocus">
          {props.focusChild}
        </div>
        <div className="DashboardThemeSelection">
          <div className="DashboardThemeSelectionWelcomeWrapper">
            <div className="DashboardHello">
              <h1>Hello <strong>Farnney the Dinosaur</strong></h1>
            </div>
            <div className="DashboardFlexStretch" />
            <div className="DashboardPredictionMetrics">
              <button
                  className="DashboardMetricWrapper"
                  onClick={()=>setTableOpen(prevState => !prevState)}>Metric One</button>
                <button
                  className="DashboardMetricWrapper"
                  onClick={()=>setTableOpen(prevState => !prevState)}>Metric Two</button>
            </div>
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
    </TableOpenContext.Provider>
    </>
  )
}
