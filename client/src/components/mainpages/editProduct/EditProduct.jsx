import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";

const EditProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const param = useParams();

  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;

  useEffect(() => {
    setCallbackProductAPI(!callbackProductAPI);
    if (param.id) {
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
        }
      });
    }

    // eslint-disable-next-line
  }, [param.id]);

  // const styleUpload = { display: product.images.length > 0 ? "inline-block" : "none" };

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    for (let file of files) {
      if (!file) return toast.error("Plese select a image!");

      if (file.size > 1024 * 1024) return toast.error("Image size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png") return toast.error("Image format is incorrect!");
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        product.images.push({
          filename: `${file.name.substr(0, file.name.indexOf("."))}-${Date.now()}.${file.type.substr(
            file.type.lastIndexOf("/") + 1
          )}`,
          contentType: file.type,
          imagesBase64: e.target.result.substr(e.target.result.indexOf(",") + 1),
        });
        setProduct({ ...product });
      };
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: token,
      },
    });
    if (res.status === 200) {
      toast.success("Edit product successfully!");
      history.push("/");
    }
  };
  const removeImage = (index) => {
    product.images.splice(index, 1);
    setProduct({ ...product });
  };

  if (loading)
    return (
      <div className="create_product">
        <Loading />
      </div>
    );

  if (!product) return null;
  console.log(product.images.length);
  return (
    <div className="create_product">
      <div className="upload">
        {product.images.length === 0 ? (
          <input type="file" name="file" id="file_up" onChange={handleUpload} multiple accept="image/*" />
        ) : null}

        {product.images.length > 0 &&
          product.images.map((image, index) => {
            return (
              <div
                className="file_img"
                style={{ display: product.images.length > 0 ? "inline-block" : "none" }}
                key={index}
              >
                <img
                  key={index}
                  src={`data:${image.contentType};base64,${image.imagesBase64}`}
                  alt=""
                  style={{ display: "inline" }}
                />
                <span onClick={() => removeImage(index)}>X</span>
              </div>
            );
          })}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">ProductID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={true}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows={5}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows={7}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select name="category" value={product.category} onChange={handleChangeInput}>
            <option value="">Please select a category</option>
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
