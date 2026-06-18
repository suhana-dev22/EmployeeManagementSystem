import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  // Fetch All Employees
  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");

      setEmployees(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed To Fetch Employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Employee
  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", formData);

      fetchEmployees();

      resetForm();

      alert("Employee Added Successfully");
    } catch (error) {
      alert("Failed To Add Employee");
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);

      fetchEmployees();

      alert("Employee Deleted");
    } catch (error) {
      alert("Delete Failed");
    }
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    });
  };

  // Update Employee
  const updateEmployee = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/employees/${editingId}`, formData);

      fetchEmployees();

      resetForm();

      setEditingId(null);

      alert("Employee Updated Successfully");
    } catch (error) {
      alert("Update Failed");
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);

    resetForm();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h3 className="mb-4">
                  {editingId ? "Update Employee" : "Add Employee"}
                </h3>

                <form onSubmit={editingId ? updateEmployee : addEmployee}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button className="btn btn-primary w-100">
                    {editingId ? "Update Employee" : "Add Employee"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h3 className="mb-4">Employee List</h3>

                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>{employee.salary}</td>

                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editEmployee(employee)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteEmployee(employee.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;