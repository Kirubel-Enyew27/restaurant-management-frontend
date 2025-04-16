import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./checkout.css";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <Container className="checkout-container">
      <h2 className="text-center mb-4" style={{ color: "#e96b45" }}>
        Checkout
      </h2>

      {Object.keys(cart).length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {Object.values(cart).map((item) => (
            <Card key={item.MealID} className="mb-3 checkout-item">
              <Card.Body>
                <Card.Title>{item.Name}</Card.Title>
                <Card.Text>
                  {item.quantity} x ETB {item.Price} = ETB{" "}
                  {item.Price * item.quantity}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <div className="total-price">
            <hr />
            <p>
              <b style={{ margin: "3%" }}>Total: ETB {totalPrice}</b>
            </p>
            <hr />
            <Button className="mt-3 confirm-order-btn">
              <FaCheckCircle style={{ marginRight: "8px" }} />
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Checkout;
