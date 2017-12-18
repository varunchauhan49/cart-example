export default function reducer(state={
  product: "",
  productFetching: false,
  productFetched: false,
  productError: null,
  cartItems:[],
  count:0,
}, action) {

  switch (action.type) {
    case "SET_PRODUCT_LIST": {
      return {...state, cartItems:action.payload}
    }
    case "SET_LIST_COUNT":{
      return {...state, count:action.payload}
    }
    case "FETCH_PRODUCT": {
      return {...state, productFetching: true,
        slaFetched: false}
    }
    case "FETCH_PRODUCT_REJECTED": {
      return {...state, productFetching: false, productError: action.payload}
    }
    case "FETCH_PRODUCT_FULFILLED": {
      return {
        ...state,
        productFetching: false,
        productFetched: true,
        product: action.payload,
      }
    }
  }

  return state
}