const getAllProducts = (successCalback) => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      successCalback(data);
    })
    .catch((err) => console.log(err));
};

const getCategories = (successCalback) => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      successCalback(data);
    })
    .catch((err) => console.log(err));
};

const getProductsInCategory = (category, successCalback) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      successCalback(data);
    })
    .catch((err) => console.log(err));
};

export { getAllProducts, getCategories, getProductsInCategory };
