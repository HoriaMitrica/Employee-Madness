import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState, useRef } from "react"
const EmployeeTable = ({ employees, onDelete }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const levelRef = useRef();
  const positionRef = useRef();
  function compare(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("name"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("-name"))]) }}>▼</button>
            </th>
            <th>Level
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("level"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("-level"))]) }}>▼</button>
              <select ref={levelRef} onChange={() => {

                if (levelRef.current.value === "Filter by level")
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(employees)
                  else
                    setFilteredEmployees(employees.filter(employee => employee.position === positionRef.current.value))
                else
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(employees.filter(employee => employee.level === levelRef.current.value))
                  else
                    setFilteredEmployees(employees.filter(employee => employee.level === levelRef.current.value && employee.position === positionRef.current.value))

              }}>
                <option>Filter by level</option>
                <option>Junior</option>
                <option>Medior</option>
                <option>Senior</option>
                <option>Expert</option>
                <option>Godlike</option>
              </select>
            </th>
            <th>Position
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("position"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("-position"))]) }}>▼</button>
              <select ref={positionRef} onChange={() => {

                if (levelRef.current.value === "Filter by level")
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(employees) 
                  else
                    setFilteredEmployees(employees.filter(employee => employee.position === positionRef.current.value))
                else
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(employees.filter(employee => employee.level === levelRef.current.value))
                  else
                    setFilteredEmployees(employees.filter(employee => employee.level === levelRef.current.value && employee.position === positionRef.current.value))

              }}>
                <option>Filter by position</option>
                <option>Main Actor</option>
                <option>Comic Relief</option>
                <option>Love Interests</option>
                <option>Protagonist</option>
                <option>Antagonist</option>
                <option>Operatour</option>
                <option>Director</option>
                <option>Joker</option>
                <option>Superhero</option>
              </select>
            </th>
            <th>
              <button onClick={() => { setFilteredEmployees(employees); positionRef.current.value = "Filter by position"; levelRef.current.value = "Filter by level" }}>Clear Filters</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default EmployeeTable;
