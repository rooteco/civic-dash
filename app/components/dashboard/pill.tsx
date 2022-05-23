import { Link } from "@remix-run/react";


// TODO: for either theme or problem 0xs

export function Pill({theme, active}) {

  if (active) {
    return (
      <div className="pill pill-active">
        <Link to={`/dashboard/theme/${theme.slug}`}>
          <span> {theme.name} </span>
        </Link>
      </div>
    );
  }

  return(
    <div className = "pill" >
        <Link to={`/dashboard/theme/${theme.slug}`}>
          <span> {theme.name} </span>
        </Link>
    </div>
  ) 
}
  