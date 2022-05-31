import { useState, useEffect} from 'react';
import { useParams } from "@remix-run/react";
import { deslugify } from '~/utils/deslugify'
import { Interweave } from 'interweave';

export function ProblemIntro(props){
  const params = useParams();
  const [problemDescription, setProblemDescription] = useState("")

  useEffect(()=>{
    if(props.problemDescription){
      setProblemDescription(props.problemDescription)
    }
  }, [props])

  return(
    <>
      <div className="flex-row"/>
      <div className="spacer-unit"/>
      <div>
        <h3 className="textshadow-light">
          {params ? deslugify(params.problem) : ""}
        </h3>
        <Interweave
          content={problemDescription ? problemDescription : "<p>Detailed problem descriptions are coming soon!</p>"}
        />
      </div>
    </>
  )
}
