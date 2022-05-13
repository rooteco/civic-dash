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
    <div className="DashboardLinks">
      <Link to={"/dashboard"}><p>Dashboard</p></Link>
      <div><a
              href="https://rooteco.notion.site/CivicDash-v2-1-8631ce9d3fd442a1a031eec9fa48cf3b"
              target="_blank">Docs</a></div>
            <div><a href="https://discord.gg/bQHFfWUC" target="_blank">Discord</a></div>
    </div>
    <div className="min-h-screen flex flex-row">
      <div className="dashgrid">
        <div className="axis"></div>
        <div className="focus">
          {props.focusChild}
        </div>
        <div className="header">
            <p>Hello <strong>Farnney the Dinosaur</strong></p>
            <div className="portfoliostats">
              <button
                  className="metric"
                  onClick={()=>setTableOpen(prevState => !prevState)}>$1000</button>
                <button
                  className="metric"
                  onClick={()=>setTableOpen(prevState => !prevState)}>3</button>
        </div>
        <div className="dash">
          <div className="picker">
            {props.themeCarouselChild}
          </div>
          <div className="sparklinecarousel">
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
    </div>
    </TableOpenContext.Provider>
    </>
  )
}




// <Link><p>Docs</p></Link>
// <Link><p>Discord</p></Link>
