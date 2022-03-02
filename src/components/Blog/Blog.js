import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
  return (
    <div className="blog">
      <h1>THÔNG BÁO</h1>
      <p className="no-blog">
        Bạn có thể vào trang admin tại
        <b>
          <Link to={"/admin"}> link </Link>
        </b>
        này
      </p>
    </div>
  );
}

export default Blog;
