interface SingleProps {
  dataset?: Array<any>
}

export default function Single(props: SingleProps){
  return(
  <div className="SingleIndicatorWrapper">
    <div className="SingleIndicatorChart">
      <h1>Single Chart</h1>
    </div>
  </div>
  )
}
