import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc   Fetch all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
//@desc   Fetch single product
//@route GET /api/products/:id
//@access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})
//@desc   delete  product
//@route DELETE /api/products/:id
//@access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})
//@desc   create  product
//@route POST /api/products/
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, countInStock, description, brand, category } =
    req.body
  const createdProduct = new Product({
    name,
    price,
    image,
    countInStock,
    description,
    brand,
    category,
  })
  try {
    await createdProduct.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(404)
    throw new Error('Creation Failed')
  }
})
//@desc   update  product
//@route PUT /api/products/:id
//@access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, image, category, countInStock, description } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    product.description = description

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})
//@desc   Create new review
//@route POST /api/products/:id/reviews
//@access Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})
export {
  getProducts,
  getProductsById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
}
