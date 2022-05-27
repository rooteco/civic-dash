import { useState, useEffect} from 'react';
import { useParams } from "@remix-run/react";
import { Interweave } from 'interweave';
import { deslugify } from '~/utils/deslugify'


export function ThemeIntro(props){
  const params = useParams();
  const [themeDescription, setThemeDescription] = useState("")

  useEffect(()=>{
    setThemeDescription(props.themeDescription)
  }, [props])

  return(
    <>
      <div className="flex-row"/>
      <div className="spacer-unit"/>
      <div>
        <h3 className="textshadow-light">
          {params ? deslugify(params.theme) : ""}
        </h3>
        <Interweave
          content={themeDescription}
        />
        </div>
    </>
  )
}
