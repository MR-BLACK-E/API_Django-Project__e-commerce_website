import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ setFilterList, products }) => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchWord(keyword);

    if (keyword.trim() === "") {
      setFilterList(products);
    } else {
      setFilterList(
        products.filter(
          (item) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.description?.toLowerCase().includes(keyword)
        )
      );
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchWord}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;


// import { useState } from "react";
// import "./searchbar.css";
// import { products } from "../../utils/products";
// // import useDebounce from "../../hooks/useDebounce";
// const SearchBar = ({ setFilterList }) => {
//   const [searchWord, setSearchWord] = useState(null);
//   // const debounceSearchWord = useDebounce(searchWord, 300);
//   const handelChange = (input) => {
//     setSearchWord(input.target.value);
//     setFilterList(
//       products.filter((item) =>
//         item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
//       )
//     );
//   };
//   return (
//     <div className="search-container">
//       <input type="text" placeholder="Search..." onChange={handelChange} />
//       <ion-icon name="search-outline" className="search-icon"></ion-icon>
//     </div>
//   );
// };

// export default SearchBar;
