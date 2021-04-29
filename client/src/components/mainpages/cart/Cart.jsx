import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import PaypalButton from "./PaypalButton";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  const updateProducts = state.productsAPI.updateProducts;
  const [callback, setCallback] = state.userAPI.callback;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch("/user/addcart", { cart }, { headers: { Authorization: token } });
    setCart([...cart]);
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity !== 1) {
          item.quantity -= 1;
        }
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    }

    setCart([...cart]);
    addToCart(cart);
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      {
        cart,
        paymentID,
        address,
      },
      { headers: { Authorization: token } }
    );

    cart.forEach(async (item) => {
      item.sold += item.quantity;
      await updateProducts(item, token);
    });

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order!");
    setCallback(!callback);
  };

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "5rem", textTransform: "uppercase" }}>cart empty</h2>;

  return (
    <div>
      {cart.map((product) => {
        return (
          <div className="detail cart" key={product.product_id}>
            <img src={product.images.url} alt="" />
            <div className="box-detail">
              <h2>{product.title}</h2>

              <span>$ {product.price * product.quantity}</span>
              <p>{product.description}</p>
              <p>{product.content}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}>+</button>
              </div>
              <div className="delete" onClick={() => removeProduct(product._id)}>
                X
              </div>
            </div>
          </div>
        );
      })}
      <div className="total">
        <h3>Total: ${total}</h3>
        <PaypalButton total={total} transuccess={tranSuccess} />
      </div>
    </div>
  );
};

export default Cart;
