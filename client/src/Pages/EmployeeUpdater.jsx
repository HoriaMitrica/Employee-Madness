import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee, action) => {
  return fetch(`/api/${action}/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id, action) => {
  return fetch(`/api/${action}/${id}`).then((res) => res.json());
};

const EmployeeUpdater = ({ action }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipments = useLocation().state.equipments
  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id, action)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee, action)
      .then(() => {
        action === "equipments" ? navigate("/equipments")
          : navigate("/")
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <>
      {action === "employees"
        ? <EmployeeForm
          equipments={equipments}
          employee={employee}
          onSave={handleUpdateEmployee}
          disabled={updateLoading}
          onCancel={() => navigate("/")}
        />
        : action === "equipments" ?
          <EquipmentForm
            equipment={employee}
            onSave={handleUpdateEmployee}
            disabled={updateLoading}
            onCancel={() => navigate("/equipments")}
          />
          : null}
    </>
  );
};

export default EmployeeUpdater;
