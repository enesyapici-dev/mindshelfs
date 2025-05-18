import React from "react";

const Searchbar = ({ event, placeholder }) => {
  return (
    <div>
      <form onSubmit={event}>
        <input type="text" placeholder={placeholder} className="search-input" />
      </form>
    </div>
  );
};

export default Searchbar;
