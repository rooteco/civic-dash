import React, { useState, useEffect } from 'react';
import { Link, Form } from '@remix-run/react';
import { SocialsProvider } from "remix-auth-socials";
import type { User } from "~/routes/dashboard"
import Snackbar from "@mui/material/Snackbar"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "@remix-run/react";




interface WrapperProps {
  error: Object | undefined;
  user: User;
  focusChild: React.ReactNode;
  linkChild: React.ReactNode;
  themeCarouselChild: React.ReactNode;
  predictionChild?: React.ReactNode;
}

export const TableOpenContext: Boolean = React.createContext(false)

export function DashboardWrapper(props: WrapperProps) {
  const [tableOpen, setTableOpen] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    typeof props.error !== 'undefined' ? setSnackbarOpen(true) : setSnackbarOpen(false)
  }, [props.error])

  const params = useParams();
  const [dashStyle, setDashStyle] = useState({})

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setDashStyle({})
    } else {
      setDashStyle({
        'opacity': 1
      })
    }
  }, [params])

  useEffect(()=>{
    console.log("PARAMS", params)
  }, [params])


  const now = new Date()

  let dateOptions = { weekday: 'short', month: 'long', day: 'numeric' };
  let timeOptions = { hour: 'numeric', minute: 'numeric' };

  const currentDate = now.toLocaleDateString('en-US', dateOptions);
  const currentTime = now.toLocaleTimeString('en-US', timeOptions);

  return (
    <div className="min-h-screen flex">
      <TableOpenContext.Provider value={[tableOpen, setTableOpen]}>

        <div className="dashgrid">

          <div className="flex-column focus border-gradient border-gradient-white"
            style={{justifyContent: params.hasOwnProperty('indicator') ? "center" : "flex-end"}}>
            {props.focusChild}
          </div>
          <div className="header flex-space-between">
            <div className="flex-row p-soft">
              <p>{currentDate}</p>
              <div className="icon-xs" />
              <p>{currentTime}</p>
            </div>

            {props.user &&
              <Form
                method="post"
                action="/logout"
              >
                <button style={{ color: "gray" }}><a className='p-soft'>Logout</a></button>
              </Form>
            }
            {!props.user &&
              <Form
                method="post"
                action={`/auth/${SocialsProvider.GOOGLE}`}
              >
                <button style={{ color: "gray" }}><a className='p-soft'>Login or sign up</a></button>
              </Form>
            }
          </div>

          <div className="dash" style={dashStyle}>
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
          <div className="axis" />
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          message="Please log in or sign up to favourite indicators"
          onClose={() => setSnackbarOpen(false)}
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
                onClick={() => setSnackbarOpen(false)}
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
