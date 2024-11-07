import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState(""); // State for search text
  const [itemList, setItemList] = useState(items); // State for item list

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchText(event.target.value); // Update search text state
  }

  function handleItemFormSubmit(newItem) {
    setItemList([...itemList, newItem]); // Add new item to item list state
  }

  // Filter items to display based on selected category and search text
  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} /> {/* Pass callback for item submission */}
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={handleSearchChange} 
        search={searchText} // Pass searchText as prop for controlled input
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
