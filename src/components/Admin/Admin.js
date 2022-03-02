import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin">
      <div className="admin-page">
        <Link className="text-link" to={"/admin/products"}>
          <h3>Products</h3>
        </Link>
      </div>
      <div className="admin-page">
        <Link className="text-link" to={"/admin/orders"}>
          <h3>Orders</h3>
        </Link>
      </div>
    </div>
  );
}

export default Admin;
