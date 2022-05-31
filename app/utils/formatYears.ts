export function formatYears(yearString){
  if(yearString){
    const re = /[0-9]{4}-01-01/
    if(yearString.match(re)){
      return yearString.slice(0, 4)
    }
    else{
      return yearString
    }}
  return yearString

}
