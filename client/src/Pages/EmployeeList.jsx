import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import ErrorPage from "./ErrorPage";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};
const fetchEquipments = (signal) => {
  return fetch("/api/equipments", { signal }).then((res) => res.json());
};
const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({ nameFilter, shownByYears }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [availableEqipments, setAvailableEquipments] = useState([]);
  const { years } = useParams();
  var reg = /^[+]?\d+([.]\d+)?$/

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchEquipments(controller.signal)
      .then((equipments) => setAvailableEquipments([...equipments]))
    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        if (nameFilter !== undefined)
          setData(employees.filter(employee => employee.name.indexOf(nameFilter) !== -1));
        else{

            setData(employees)
        }

      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);
  console.log(data)
  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable equipments={availableEqipments}
   headers={["Employees", "Name", "Level", "Position"]}
  employees={years!==undefined?(data.filter(employee=>employee.yearsOfExperience===parseInt(years))):data} onDelete={handleDelete}
     />;
};

export default EmployeeList;
