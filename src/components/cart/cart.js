import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaPlusCircle, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartSlice";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();

  const handleAddItems = () => {
    navigate("/food/menu");
  };

  return (
    <Container className="cart-container">
      <h2 className="text-center mb-4" style={{ color: "#e96b45" }}>
        Cart
      </h2>
      {Object.keys(cart).length === 0 ? (
        <>
          <p className="text-center">Your cart is empty.</p>
          <div className="text-center mt-3">
            <Button className="add-item-btn" onClick={handleAddItems}>
              Add Items
            </Button>
          </div>
        </>
      ) : (
        <>
          {Object.values(cart).map((item) => (
            <Card key={item.MealID} className="cart-item">
              <Card.Img
                src={item.ImgUrl}
                alt={item.Name}
                className="cart-item-img"
              />
              <Card.Body>
                <Card.Title>{item.Name}</Card.Title>
                <Card.Text>ETB {item.Price}</Card.Text>
                <div className="cart-quantity">
                  <Button
                    onClick={() => dispatch(decrementQuantity(item.MealID))}
                  >
                    -
                  </Button>
                  <span className="cart-qty">{item.quantity}</span>
                  <Button
                    onClick={() => dispatch(incrementQuantity(item.MealID))}
                  >
                    +
                  </Button>
                </div>
                <Card.Text>
                  Sub-total: ETB {item.Price * item.quantity}
                </Card.Text>
                <Button
                  onClick={() => dispatch(removeItem(item.MealID))}
                  className="remove-btn"
                >
                  <FaTrash className="icons" /> Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
          <div className="total-price">
            <hr />
            <p>
              <b style={{ margin: "3%" }}>Total: ETB {totalPrice}</b>
            </p>
            <hr />
            <div className="text-center mt-3 d-flex flex-column gap-2 align-items-center">
              <Button className="add-item-btn" onClick={handleAddItems}>
                <FaPlusCircle className="icons" />
                Add More Items
              </Button>
              <Button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                <FaShoppingCart className="icons" />
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
