import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

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

  const addCart = async (product) => {
    if (!isLogged) return toast.info("Login before buying!");
    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      );
    } else {
      return toast.info("This product has been added to cart!");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart,
    cart: [cart, setCart],
    history: [history, setHistory],
  };
};

export default UserAPI;
