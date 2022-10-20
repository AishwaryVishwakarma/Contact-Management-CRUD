import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = React.useState([]);
  console.log(users);

  const getUser = async (e) => {
    const res = await fetch("http://localhost:8003/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("No data found");
    } else {
      setUsers(data);
      console.log("get data");
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("No data found");
    } else {
      window.alert("User deleted successfully");
      getUser();
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <Link to="/register" className="btn btn-primary">
              Add User
            </Link>
          </div>
          <table className="table mt-2">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No.</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th scope="row">
                        {user._id.slice(0, 3) + "..." + user._id.slice(21, 24)}
                      </th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <Link to={`view/${user._id}`}>
                          <button className="btn btn-success">
                            <VisibilityIcon />
                          </button>
                        </Link>
                        <Link to={`edit/${user._id}`}>
                          <button className="btn btn-primary">
                            <BorderColorIcon />
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
