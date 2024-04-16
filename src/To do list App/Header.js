import React from "react";

const Header = ({ Title }) => {
  /* Inline CSS */
  // let property = { backgroundColor: "Blue",  display:"grid"};
  return (
    // <div>Header</div>
    // <div style={property}>
    <main >
      <h1>{Title}</h1>
    </main>
  );
};
Header.defaultProps = { Title: "Welcome to do list App" };

export default Header;
