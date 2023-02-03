import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Accordion, Button, Form, InputGroup, Col, Row, ListGroup, Card, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { filterProductsCategoryThunk, filterProductsTitleThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [productSearchInput, setProductSearchInput] = useState('')

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories
        ` )
            .then(res => setCategories(res.data))
    }, [])
    const productList = useSelector(state => state.products)
    // console.log(productList);
    // console.log(categories);


    const addProduct = () => {
        alert(productSearchInput)
    }


    return (
        <div>
            <Row >
                {/* Category */}
                <Col lg={3}>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup className='list-category' horizontal as='ul'>
                                    {
                                        categories.map(aCategory => (
                                            <ListGroup.Item className='list-group-item'
                                                key={aCategory.id}
                                                onClick={() => dispatch(filterProductsCategoryThunk(aCategory.id))}
                                                style={{ cursor: 'pointer', border: 'none', width: '100%' }}
                                            >{aCategory.name}</ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>

                {/* Products */}
                <Col lg={9} >
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Look for a product"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productSearchInput}
                            onChange={e => setProductSearchInput(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(filterProductsTitleThunk(productSearchInput))}
                            variant="outline-secondary" id="button-addon2">
                            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                        </Button>
                    </InputGroup>


                    <Row xs={1} md={3} className="g-4">
                        {productList.map((currentProduct) => (
                            <Col key={currentProduct.id} >
                                <div >
                                    <Card style={{ height: 450 }} >
                                        <Link to={`/products/${currentProduct.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className='cardsImg'>
                                                <Card.Img
                                                    className='img-1'
                                                    variant="top"
                                                    src={currentProduct.images[0]?.url}
                                                    style={{ maxWidth: 350, height: 200, objectFit: 'contain', margin: 'auto' }} />
                                                <Card.Img
                                                    className='img-2'
                                                    variant="top"
                                                    src={currentProduct.images[1]?.url}
                                                    style={{ height: 200, objectFit: 'contain', margin: 'auto' }} />
                                            </div>
                                            <Card.Body className='card-body' >
                                                <div className='card-text-home'>
                                                    <h6 className='card-text-title'>{currentProduct.title}</h6>

                                                    <div className='card-text-price-home'>
                                                        <span>Price</span>
                                                        <h4>${(Number(currentProduct.price)).toFixed(2)}</h4>
                                                    </div>
                                                    <button className='cart-btn'
                                                        // onClick={() => dispatch(filterProductsTitleThunk(productSearchInput))}
                                                        variant="outline-secondary" id="button-addon2">
                                                        <i className="fa-solid fa-cart-shopping fa-xl "></i>
                                                    </button>
                                                </div>
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>

    );
};

export default Home;