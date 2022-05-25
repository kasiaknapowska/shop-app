import { useState, useEffect } from "react";
import { getAllProducts, getProductsInCategory } from "../../API/fetch";
import Product from "../Product/Product";
import "./_Products.scss";
import {useLocalStorage} from "../../hooks/useWindowStorage";
import Loading from "../Loading/Loading";

export default function Products({ category }) {
  const [products, setProducts] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (category === "all categories") {
      getAllProducts((data) => {
        setProducts(data);
        setIsLoading(false);
      });
    } else {
      getProductsInCategory(category, (data) => {
        setProducts(data);
        setIsLoading(false);
      });
    }
  }, [category]);

  const toggleFavorite = (id, image, title, description, price, category) => {
    const newFavorite = {
      id: id,
      image: image,
      title: title,
      description: description,
      price: price,
      category: category,
    };
    const exist = favorites.find((el) => el.id === id);
    if (exist) {
      setFavorites((prevState) => [...prevState].filter((el) => el.id !== id));
    } else {
      setFavorites((prevState) => [...prevState, newFavorite]);
    }
  };

  return (
    <>
      <section>
        <h1>{category}</h1>
        <span className="products_quantity">
          ( {products && products.length} products )
        </span>
        {isLoading && <Loading text="LOADING"/>}
        <div className="container products_container">
          {products &&
            products.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h1 id="favorites">Favorites</h1>
        <div className="container products_container">
          {favorites.length > 0 ? (
            favorites.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              );
            })
          ) : (
            <p>Nothing is here</p>
          )}
        </div>
      </section>
    </>
  );
}
