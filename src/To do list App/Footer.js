import React from "react";

const Footer = ({ length }) => {
  // Length is a prop
  return (
    <footer >
      {length} List {length === 1 ? "item" : "items"}
    </footer>
  ); /* Inside curly braces the method is a Javascript expression */
};

export default Footer;
