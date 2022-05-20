export function formatValues(value, format){
  const stringValue = value.toString();
  switch(format){
    case 'percentage':{
      let result = stringValue.concat("%")
      return result
    }
    case 'usd': {
      let commaValue = value.toString().split(".");
      // regex that formats commas
      commaValue[0] = commaValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      let joinedValue = commaValue.join(".")
      let result = "$".concat(joinedValue)
      return result

    }
    default: {
      return value
    }
  }
}
