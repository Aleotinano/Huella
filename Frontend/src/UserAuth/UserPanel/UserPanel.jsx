import { useState, useContext } from "react";
import logincustom from "../logincustom.module.css";
import { AuthContext } from "../../context/AuthContext";

const UserPanel = () => {
  /* const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("User Info:", user);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className={logincustom.LoginContainer}>
      <h2>User Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserPanel;
