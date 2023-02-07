import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import EquipmentForm from "../Components/EquipmentForm";

const createEmployee = (employee,action) => {
  return fetch(`/api/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = ({ action }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee,action)
      .then(() => {
        action==="equipments"?navigate("/equipments")
        :navigate("/")
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {action === "employees"
        ? <EmployeeForm
          onCancel={() => navigate("/")}
          disabled={loading}
          onSave={handleCreateEmployee}
        />
        : action === "equipments"
          ? <EquipmentForm
            onCancel={() => navigate("/equipments")}
            disabled={loading}
            onSave={handleCreateEmployee}
          />
          : null}

    </>
  );
};

export default EmployeeCreator;
