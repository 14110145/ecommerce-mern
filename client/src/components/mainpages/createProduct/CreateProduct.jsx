import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae aut odit exercitationem! Id, veniam debitis assumenda distinctio eaque vitae possimus beatae, sit, ea deleniti temporibus? Molestiae sint possimus recusandae veniam.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis molestias, aspernatur sunt aliquid, velit, unde incidunt deserunt officia eos sed vitae laudantium explicabo possimus quisquam! Placeat harum nemo inventore assumenda.",
  category: "",
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const styleUpload = { display: images ? "block" : "none" };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("You are not a admin!");
    const file = e.target.files[0];

    if (!file) return alert("Plese select a image!");

    if (file.size > 1024 * 1024) return alert("Image size too large!");

    if (file.type !== "image/jpeg" && file !== "image/png") return alert("Image format is incorrect!");

    let formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const res = await axios.post("/api/upload", formData, {
      headers: { "content-type": "multipart/form-data", Authorization: token },
    });

    setImages(res.data);
    setLoading(false);

    console.log({ res });
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You are not admin!");
      await axios.post("/api/destroy", { public_id: images.public_id }, { headers: { Authorization: token } });
      setImages(false);
    } catch (error) {
      return alert(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form action="">
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
