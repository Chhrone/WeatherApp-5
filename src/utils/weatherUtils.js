export function getConditionByTime(condition, hour) {
    const timePeriods = {
      dawn: [4, 6],
      morning: [6, 11],
      noon: [11, 16],
      sunset: [16, 19],
      night: [19, 24],
      lateNight: [0, 4]
    };
  
    function getTimePeriod(hour) {
      for (const [period, [start, end]] of Object.entries(timePeriods)) {
        if (hour >= start && hour < end) return period;
      }
      return 'night'; // Default to night if outside defined ranges
    }
  
    const baseCondition = condition.includes('clear') ? 'clear' :
                          condition.includes('cloudy') ? 'cloudy' :
                          condition.includes('drizzle') ? 'drizzle' :
                          condition.includes('fog') ? 'fog' :
                          condition.includes('mist') ? 'mist' :
                          condition.includes('patchy-cloud-nearby' || 'partly-cloudy') ? 'partly-cloudy' :
                          condition.includes('rain') ? 'rain' :
                          condition.includes('shower') ? 'shower' :
                          condition.includes('snow') ? 'snow' :
                          condition.includes('sunny') ? 'sunny' :
                          condition.includes('thunder') ? 'thunder' :
                          getConditionClass(condition);
  
    const cssClass = `${baseCondition}-${getTimePeriod(hour)}`;
  
    // Log the class name to the console for debugging
    // console.log(`CSS Class Applied: ${cssClass}`);
    // console.log(`Condition: ${condition}, Time Period: ${getTimePeriod(hour)}, CSS Class Applied: ${cssClass}`);
    
    return cssClass;
  }
  