import { useState, useEffect } from "react";
import getStocksList from "../../api/getStocksList";
const SearchStocks = ({ setSymbol }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [stocksList, setStocksList] = useState([]);

  const loadStocksList = async () => {
    try {
      const result = await getStocksList();
      console.log(
        "result",
        result.map((element) => element.symbol)
      );
      setStocksList(result.map((element) => element.symbol));
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const handleSearchChange = (event) => {
    event.stopPropagation();
    setIsFocused(true);
    setQuery(event.target.value);
  };

  const handleItemClick = (event) => {
    const item = event.target.getAttribute("data-item");

    setQuery(item);
    setSymbol(item);
    setTimeout(() => setIsFocused(false), 100);
  };
  const handleBlur = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const filteredItems = query
    ? stocksList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    loadStocksList();
  }, []);
  return (
    <div className="search-container" onBlur={handleBlur} tabIndex="0">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && query && (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} data-item={item} onClick={handleItemClick}>
                {item}
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchStocks;
