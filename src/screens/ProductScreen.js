import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../component/Rating';
import axios from 'axios';
// import products from '../products';

const Product = ({match}) => {
  // const product = products.find((p) => p._id === match.params.id);

  const [product, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get(`/api/products/${match.params.id}`);

      setProducts(data);
    };
    fetchProducts();
  }, [match]);

  return (
      <>
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
        <Link className='btn btn-dark py-3 rounded' to='/'>Go Back</Link>
      </>
  );
};

export default Product;
