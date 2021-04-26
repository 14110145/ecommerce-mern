import axios from "axios";
import { useEffect, useState } from "react";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

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
          }
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying!");
    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product has been added to cart!");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
  };
};

export default UserAPI;
