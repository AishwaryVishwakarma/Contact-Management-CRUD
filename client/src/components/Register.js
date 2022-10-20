import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8003/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        description: user.description,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <Link to="/">Home</Link>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={onChangeHandler}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={onChangeHandler}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              onChange={onChangeHandler}
              value={user.mobile}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id=""
              cols="30"
              rows="5"
              value={user.description}
              onChange={onChangeHandler}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={addUser}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
