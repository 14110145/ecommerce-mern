import axios from "axios";
import { useEffect, useState } from "react";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          if (res.status === 200) {
            setIsLogged(true);
            if (res.data.user.role === 1) setIsAdmin(true);
            setCart(res.data.user.cart);
          }
        } catch (error) {
          alert(error.message);
        }
      };

      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", { headers: { Authorization: token } });
          setHistory(res.data.payment);
        } else {
          const res = await axios.get("/user/history", { headers: { Authorization: token } });
          setHistory(res.data.history);
        }
      };

      getHistory();
    }
  }, [token, callback, isAdmin]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying!");
    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      );
    } else {
      alert("This product has been added to cart!");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart],
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
