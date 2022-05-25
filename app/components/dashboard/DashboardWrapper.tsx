import React, { useState, useEffect } from 'react';
import { Link, Form } from '@remix-run/react';
import { SocialsProvider } from "remix-auth-socials";
import type { User } from "~/routes/dashboard"
import Snackbar from "@mui/material/Snackbar"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Canvas from './canvas';
import Header from './header';
import Menu from './menu';


interface WrapperProps {
  error: Object | undefined;
  user: User;
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
  predictionChild?: React.ReactNode;
}

export const TableOpenContext: Boolean = React.createContext(true)

export function DashboardWrapper(props: WrapperProps){
  const [tableOpen, setTableOpen] = useState(true)
  const [snackbarOpen, setSnackbarOpen ] = useState(false)

  useEffect(()=>{
    typeof props.error !== 'undefined' ? setSnackbarOpen(true) : setSnackbarOpen(false)
  }, [props.error])

  // get current time and format
  const now = new Date()
  
  let dateOptions = { weekday: 'short', month: 'long', day: 'numeric' };
  let timeOptions = { hour: 'numeric', minute: 'numeric' };

  const currentDate = now.toLocaleDateString('en-US', dateOptions);
  const currentTime = now.toLocaleTimeString('en-US', timeOptions);


  return(
    <div className="min-h-screen flex">
      <TableOpenContext.Provider value={tableOpen}>
          <Menu />
          <div className="dashgrid">
            <div className="axis"/>
            <div className="flex-column focus border-gradient border-gradient-white">
              {props.focusChild} 
            </div>
            <div className="header flex-space-between">
                <div className="flex-row">
                  <p>{currentDate}</p>
                  <div className = "icon-s"/>
                  <p>{currentTime}</p>
                </div>

                {props.user &&
                  <Form
                    method="post"
                    action="/logout"
                  >
                    <button style={{color: "gray"}}><p>Logout</p></button>
                  </Form>
                }
                {!props.user &&
                  <Form
                    method="post"
                    action={`/auth/${SocialsProvider.GOOGLE}`}
                  >
                    <button style={{color: "gray"}}><p>Login or sign up</p></button>
                  </Form>
                }
            </div>

            <div className="dash">
              <div className="picker">
                {props.themeCarouselChild}
              </div>
              <div className="sparklineticker">
              {props.linkChild}
              </div>
            </div>
            <div className="DashboardInset flex-column pad" id="ModalAnchor">
              {props.predictionChild ? props.predictionChild : ""}
            </div>
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            message="Please log in or sign up to favourite indicators"
            onClose={()=>setSnackbarOpen(false)}
            action={
              <React.Fragment>
                <Form
                  method="post"
                  action={`/auth/${SocialsProvider.GOOGLE}`}
                >
                  <button>
                    <p><b>Login or sign up</b></p>
                  </button>
                </Form>
                <IconButton
                  aria-label="close"
                  sx={{ p: 0.5 }}
                  color="inherit"
                  onClick={()=>setSnackbarOpen(false)}
                  >
                    <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
          />
    </TableOpenContext.Provider>
    </div>
  )
}


// <Link><p>Docs</p></Link>
// <Link><p>Discord</p></Link>
