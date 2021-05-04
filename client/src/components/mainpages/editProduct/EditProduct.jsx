import axios from "axios";
import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";

const EditProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState();
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagesDelete, setImagesDelete] = useState([]);
  const [preview, setPreview] = useState([]);

  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [callbackProductAPI, setCallbackProductAPI] = state.productsAPI.callbackProductAPI;

  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      setCallbackProductAPI(!callbackProductAPI);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    }
    // eslint-disable-next-line
  }, [param.id]);
  const styleUpload = { display: Array.isArray(images) ? "inline-block" : "none" };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("You are not a admin!");
    const files = e.target.files;
    const formData = new FormData();
    for (let file of files) {
      if (!file) return alert("Plese select a image!");

      if (file.size > 1024 * 1024) return alert("Image size too large!");

      // if (file.type !== "image/jpeg" && file !== "image/png") return alert("Image format is incorrect!");

      formData.append("image", file);
      images.push(file);
    }
    setImages([...images]);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not admin!");
      if (!images) return alert("No image upload!");
      if (images.length === 0) return alert("Image not yet selected!");
      if (imagesDelete.length !== 0) {
        imagesDelete.map(async (img) => {
          if (!img.public_id) return;
          await axios.post("/api/destroy", { public_id: img.public_id }, { headers: { Authorization: token } });
        });
      }
      const checkImages = images.every((image) => "public_id" in image);
      if (checkImages) {
        await axios.put(`/api/products/${product._id}`, { ...product, images }, { headers: { Authorization: token } });
      } else {
        let formData = new FormData();

        for (let image of images) {
          formData.append("image", image);
        }
        const res = await axios.post("/api/upload", formData, {
          headers: { "content-type": "multipart/form-data", Authorization: token },
        });

        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images: res.data },
          { headers: { Authorization: token } }
        );
      }

      setCallbackProductAPI(!callbackProductAPI);
      history.push("/");
    } catch (error) {
      return alert(error);
    }
  };

  const removeImage = (index) => {
    imagesDelete.push(images[index]);
    setImagesDelete([...imagesDelete]);
    images.splice(index, 1);
    setImages([...images]);
    console.log({ imagesDelete, images });
  };

  if (loading)
    return (
      <div className="create_product">
        <div className="upload">
          <Loading />
        </div>
      </div>
    );

  if (!product) return null;

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
                <img
                  key={index}
                  src={image.url ? image.url : URL.createObjectURL(image)}
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
