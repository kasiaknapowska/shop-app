import "./_Home.scss";
import { useState, useEffect } from "react";
import { getCategories } from "../../API/fetch";
import Select from "../../components/Select/Select";
import Products from "../../components/Products/Products";

export default function Home() {
  const [category, setCategory] = useState("all categories");
  const [allCategories, setAllCategories] = useState([]);


  useEffect(() => {
    getCategories((data) => {
      setAllCategories(["all categories", ...data]);
    });
  }, []);


  return (
    <>
      <main className="container home">
        <div className="center home_select">
          <Select
            option={category}
            dropDownOptions={allCategories}
            successcallback={setCategory}
            inputSize={{ width: "13rem" }}
            arrowPosition={{ left: "10.5rem", top: ".5rem" }}
          />
        </div>
        <Products category={category} />
      </main>
    </>
  );
}
