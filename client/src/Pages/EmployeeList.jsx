import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

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

const EmployeeList = ({nameFilter}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [availableEqipments, setAvailableEquipments] = useState([]);
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
.then((equipments)=>setAvailableEquipments([...equipments]))
    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        if(nameFilter!==undefined)
        setData(employees.filter(employee=>employee.name.indexOf(nameFilter)!==-1));
        else
          setData(employees)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable  equipments={availableEqipments} headers={["Employees","Name","Level","Position"]} employees={data} onDelete={handleDelete} />;
};

export default EmployeeList;
