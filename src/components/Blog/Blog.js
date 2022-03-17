import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
  return (
    <div className="blog">
      <h1>THÔNG BÁO</h1>
      <div className="no-blog">
        <p>
          Bạn có thể vào trang admin tại
          <b>
            <Link to={"/admin"}> link </Link>
          </b>
          này.
        </p>
        <p>
          Phiên bản demo này sử dụng server free có tốc độ load lần đầu khá
          chậm, mong quý vị thông cảm.
        </p>
      </div>
    </div>
  );
}

export default Blog;
