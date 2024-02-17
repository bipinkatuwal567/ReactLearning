import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
    const navigate = useNavigate();

  const [query, setQuery] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    navigate(`order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order #"
      />
    </form>
  );
}
