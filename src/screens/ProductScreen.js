import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../component/Rating';
import {listProductDetails} from '../actions/productActions';
import Loader from '../component/Loader';
import Message from '../component/Message';

const Product = ({match}) => {
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  // const product = {}

  return (
      <>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
              <Col md={6} className='py-3'>
                <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                        value={product.rating}
                        text={`${product.rating} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <ListGroup variant='fluid'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className='btn-block w-100' type='button'
                            disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
        )}

        <Link className='btn btn-dark py-3 rounded' to='/'>Go Back</Link>
      </>
  );
};

export default Product;
