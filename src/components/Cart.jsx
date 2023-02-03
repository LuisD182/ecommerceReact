import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Container, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCartThunk, getCartThunk, purchaseCartThunk, updateQuantityThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const addProduct = () => {
        const aPurchase = {
            'productId': product.id,
            'quantity': quantity
        }
        console.log(aPurchase);
        dispatch(addProductsThunk(aPurchase))
        alert('Product succesfully added to the cart')
    }

    const [initialBuy, setIntialBuy] = useState('')

    let total = 0
    cartProducts.forEach(product => {
        const productTotal = Number(product.product.price)  * product.quantity;
        total += productTotal
    })
    // {id: 1, title: "", quantity: 1}
    // 1

    const incrementProduct = (product) => {
        dispatch(updateQuantityThunk(product.id, product.quantity + 1));
      };
    
      const decrementProduct = (product) => {
        dispatch(updateQuantityThunk(product.id, product.quantity - 1));
      };
    


    // console.log(cartProducts);
    return (
        <div className='cart-container'>
            <Offcanvas
                className='cart-container'
                placement='end'
                show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartProducts.map(cartProduct => (
                        <Card
                            className='card-cart'
                            key={cartProduct.id}
                            style={{ width: '18rem', }}>
                            <Card.Img
                                style={{ maxHeight: '180px', objectFit: 'contain' }}
                                variant="top" src={cartProduct.product.images[0].url} />
                            <Card.Body>
                                <Card.Title>{cartProduct.product.title}</Card.Title>
                                <button
                                    className='delete-btn'
                                    onClick={() => dispatch(deleteProductCartThunk(cartProduct))} > Delete</button>
                                <div>
                                    <h4><span>Price</span> =$ {cartProduct.product.price}</h4>
                                </div>
                                <div >
                                    <span>Quantity</span>
                                    <div className='quantity'>
                                        <button
                                            className='plus-minus-btn'
                                            onClick={() => decrementProduct(cartProduct)}
                                            disabled={cartProduct.quantity === 1}
                                            >-
                                        </button>
                                        <input
                                            className='input-quantity'
                                            type='number'
                                            value={cartProduct.quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            placeholder={0}                                        >
                                        </input>
                                        <button
                                            className='plus-minus-btn'
                                            onClick={() => incrementProduct(cartProduct)}>+
                                        </button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                
                    <h3 className='total-cart'>Total = ${total}</h3>
                    <button
                        className='delete-btn'
                        onClick={() => dispatch(purchaseCartThunk(cartProducts.id))}>Check out</button>

                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default Cart;