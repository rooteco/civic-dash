import { DateTime } from "luxon";

export function convertDateArray(array: Array<any> ): array<any>{
  const newArray = array.forEach(dataObject => dataObject.date = dayStringToDate(dataObject.date))
  return newArray
}


export function dayStringToDate(dayString: string): Date{
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(dayString.match(regEx) === null){
    throw "dayString must be in the format YYYY-MM-DD"
  }
  return DateTime.fromISO(dayString).toJSDate()
}
