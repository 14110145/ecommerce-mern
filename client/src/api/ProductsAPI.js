import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsAPI = (token) => {
  const [products, setProducts] = useState([]);
  const [callbackProductAPI, setCallbackProductAPI] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    console.log("Run effect ProductAPI");
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`);
      console.log({ res });
      setProducts(res.data.products);
      setResult(res.data.result);
    };

    getProducts();
  }, [callbackProductAPI, category, sort, search, page]);

  const updateProducts = async (product, token) => {
    await axios.put(`/api/products/${product._id}`, product, { headers: { Authorization: token } });
  };

  const deleteProducts = async (id, images) => {
    try {
      for (let image of images) {
        await axios.post("/api/destroy", { public_id: image.public_id }, { headers: { Authorization: token } });
      }
      const res = await axios.delete(`/api/products/${id}`, { headers: { Authorization: token } });
      if (res.status === 200) {
        toast.success("Successfully Deleted!");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  return {
    products: [products, setProducts],
    updateProducts,
    deleteProducts,
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    callbackProductAPI: [callbackProductAPI, setCallbackProductAPI],
  };
};

export default ProductsAPI;
