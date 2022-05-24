import type { UserType } from "~/routes/dashboard";
import rootelogo from "../../../../public/assets/roote.png";
import seal from "../../../../public/assets/seal.png";

type DashboardIntroProps = {
  user: UserType
}

export function DashboardIntro(props: DashboardIntroProps){
  return(
    <>
      <div className="flex-row">
        <img src={seal} alt="seal" className="icon"/>
        <img src={rootelogo} alt="roote logo" className="icon" style= {{mixBlendMode: "multiply", borderRadius: "100px"}}/>
      </div>
      <div className="spacer-lg"/>
      <div>
        {props.user ? <h3 className="textshadow-light">Welcome to CivicDash, {props.user.name.givenName}</h3> : <h3>Welcome to CivicDash</h3>}
        <p> A community-driven platform for proposing and evaluating solutions to realize Civic Abundance</p>
      </div>
    </>
  )
}
