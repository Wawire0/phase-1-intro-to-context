// Create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create employee records from an array of arrays
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Create a time-in event for an employee
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  // Create a time-out event for an employee
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate all wages earned by an employee
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Find an employee by first name in an array of employee records
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // Calculate the payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
