import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow border-0 p-5 text-center">
          <h1 className="display-5 fw-bold">Employee Management Dashboard</h1>

          <p className="lead mt-3">Spring Boot + React Secure Application</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;