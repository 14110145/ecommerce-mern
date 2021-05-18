import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { toast } from "react-toastify";

const initialState = {
  product_id: "123123",
  title: "23123",
  price: 99,
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae aut odit exercitationem! Id, veniam debitis assumenda distinctio eaque vitae possimus beatae, sit, ea deleniti temporibus? Molestiae sint possimus recusandae veniam.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis molestias, aspernatur sunt aliquid, velit, unde incidunt deserunt officia eos sed vitae laudantium explicabo possimus quisquam! Placeat harum nemo inventore assumenda.",
  category: "",
  _id: "#232",
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;

  const history = useHistory();

  const styleUpload = { display: Array.isArray(images) ? "inline-block" : "none" };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("You are not a admin!");
    const files = e.target.files;
    for (let file of files) {
      if (!file) return toast.error("Plese select a image!");

      if (file.size > 1024 * 1024) return toast.error("Image size too large!");
      console.log(file);
      if (file.type !== "image/jpeg" && file.type !== "image/png") return toast.error("Image format is incorrect!");
    }

    setImages([...files]);
  };

  const removeImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.error("You are not admin!");
      if (!images) return toast.error("No image upload!");
      if (!product.category) return toast.error("Category not selected!");

      setLoading(true);
      let formData = new FormData();
      formData.append("product_id", product.product_id);
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("content", product.content);
      for (let image of images) {
        formData.append("images", image);
      }

      const res = await axios.post("/api/products", formData, {
        headers: { "content-type": "multipart/form-data", Authorization: token },
      });
      if (res.status === 201) {
        toast.success("Created a Product!");
      }
      setLoading(false);

      setImages(false);
      setProduct(initialState);
      setCallbackProductAPI(!callbackProductAPI);
      history.push("/");
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };
  if (loading)
    return (
      <div className="create_product">
        <Loading />
      </div>
    );

  return (
    <div className="create_product">
      <div className="upload">
        {!Array.isArray(images) ? (
          <input type="file" name="file" id="file_up" onChange={handleUpload} multiple accept="image/*" />
        ) : images.length === 0 ? (
          <input type="file" name="file" id="file_up" onChange={handleUpload} multiple accept="image/*" />
        ) : null}

        {Array.isArray(images) &&
          images.map((image, index) => {
            return (
              <div className="file_img" style={styleUpload} key={index}>
                <img key={index} src={URL.createObjectURL(image)} alt="" style={{ display: "inline" }} />
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
