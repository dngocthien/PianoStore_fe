import { useState } from "react";
import { useParams } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [current, setCurrent] = useState("");
  const { qr } = useParams();
  // if (qr != current) {
  //   setCart([...qr]);
  //   setCurrent(qr);
  // }
  return <div>Products: {qr}</div>;
}

export default Cart;
