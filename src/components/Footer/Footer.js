import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-container-content">
          <h1>LIÊN HỆ</h1>
          <p>Hotline: 0347145232</p>
          <p>Email: ngocthien.dnt@gmail.com</p>
          <p>Address: 000, district 1, Ho Chi Minh city</p>
        </div>

        <div className="footer-container-content">
          <h1>CHÍNH SÁCH</h1>
          <p>
            <a>Chính sách bảo hành</a>
          </p>
          <p>
            <a>Chính sách đổi trả</a>
          </p>
          <p>
            <a>Phương thức thanh toán</a>
          </p>
        </div>
      </div>

      <p className="footer-copyright">
        Copyright © 2022 <a>ThienDinhStudio</a>
      </p>
    </div>
  );
}

export default Footer;
