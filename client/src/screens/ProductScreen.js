import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Col,Row,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = ({match}) => {
  const [product, setProduct] = useState({})
  
    useEffect(() => {
        const fetchproduct=async()=>{
    const {data} = await axios.get (`/api/products/${match.params.id}`)
    setProduct(data)
    
        }
        fetchproduct()
    
      }, [])
    return (
        <>
     
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
  <Row>
      <Col md={6}>
<Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>
<ListGroup variant='flush'>
    <ListGroupItem>
<h3>{product.name}</h3>
    </ListGroupItem>
    <ListGroupItem>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
    </ListGroupItem>
    <ListGroupItem>
     Description   :{product.description}
    </ListGroupItem>
    <ListGroupItem>
        Price:${product.price}
    </ListGroupItem>
</ListGroup>
      </Col>
      <Col md={3}>
          <Card>
              <ListGroup variant="flush">
<ListGroupItem>
    <Row>
        <Col>
        Price:
        </Col>
        <Col>
        <strong>${product.price}</strong>
        </Col>
    </Row>
</ListGroupItem>
<ListGroupItem>
    <Row>
        <Col>
        Status:
        </Col>
        <Col>
        {product.countInStock>0?'In Stock':'Out of Stock'}
        </Col>
    </Row>
</ListGroupItem>
<ListGroupItem>
    <Button  type='button' disabled={product.countInStock===0} className='w-100'>
        Add To Cart
    </Button>
</ListGroupItem>
              </ListGroup>
          </Card>
      </Col>
  </Row>
  </>
    )
}

export default ProductScreen