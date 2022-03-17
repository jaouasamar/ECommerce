import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer,productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer } from './reducers/productReducers'
import { cartReducer} from './reducers/cartReducer'
import {userDetailsReducer, userLoginReducer, userRegisterReducer,userUpdateProfileReducer,userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducer'
const reducer= combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer

})
const cartItemsFromStorage=localStorage.getItem('cartItems')
?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')
?JSON.parse(localStorage.getItem('userInfo')):null


const initialState={
    cart:{cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]
const devtools= window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store= createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middleware),devtools)
)
export default store