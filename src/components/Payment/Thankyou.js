import { Link } from "react-router-dom";
import "./Payment.css";

function Thankyou() {
  return (
    <div className="thankyou">
      <h1>CẢM ƠN !</h1>
      <h3>Đã tin tưởng và lựa chọn sản phẩm của chúng tôi</h3>
      <p>
        Chúc bạn nhiều sức khoẻ, và có những phút giây thư giãn tuyệt vời cùng
        sản phẩm của chúng tôi
      </p>
      <Link to={"/products"}>
        <button>QUAY LẠI TRANG SẢN PHẨM</button>
      </Link>
    </div>
  );
}

export default Thankyou;
