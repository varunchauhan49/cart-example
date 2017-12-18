import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux'; 
import { connect } from "react-redux";
import { fetchProducts, setProductList, setListCount } from "../Actions/productActions";

const mapStateToProps = state => {
  return {
    product : state.productReducers.product,
    productFetching: state.productReducers.productFetching,
    productFetched: state.productReducers.productFetched,
    productError: state.productReducers.productError,
    count: state.productReducers.count,
    cartItems: state.productReducers.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    productActions: bindActionCreators(fetchProducts, dispatch),
    setProductItems: bindActionCreators(setProductList, dispatch),
    setCount: bindActionCreators(setListCount, dispatch),
  }
}

class ListingPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      products:this.props.product,
      cartItems:this.props.cartItems,
      count:this.props.count,
      flag:false,
      message:''
    };
  }

  componentDidMount(){
    this.props.productActions();
  }

  componentWillUnmount(){
    clearTimeout();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.product !== nextProps.product && nextProps.product){
      this.setState({products:nextProps.product});
    }
    if(this.props.count !== nextProps.count && nextProps.count!==0){
      this.setState({count:nextProps.count});
    }
    if(this.props.cartItems !== nextProps.cartItems && nextProps.cartItems){
      this.setState({cartItems:nextProps.cartItems});
    }
  }

  close(){
    this.setState({flag:false});
  }

  addToCart(product){
    var self = this;
    let listCount = this.state.count;
    let list = this.state.cartItems;
    if(list.length === 0){
      product.count = 1;
      list.push(product);
    }
    else{
      let flag = true;
      list.map((item,i)=>{
        if(product.id === item.id){
          item.count++;
          flag = false;
        }
      });
      if(flag){
        product.count = 1;
        list.push(product);
      }
    }
    listCount++;
    this.props.setCount(listCount);
    this.props.setProductItems(list);
    this.setState({cartItems:list,
      count:listCount,
      flag:true,
      message:'Added '+ product.count + ' ' + product.name + ' in cart'});
    setTimeout(function(){ 
      self.setState({flag:false});
    }, 3000);
  }

  render() {
    var list = [];
    var self = this;
    if(this.state.products !==''){
      this.state.products.map((item,i)=>{
        list.push(
          <article className="card" key={i}>
              <picture className="thumbnail">
                <img src={item.img_url} alt="Img" />
              </picture>
              {(item.discount>0)?
                <span className="discount-tag">
                  {item.discount}% Off
                </span>:false
              }
              <div className="card-content">
                <p className="item-name">{item.name}</p>
                <div className="item-info">
                  <p className="item-price">
                    {
                      (item.discount)?
                      <strike style={{marginRight:'5px'}}>
                        ${item.price} 
                        </strike>:false
                    }
                    <span>
                      ${(item.discount)?(item.price - item.price*item.discount/100):item.price}
                    </span>
                  </p>
                  <span className="addtocart" onClick={self.addToCart.bind(self,item)}>
                    Add to cart
                  </span>
                </div>
              </div>
          </article>
        )
      });
    }

    return (
      <div className="main-content">
        <div className="cart-details">
            <span className="allitems">
              All Items
            </span>
            <NavLink to="/checkout" >
              <span className="gotocart">
                Goto to Cart 
                <i className="fa fa-shopping-cart" style={{marginLeft:'5px'}} aria-hidden="true"></i>
                <sup style={{marginLeft:'3px'}}><b>{this.state.count}</b></sup>
              </span>
            </NavLink>
        </div>
        <div className="centered">
          <section className="cards">
            {list}
          </section>
        </div>
        {(this.state.flag)?
        <div className="toastify toastify--top-right">
          <div className="toastify-content toastify-content--success toast-enter--top-right toastify-animated">
            <div className="toastify__body ">
              {this.state.message}
            </div>
            <button className="toastify__close" onClick={this.close.bind(this)} type="button">✖</button>
            <div className="toastify__progress toastify__progress--success"
            style={{animationDuration: '3000ms', animationPlayState: 'running',opacity: '0'}}>
            </div>
          </div>
        </div>:false
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);