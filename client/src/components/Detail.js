import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Link, useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState([]);

  const { id } = useParams("");
  console.log(id);

  const getUser = async (e) => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
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
      setUser(data);
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
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1
        style={{
          fontWeight: "400",
        }}
      >
        WELCOME {user.name}
      </h1>
      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          <div className="add_btn">
            <Link to={`/edit/${user._id}`}>
              <button className="btn btn-primary mx-2">
                <BorderColorIcon />
              </button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteUser(user._id)}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <AccountCircleIcon sx={{ fontSize: 100 }} />
              <h3 className="mt-3">
                Name:{" "}
                <span
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {user.name}
                </span>
              </h3>
              <h3 className="mt-3">
                <EmailIcon />
                Email:{" "}
                <span
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {user.email}
                </span>
              </h3>
              <p>
                <PhoneAndroidIcon className="mr-1" />
                Mobile: <span>{user.mobile}</span>
              </p>
            </div>
            <div className="left_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                Description: <span>{user.description}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
