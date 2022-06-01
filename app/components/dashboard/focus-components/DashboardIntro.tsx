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
      </div>
      <div className="spacer-unit"/>
      <div>
        <h3 className="textshadow-light">
          Welcome to CivicDash<strong>{props.user ? `, ${props.user.name.givenName}` : ""} </strong>
        </h3>
        <p> A community-driven platform for proposing and evaluating solutions to realize Civic Abundance</p>

      </div>
    </>
  )
}

//   <p>Welcome to CivicDash. We’re a small team building infrastructure to track social metrics in San Francisco. We believe that effective change requires data-driven decision-making, and our goal is to make that data as accessible and interactive as possible. To support this, we’ve tried to create an intuitive interface that organises important social indicators into themes and problems.</p>
  // <p>We also set out to build a dashboard that expresses your beliefs about San Francisco as well as our own, and to accomplish that, we’ve integrated prediction markets. Prediction markets aggregate belief about events using a toy economic system. They’re phrased as questions: *Which of these solutions is most likely to increase available housing in San Francisco in the immediate future? Will the number of homeless people in San Francisco rise by more than 10% in the next year? Would loosened zoning regulations meaningfully support abundant housing?* They might seem complicated at first, but you can just think of them as fancy polls with better incentives.</p>
  // <p>CivicDash is a constantly evolving project that’s just getting started. For version one, we’ve chosen themes, problems and indicators that seem particularly relevant for San Francisco given our research and experience, but the current dashboard is far from finished, and we want to hear from you about everything that we can improve. Join our discord here, and let us know what you think!</p>

// Old logos
// <img src={seal} alt="seal" className="icon"/>
// <img src={rootelogo} alt="roote logo" className="icon" style= {{mixBlendMode: "multiply", borderRadius: "100px"}}/>
