import React, { useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Col,Row,Image,ListGroup,Card,Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../redux/actions/productActions'
import { useSelector,useDispatch} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'


const ProductScreen = ({history,match}) => {
 const [qty, setQty] = useState(1)
const dispatch=useDispatch()
  const productDetails=useSelector(state=>state.productDetails)
   const{loading,error,product}=productDetails
  
  
  
  useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    
    
      }, [dispatch,match])
      const addToCartHandler=()=>{
history.push(`/cart/${match.params.id}?qty=${qty}`)
      }
    return (
        <>
     
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
  {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
    <Row>
      <Col md={6}>
<Image src={product.image} alt={product.name}  width="80%" />
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
{product.countInStock>0&&(
    <ListGroup.Item>
        <Row>
            <Col>Qty</Col>
            <Col>
            <Form.Control as='select' value={qty} 
            
            onChange={(e)=>
            setQty(e.target.value)}>
{
  [...Array(product.countInStock).keys()] .map(x=>(
    <option key={x+1} value={x+1}>
        {x+1}
    </option>
))
}
             
            </Form.Control>
            </Col>
        </Row>
    </ListGroup.Item>
)}




<ListGroupItem>
    <Button  
    onClick={addToCartHandler}
    type='button' disabled={product.countInStock===0} className='w-100'>
        Add To Cart
    </Button>
</ListGroupItem>
              </ListGroup>
          </Card>
      </Col>
  </Row>
  )}
  
  </>
    )
}

export default ProductScreen