import type { UserType } from "~/routes/dashboard";

type DashboardIntroProps = {
  user: UserType
}

export function DashboardIntro(props: DashboardIntroProps){
  return(
    <div>
      {props.user ? <h3>Welcome to CivicDash, {props.user.name.givenName}</h3> : <h3>Welcome to CivicDash</h3>}
      <p> A community-driven platform for proposing and evaluating solutions to realize Civic Abundance</p>
    </div>
  )
}
