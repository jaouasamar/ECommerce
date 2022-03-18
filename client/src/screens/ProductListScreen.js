import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {
  CreateProduct,
  deleteProduct,
  listProducts,
} from '../redux/actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { products, error, loading, page, pages } = productList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector((state) => state.productDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete
  const productCreate = useSelector((state) => state.productCreate)
  const { success: successUpdate } = useSelector((state) => state.productUpdate)
  const { success: successCreate } = productCreate
  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
    pageNumber,
  ])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <LinkContainer to="/admin/product/create">
            <Button variant="Light" className="btn-sm">
              <i className="fas fa-edit">Create Product</i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>CountInStock</td>
                <td>CATEGORY</td>
                <td>BRAND</td>
                <td>IMAGE</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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
                      <Button variant="Light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
