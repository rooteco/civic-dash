export function exitIndicator(params): String{
  const theme = params.theme
  const problem = params.problem
  
  if(theme && problem){
    return `/dashboard/theme/${theme}/problem/${problem}`
  }
  else if(theme){
    return `/dashboard/theme/${theme}`
  }
  return `/dashboard`
}
