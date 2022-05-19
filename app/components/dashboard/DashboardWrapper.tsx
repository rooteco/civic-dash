import React from 'react';

import Canvas from './canvas';
import Header from './header';
import Menu from './menu';

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
    <div className="min-h-screen flex flex-row">
      <TableOpenContext.Provider value={tableOpen}>
        <Menu />
        <div className="dashgrid">
          <div className="axis"/>
          <Canvas focusChild={props.focusChild}/>
          <Header setTableOpen={setTableOpen} prevState={tableOpen}  />
          <div className="dash">
            <div className="picker">
              {props.themeCarouselChild}
            </div>
            <div className="sparklineticker">
              {props.linkChild}
            </div>
          </div>
          <div className="DashboardInset" id="ModalAnchor">
            {props.predictionChild ? props.predictionChild : ""}
          </div>
        </div>

    </TableOpenContext.Provider>
    </div>
  )
}


// <Link><p>Docs</p></Link>
// <Link><p>Discord</p></Link>
