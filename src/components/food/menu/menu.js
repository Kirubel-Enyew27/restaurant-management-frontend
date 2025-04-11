import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../axiosInstance/axiosInstance";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/cartSlice";
import "./menu.css";

function Menu() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await Axios.get("/v1/foods");
        setMenu(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load menu");
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="menu-container">
      <Container>
        <h2 className="text-center mb-4" style={{ color: "#e96b45" }}>
          Menu
        </h2>
        <div className="menu-grid">
          {menu.map((item) => (
            <div key={item.MealID} className="menu-card">
              <Card style={{ border: "none" }}>
                <Card.Img variant="top" src={item.ImgUrl} alt={item.Name} />
                <Card.Body className="card-body">
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Descriptio}</Card.Text>
                  <Card.Text>Price: ETB {item.Price}</Card.Text>

                  {cart[item.MealID] ? (
                    <div className="quantity-control">
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(decrementQuantity(item.MealID))}
                        className="menu-btn"
                      >
                        -
                      </Button>
                      <span style={{ fontWeight: "bold" }}>
                        {cart[item.MealID].quantity}
                      </span>
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(incrementQuantity(item.MealID))}
                        className="menu-btn"
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => dispatch(addToCart(item))}
                      className="menu-btn mt-3"
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Menu;
