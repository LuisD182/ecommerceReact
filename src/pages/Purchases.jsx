import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchasesSlice';

const Purchases = () => {

    const reduxPurchases = useSelector(state => state.purchases)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    console.log(reduxPurchases);

    return (
        <div>
            <h1>My purchases</h1>
            <div>
                {
                    reduxPurchases.map(purchase => (
                        <Container key={purchase.createdAt}>
                            <Row className='row-Purchase'>
                                <Row className='row-date'>
                                 <h4> <span>Date</span> {`  ${purchase.updatedAt.slice(0, -14)} `}</h4>
                                </Row>
                                <Col className='columns-Purchase'>
                                    <img src={purchase.product.images[0].url}
                                        style={{ maxHeight: 200, maxWidth: 200, objectFit: 'contain', cursor: 'pointer' }}
                                        alt=""
                                        onClick={()=> navigate(`/products/${purchase.product.id}`)} 
                                        />
                                </Col>
                                <Col className='columns-Purchase' >
                                    <h4
                                     onClick={()=> navigate(`/products/${purchase.product.id}`)}
                                     style={{cursor: 'pointer'}}
                                    >{purchase.product.title}</h4></Col>
                                 <Col className='columns-Purchase'>
                                     <span>Price</span> 
                                     <h4>{purchase.product.price}</h4></Col>
                                <Col className='columns-Purchase'>
                                    <span>Quantity</span> 
                                 <h4> {purchase.quantity}</h4></Col>
                            </Row>
                        </Container>
                    ))
                }
            </div>

        </div>
    );
};

export default Purchases;