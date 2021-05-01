import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

const Filter = () => {
  const state = useContext(GlobalState);

  const [categories, setCategories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter:</span>
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All products</option>
          {categories.map((category) => {
            return (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
      />

      <div className="row">
        <span>Sort by:</span>
        <select name="category" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
