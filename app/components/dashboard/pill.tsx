import { Link } from "@remix-run/react";


// content is type Theme or type Problem



// TODO: for either theme or problem 0xs :: content in place of theme

export default function Pill({theme, active = false}) {

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
  