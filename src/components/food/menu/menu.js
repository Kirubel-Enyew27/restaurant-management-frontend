import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Axios from "../../axiosInstance/axiosInstance";
import "./menu.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/cartSlice";

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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#e96b45",
          }}
        >
          Menu
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {menu.map((item) => (
            <div
              key={item.MealID}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <Card
                style={{
                  border: "none",
                  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 5px 10px rgba(0, 0, 0, 0.1)")
                }
              >
                <Card.Img
                  variant="top"
                  src={item.ImgUrl}
                  alt={item.Name}
                  style={{
                    width: "250px",
                    height: "200px",
                    margin: "10px auto",
                  }}
                />
                <Card.Body style={{ color: "#e96b45" }}>
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Text>{item.Descriptio}</Card.Text>
                  <Card.Text>Price: ETB {item.Price}</Card.Text>

                  {/* Conditional rendering based on whether the item is in the cart */}
                  {cart[item.MealID] ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(decrementQuantity(item.MealID))}
                        className="menu-btn mt-3 w-50"
                      >
                        -
                      </Button>
                      <span
                        style={{
                          margin: "0 10px",
                          fontWeight: "bold",
                        }}
                      >
                        {cart[item.MealID].quantity}
                      </span>
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(incrementQuantity(item.MealID))}
                        className="menu-btn mt-3 w-50"
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => dispatch(addToCart(item))}
                      className="menu-btn mt-3 w-50"
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
