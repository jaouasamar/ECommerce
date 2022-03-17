import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { CreateProduct, deleteProduct, listProducts } from '../redux/actions/productActions'




const ProductListScreen = ({history}) => {
    const dispatch= useDispatch()
    const productList=useSelector(state=>state.productList)
    const {products,error,loading}=productList
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const productDelete=useSelector(state=>state.productDelete)
    const {error:errorDelete,loading:loadingDelete,success:successDelete}=productDelete
    const productCreate = useSelector((state) => state.productCreate)
    const {
    
   
      success: successCreate,
      product: createdProduct,
    } = productCreate
    useEffect(() => {
        if(!userInfo.isAdmin){
            history.push('/login')}
            if (successCreate) {
                history.push(`/admin/product/${createdProduct._id}/edit`)
              } else {
                dispatch(listProducts())
              }
     
     
    }, [dispatch,history,userInfo,successDelete,successCreate])
    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure?')){
dispatch(deleteProduct(id))
        }

    }
    const createProductHandler=()=>{
      
dispatch(CreateProduct())
        

    }
    return(
    <>
     <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i>Create Product
            </Button>
        </Col>
    </Row>
    {loadingDelete&&<Loader/>}
    {errorDelete&&<Message variant='danger'>{errorDelete}</Message>}
    {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
    (<Table striped bordered hover responsive className='table-sm'>
        <thead>
        <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>PRICE</td>
            <td>countInStock</td>
            <td>CATEGORY</td>
            <td>BRAND</td>
        </tr>
        </thead>
        <tbody>
            {products.map((product)=>(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.image}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='Light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                   </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                            </Button>
                       
                        </td>
                </tr>
    ))}
        </tbody>
    </Table>)
    
    }
    </>
  )
}

export default ProductListScreen