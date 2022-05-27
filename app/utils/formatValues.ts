function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}


export function formatValues(value, format){

  switch(format){
    case 'percentage':{
      let tempValue = toFixed(value, 2)
      const stringValue = tempValue.toString();
      let result = stringValue.concat("%")
      return result
    }
    case 'usd': {
      if(value){
        let commaValue = value.toString().split(".");
        // regex that formats commas
        commaValue[0] = commaValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let joinedValue = commaValue.join(".")
        let result = "$".concat(joinedValue)
        return result
      }
      else{
        return "Undefined"
      }
    }

    case 'wholeNumber': {
      let commaValue = value.toString().split(".");
      commaValue[0] = commaValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      let joinedValue = commaValue.join(".")
      return joinedValue
    }

    default: {
      return toFixed(value, 3)
    }
  }
}
