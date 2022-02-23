import "./Contact.css";

import Map from "react-map-gl";
import ReactMapGL from "react-map-gl";

const Contact = () => {
  const state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16,
    },
  };
  return (
    <div className="contact">
      <h1>CỬA HÀNG PIANO THIỆN ĐINH STUDIO</h1>
      <p>Địa chỉ 1: 000, quận 1, TP.HCM </p>
      <p>Hotline: 0123456789</p>
      <p>Địa chỉ 2: 000, quận 3, TP.HCM </p>
      <p>Hotline: 987654321</p>
      <p>Email: ngocthien.dnt@gmail.com</p>
      <div className="contact-map">
        <Map
          initialViewState={{
            width: "1000vw",
            height: "1000vh",
            latitude: 10.786366,
            longitude: 106.668555,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoiZG5nb2N0aGllbiIsImEiOiJja3p6bnJuY3cwYzRjM2NzNHVtaGo0dHFyIn0.I4hUBcOjsfbVyhXPu_ZkOQ"
        />
        ;
      </div>
    </div>
  );
};

export default Contact;
