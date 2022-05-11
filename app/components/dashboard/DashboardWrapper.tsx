import React from 'react';
import { Link } from '@remix-run/react';

interface WrapperProps {
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
  predictionChild?: React.ReactNode;
}


export const TableOpenContext: Boolean = React.createContext(true)

export function DashboardWrapper(props: WrapperProps){
  const [tableOpen, setTableOpen] = React.useState(true)
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
        <div className="DashboardLinks">
          <Link to={"/dashboard"}><p>Dashboard</p></Link>
          <div><a
                  href="https://rooteco.notion.site/CivicDash-v2-1-8631ce9d3fd442a1a031eec9fa48cf3b"
                  target="_blank">Docs</a></div>
                <div><a href="https://discord.gg/bQHFfWUC" target="_blank">Discord</a></div>
        </div>
      </div>
    </div>
    </TableOpenContext.Provider>
    </>
  )
}

// <Link><p>Docs</p></Link>
// <Link><p>Discord</p></Link>
