import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
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

  const updateUser = async (e) => {
    e.preventDefault();
    const res2 = await fetch(`http://localhost:8003/updateuser/${id}`, {
      method: "PATCH",
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
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      window.alert("Invalid Update");
      console.log("Invalid Update");
    } else {
      window.alert("Update Successful");
      console.log("Update Successful");
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <Link to="/">Back</Link>
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateUser}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
