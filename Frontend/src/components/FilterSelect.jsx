import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const FilterSelect = ({ setFilterList, products, categories }) => {
  const options = categories.map((cat) => ({
    value: cat.id || cat.name,
    label: cat.name ? cat.name.charAt(0).toUpperCase() + cat.name.slice(1) : "",
  }));

  const handleChange = (selectedOption) => {
    if (!selectedOption) {
      setFilterList(products);
      return;
    }

    const value = selectedOption.value.toString().toLowerCase();

    const filtered = products.filter((item) => {
      // Case 1: category is a string
      if (typeof item.category === "string") {
        return item.category.toLowerCase() === value;
      }
      // Case 2: category is an object
      if (typeof item.category === "object" && item.category !== null) {
        return (
          item.category.name?.toLowerCase() === value ||
          item.category.id?.toString() === value
        );
      }
      // Case 3: category is an id
      if (typeof item.category === "number") {
        return item.category.toString() === value;
      }
      return false;
    });

    setFilterList(filtered);
  };

  return (
    <Select
      options={options}
      isClearable
      placeholder="Filter By Category"
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
