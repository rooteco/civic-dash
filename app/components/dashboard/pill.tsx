

export function Pill({theme}) {
  return(
    <div key={theme.id}>
        <Link to={`/dashboard/theme/${theme.slug}`}>
        <span> {theme.name} </span>
        </Link>
    </div>
  ) 
}
  