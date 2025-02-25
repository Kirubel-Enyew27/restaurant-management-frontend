import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Axios from '../../axiosInstance/axiosInstance';
import './menu.css'

function Menu() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await Axios.get('/v1/foods'); 
                setMenu(response.data.data); 
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to load menu');
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const addToCart = (item) => {
        setCart((prevCart) => ({
            ...prevCart,
            [item.MealID]: (prevCart[item.MealID] || 0) + 1 
        }));
    };

    const incrementQuantity = (item) => {
        setCart((prevCart) => ({
            ...prevCart,
            [item.MealID]: (prevCart[item.MealID] || 0) + 1
        }));
    };

    const decrementQuantity = (item) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[item.MealID] || 0) - 1;
            if (newQuantity <= 0) {
                const { [item.MealID]: _, ...rest } = prevCart; 
            }
            return { ...prevCart, [item.MealID]: newQuantity };
        });
    };

    if (loading) {
        return <div>Loading menu...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="menu-container">
        <Container>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color:'#e96b45' }}>Our Menu</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
                {menu.map((item) => (
                    <div key={item.MealID} style={{ textAlign: 'center', marginBottom: '20px'}}>
                        <Card style={{ border: 'none', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease-in-out' }}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)')}>
                            <Card.Img 
                                variant="top" 
                                src={item.ImgUrl} 
                                alt={item.Name} 
                                style={{
                                    width: '250px',
                                    height: '200px',
                                    margin: '10px auto'
                                }} 
                            />
                            <Card.Body style={{color:'#e96b45'}}>
                                <Card.Title>{item.Name}</Card.Title>
                                <Card.Text>{item.Descriptio}</Card.Text>
                                <Card.Text>Price: ETB {item.Price}</Card.Text>

                                {/* Conditional rendering based on whether the item is in the cart */}
                                {cart[item.MealID] ? (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Button variant="secondary" onClick={() => decrementQuantity(item)} className='menu-btn mt-3 w-50'>-</Button>
                                        <span style={{ margin: '0 10px', fontSize:'20px' }}>{cart[item.MealID]}</span>
                                        <Button variant="secondary" onClick={() => incrementQuantity(item)} className='menu-btn mt-3 w-50'>+</Button>
                                    </div>
                                ) : (
                                    <Button variant="primary" onClick={() => addToCart(item)} className='menu-btn mt-3 w-50'>Add to Cart</Button>
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
