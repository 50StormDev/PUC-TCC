export function setDay(day: number){
  if(day > 0 && day < 31){
    return day;
  }else{
    return 0;
  }
}

export function calculateSalary(hourPrice: number, days: number, overtime: number, bonus: number ) {
  let salary = (hourPrice * ((days *  8) + (overtime * 1.25))) + bonus;
  return salary;
}