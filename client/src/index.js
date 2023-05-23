import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EquipmentList from "./Pages/EquipmentList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator action={"employees"}/>,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater action={"employees"}/>,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/robert",
        element: <EmployeeList nameFilter={"Robert"}/>,
      },
      {
        path: "/create/equipment",
        element: <EmployeeCreator action={"equipments"}/>,
      },

      {
        path: "/equipments",
        element: <EquipmentList/>,
      },
      {
        path: "/equipment/update/:id",
        element: <EmployeeUpdater action={"equipments"}/>,
      },
      {
        path: "/years-of-experience/:years",
        element: <EmployeeList/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
