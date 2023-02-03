import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addProductsThunk } from '../store/slices/cart.slice';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';
import LoadingScreen from '../styles/LoadingScreen';

const Products = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const productsRedux = useSelector(state => state?.products)
    const isLoading = useSelector(state => state.isLoading)
    // As this loader inst working as well as it supouse for th async [#] in the api, another is created
    // const [productSearchInput, setProductSearchInput] = useState('')

    const [loading, setLoading] = useState(true)


    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsCategoryThunk(res.data.category.id))
                { isLoading && <LoadingScreen /> }
                setLoading(false)
            })
    }, [id])

    // console.log(product);
    const [quantity, setQuantity] = useState(1)

    const addProduct = ()=>{
        const  aPurchase ={
            'productId': product.id,
            'quantity': quantity
        }
        console.log(aPurchase);
        dispatch(addProductsThunk(aPurchase))
        alert('Product succesfully added to the cart')
    }

    const rest = ()=> {
        if(quantity > 1){
            setQuantity(quantity-1)
        } else{
            setQuantity === 1
        }
    }
    const add = ()=> {
        setQuantity(1+quantity)
        }


    return (
        <section>
            {loading ? (<LoadingScreen />) : (
                <div>
                    <Row className='my-5'>
                        <Col lg={6}>
                            <Carousel interval={null}
                                nextIcon={<span aria-hidden="false" className="carousel-control-next-icon" />}
                                prevIcon={<span aria-hidden="false" className="carousel-control-prev-icon" />}
                            >
                                <Carousel.Item bsPrefix='carousel-item' className='carousel' >
                                    <img
                                        className="d-block w-10 carouselImg"
                                        src={`${(product?.images[0].url)} `}
                                        alt="First slide"
                                    />
                                </Carousel.Item  >
                                <Carousel.Item className='carousel'>
                                    <img
                                        className="d-block w-10 carouselImg"
                                        src={`${product?.images[1].url} `}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className='carousel'>
                                    <img
                                        className="d-block w-10 carouselImg"
                                        src={`${(product?.images[2].url)} `}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                            <div className='rowImg' >
                                <img  className='row-Img' src={(product?.images[0].url)} alt="" />
                                <img className='row-Img' src={(product?.images[1].url)} alt="" />
                                <img className='row-Img' src={(product?.images[2].url)} alt="" />
                            </div>
                        </Col>
                        {/* Product text description */}
                        <Col lg={6}>
                            <span>{product.brand}</span>
                            <section className='product-description'>
                                <h1>{product.title}</h1>
                                <h6>{product.description}</h6>
                            </section>
                            <div className='product-info'>
                                <div className='price'>
                                    <span>Price</span>
                                    <h3>$ {(Number(product.price)).toFixed(2)}</h3>
                                </div>
                                {/* <div >
                                    <span>Quantity</span>
                                    <div className='quantity'>
                                        <button 
                                        
                                        className='plus-minus-btn'
                                        onClick={()=>rest()}>-</button>
                                        <input 
                                        className='input-quantity'
                                        type='number'      
                                        value={quantity}
                                        onChange= {e =>setQuantity(e.target.value)}
                                        placeholder= {0}
                                        >
                                        
                                        </input>
                                        <button
                                        className='plus-minus-btn'
                                        onClick={()=> add()}>+</button>
                                    </div>
                                </div> */}
                            </div>
                            <button 
                            onClick={()=>{addProduct()}}
                            className='add-btn'>Add to cart</button>
                        </Col>
                    </Row>
                    {/* Suggestions */}
                    <h3 className='discover'>Discover similar items</h3>
                    <Row sm={2}>
                        {
                            loading ? (<LoadingScreen />) : (
                                productsRedux.map(recomendedProduct => (
                                    <Card
                                        key={recomendedProduct.id}>
                                        <Link to={`/products/${recomendedProduct.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className='cardsImg'>
                                                <Card.Img
                                                    className='img-1'
                                                    variant="top"
                                                    src={recomendedProduct.images[0]?.url}
                                                    style={{ height: 200, objectFit: 'contain' }} />
                                                <Card.Img
                                                    className='img-2'
                                                    variant="top"
                                                    src={recomendedProduct.images[1]?.url}
                                                    style={{ height: 200, objectFit: 'contain' }} />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>{recomendedProduct.title}</Card.Title>
                                                <div className='card-text'>
                                                    <div>
                                                        <span>Price</span>
                                                        <h3>${(Number(recomendedProduct.price)).toFixed(2)}</h3>
                                                    </div>
                                                    <button 
                                                        className='cart-product-icon'
                                                        onClick={()=>addProduct()}
                                                        variant="outline-secondary" id="button-addon2">
                                                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                                                    </button>
                                                </div>

                                            </Card.Body>
                                        </Link>
                                    </Card>
                                ))
                            )
                        }
                    </Row>
                </div>
            )}
        </section>
    );
};

export default Products;