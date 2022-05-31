/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup
} from "contexts/cart";
import { CommonDispatchContext, setSearchKeyword } from "contexts/common";
import CartPreview from "components/CartPreview";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Header = (props) => {
  const [value,setValue]=useState('');

  const { items: cartItems } = useContext(CartStateContext);
  const commonDispatch = useContext(CommonDispatchContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);
  const [categories, setCategories] = useState([]);
  const handleSearchInput = (event) => {
    return setSearchKeyword(commonDispatch, event.target.value);
  };


  useEffect(() => {
    const url = "https://fakestoreapi.com/products/categories";
    axios.get(url).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCartButton = (event) => {
    event.preventDefault();
    return toggleCartPopup(cartDispatch);
  };

  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }

  return (
    <header>
      <div className="container">
        <div className="brand">
          <Link to="/">
            <h1> Home</h1>
          </Link>
        </div>

        <div className="search">
          <a
            className="mobile-search"
            href="#"
            // onClick={this.handleMobileSearch.bind(this)}
          >
            <img
              src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
              alt="search"
            />
          </a>
          <form action="#" method="get" className="search-form">
            <a
              className="back-button"
              href="#"
              // onClick={this.handleSearchNav.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                alt="back"
              />
            </a>
            <input
              type="search"
              placeholder="Search"
              className="search-keyword"
              onChange={handleSearchInput}
            />
            <button
              className="search-button"
              type="submit"
              // onClick={this.handleSubmit.bind(this)}
            />
          </form>
        </div>
        <DropdownButton
          alignRight
          title="Categories"
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
          className="ml-5"
        >
        {categories &&
                categories.map((data) => {
                  return (
                    <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
                  );
                })}
         

        </DropdownButton>
        

        <div className="cart">
          <div className="cart-info">
            <table>
              <tbody>
                <tr>
                  <td>No. of items</td>
                  <td>:</td>
                  <td>
                    <strong>{cartQuantity}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td>
                    <strong>{cartTotal}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <a className="cart-icon" href="#" onClick={handleCartButton}>
            <span class="material-symbols-outlined">shopping_cart</span>
            {cartQuantity ? (
              <span className="cart-count">{cartQuantity}</span>
            ) : (
              ""
            )}
          </a>
          <CartPreview />
        </div>
      </div>
    </header>
  );
};

export default Header;
