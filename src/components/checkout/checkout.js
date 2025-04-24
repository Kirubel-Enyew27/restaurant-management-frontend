import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./checkout.css";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [showMessage, setShowMessage] = useState(false);
  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000); // Show message for 5 seconds
  };

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
            <div className="relative mt-3 h-14 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!showMessage ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Button className="confirm-order-btn" onClick={handleClick}>
                      <FaCheckCircle style={{ marginRight: "8px" }} />
                      Confirm Order
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="coming-soon"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow text-sm font-semibold"
                  >
                    ✨ Upcoming feature! We'll let you know as soon as we start
                    working.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Checkout;
