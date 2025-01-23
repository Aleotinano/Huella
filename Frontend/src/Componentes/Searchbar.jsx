import React, { useState } from "react";

export const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    const bodyText = document.body.innerText.toLowerCase();
    const searchQuery = query.toLowerCase();
    if (bodyText.includes(searchQuery)) {
      alert(`Found "${query}" in the document!`);
    } else {
      alert(`"${query}" not found in the document.`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
