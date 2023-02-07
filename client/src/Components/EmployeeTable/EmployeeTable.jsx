import { Link,useNavigate } from "react-router-dom";
import "./EmployeeTable.css";
import { useState, useRef } from "react"
const EmployeeTable = ({ headers, employees, onDelete,equipments }) => {
  console.log(equipments)
  const navigate=useNavigate();
  let maxPages = Math.ceil(employees.length / 10)
  const [page, setPage] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState(employees.slice((page - 1) * 10, page * 10));
  let pageEmployees = [...employees.slice((page - 1) * 10, page * 10)]
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

            <th>{headers[1]}
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("name"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(compare("-name"))]) }}>▼</button>
            </th>
            <th>{headers[2]}
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(employees[0].level?compare("level"):compare("type"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(employees[0].level?compare("-level"):compare("-type"))]) }}>▼</button>
              {headers[0] === "Employees" ? <><select ref={levelRef} onChange={() => {

                if (levelRef.current.value === "Filter by level")
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(pageEmployees)
                  else
                    setFilteredEmployees(pageEmployees.filter(employee => employee.position === positionRef.current.value))
                else
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(pageEmployees.filter(employee => employee.level === levelRef.current.value))
                  else
                    setFilteredEmployees(pageEmployees.filter(employee => employee.level === levelRef.current.value && employee.position === positionRef.current.value))

              }}>
                <option>Filter by level</option>
                <option>Junior</option>
                <option>Medior</option>
                <option>Senior</option>
                <option>Expert</option>
                <option>Godlike</option>
              </select></>
                : null}
            </th>
            <th>{headers[3]}
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(employees[0].position?compare("position"):compare("amount"))]); }}>▲</button>
              <button onClick={() => { setFilteredEmployees([...filteredEmployees.sort(employees[0].position?compare("-position"):compare("-amount"))]) }}>▼</button>
              {headers[0] === "Employees" ? <><select ref={positionRef} onChange={() => {

                if (levelRef.current.value === "Filter by level")
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(pageEmployees)
                  else
                    setFilteredEmployees(pageEmployees.filter(employee => employee.position === positionRef.current.value))
                else
                  if (positionRef.current.value === "Filter by position")
                    setFilteredEmployees(pageEmployees.filter(employee => employee.level === levelRef.current.value))
                  else
                    setFilteredEmployees(pageEmployees.filter(employee => employee.level === levelRef.current.value && employee.position === positionRef.current.value))

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
              </select></>
                : null}
            </th>
            <th>
              <button onClick={() => { setFilteredEmployees(employees.slice((page - 2) * 10, (page - 1) * 10)); setPage(page - 1) }} disabled={page === 1}>◀</button>
              Page {page}/{maxPages}
              <button onClick={() => { ; setFilteredEmployees(employees.slice(page * 10, (page + 1) * 10)); setPage(page + 1) }} disabled={page === maxPages}>▶</button>
              <button onClick={() => { setFilteredEmployees(pageEmployees); positionRef.current.value = "Filter by position"; levelRef.current.value = "Filter by level" }}>Clear Filters</button>
            </th>

          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level?employee.level:employee.type}</td>
              <td>{employee.position?employee.position:employee.amount}</td>
              <td>
                <Link  to={headers[0] === "Employees"?{pathname:`/update/${employee._id}`,state:{equipments:equipments}}:`/equipment/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={()=>{navigate(`/update/${employee._id}`,{state:{equipments:equipments}})}}>Update navigate</button>
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
