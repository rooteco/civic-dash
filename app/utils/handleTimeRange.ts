export function handleTimeRange(data, timeRange){
  switch(timeRange){
    case 'month': {
      let endDate = new Date();
      let endTime = endDate.getTime();
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth()-1);
      let startTime = startDate.getTime();
      let filteredData = data.filter(d => new Date(d.x).getTime() >= startTime);
      return filteredData
    }

    case 'year': {
      let endDate = new Date();
      let endTime = endDate.getTime();
      let startDate = new Date();
      startDate.setFullYear(startDate.getFullYear()-1);
      let startTime = startDate.getTime();
      let filteredData = data.filter(d => new Date(d.x).getTime() >= startTime);
      return filteredData
    }

    case 'five-years': {
      let endDate = new Date();
      let endTime = endDate.getTime();
      let startDate = new Date();
      startDate.setFullYear(startDate.getFullYear()-5);
      let startTime = startDate.getTime();
      let filteredData = data.filter(d => new Date(d.x).getTime() >= startTime);
      return filteredData
    }

    case 'full': {
      return data
    }
  }
}
