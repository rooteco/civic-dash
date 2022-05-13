interface DoubleProps {
  dataset?: Array<any>
}

export default function Double(props: DoubleProps){
  return(
    <div className="DoubleIndicatorWrapper">
      <div className="DoubleIndicatorChart">
        <h1>Double Chart (1)</h1>
      </div>
      <div className="DoubleIndicatorChart">
        <h1>Double Chart (2)</h1>
      </div>
    </div>
  )
}
