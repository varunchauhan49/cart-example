import axios from "axios";
import productData from '../../json/product.json'

export function fetchProducts() {
  return function(dispatch) {
    dispatch({type: "FETCH_PRODUCT"});
    dispatch({type: "FETCH_PRODUCT_FULFILLED", payload: productData})
    // axios.get('https://api.myjson.com/bins/qhnfp')
    //   .then((response) => {
    //     dispatch({type: "FETCH_PRODUCT_FULFILLED", payload: response.data})
    //   })
    //   .catch((err) => {
    //     dispatch({type: "FETCH_PRODUCT_REJECTED", payload: err})
    //   })
  }
}

export function setProductList(list){
  return function(dispatch) {
    dispatch({type: "SET_PRODUCT_LIST", payload: list})
  }
}

export function setListCount(count){
  return function(dispatch) {
    dispatch({type: "SET_LIST_COUNT", payload: count})
  }
}