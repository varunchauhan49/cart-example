import React, { Component } from 'react';
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { fetchProducts, setProductList, setListCount } from "../Actions/productActions";

const mapStateToProps = state => {
  //console.log(state.productReducers);
  return {
    cartItems : state.productReducers.cartItems,
    count : state.productReducers.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProductItems: bindActionCreators(setProductList, dispatch),
    setCount: bindActionCreators(setListCount, dispatch)
  }
}

class Checkout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cartItems:props.cartItems,
      count:props.count
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cartItems !== this.props.cartItems){
      this.setState({cartItems:nextProps.cartItems})
    }
    if(nextProps.count !== this.props.count){
      this.setState({count:nextProps.count})
    }
  }

  addItem = (item) => {
    var count = this.state.count;
    count++;
    var list = this.state.cartItems;
    list.map((element,i)=>{
      if(element.name === item.name){
        element.count = element.count + 1;
      }
    });
    this.props.setProductItems(list);
    this.props.setCount(count);
    console.log(count,list);
    this.setState({cartItems:list,count:count});
  }

  deleteItem = (item) => {
    var count = this.state.count;
    count--;
    if(item.count ===1){
      this.removeItem(item);
    }
    else{
      var list = this.state.cartItems;
      list.map((element,i)=>{
        if(element.name === item.name){
          element.count = element.count - 1;
        }
      });
      this.props.setProductItems(list);
      this.props.setCount(count);
      this.setState({cartItems:list,count:count});
    }
  }

  removeItem = (item) => {
    var list = this.state.cartItems;
    var count = this.state.count;
    var index = -1;
    list.map((element,i)=>{
      if(element.name === item.name){
        index = i;
        count = count - item.count;
      }
    });
    list.splice(index,1);
    this.props.setProductItems(list);
    this.props.setCount(count);
    this.setState({cartItems:list,count:count});
    if(count === 0){
      window.location = "/";
    }
  }

  render() {
    var self = this;
    let total = 0;
    let discount = 0;
    let type = 0;
    let order_total = 0;
    let list = [];
    let count = 0;
    if(this.state.cartItems.length > 0){
      this.state.cartItems.map((item,i)=>{
        list.push(
          <tr key={'table' + i}>
            <td className="box" style={{width:'50%'}}>
              <img src={item.img_url} alt="Img" />
              <span className="item-name">{item.name}</span>
              <span className="cancel" style={{cursor:'pointer'}}
                onClick={self.removeItem.bind(self,item)}>X</span>
            </td>
            <td style={{textAlign:'center',cursor:'pointer'}} 
              onClick={self.deleteItem.bind(self,item)}>-</td>
            <td className="box">{item.count}</td>
            <td style={{textAlign:'center',cursor:'pointer'}}
             onClick={self.addItem.bind(self,item)}>+</td>
            <td>${item.price}</td>
          </tr> 
        );
        let value=0;
        total = total + item.price * item.count;
        discount = discount + (item.discount * item.count * item.price)/100;
        count = count + item.count;
        if(item.type === 'fiction'){
          type = type + (item.price * 0.15 * item.count);
          //value = item.price * item.count - (item.discount * item.count * item.price) - (item.price * 0.15 * item.count);
          //order_total = order_total + value;
        }
        else{
          //value = item.price * item.count - (item.discount * item.count * item.price);
          //order_total = order_total + value;
        }
      })
      order_total = total - (discount + type);
    }
    return (
      <div>
        <div className="header">
          <NavLink to="/" >
            <i style={{cursor:'pointer'}} className="fa fa-angle-left" aria-hidden="true"></i>
          </NavLink>
          <span style={{marginLeft:'10px'}}>Order Summary</span>
        </div>
        <div className="checkout">
          <table>
            <thead>
              <tr>
                <th style={{width:'50%'}}>
                  Items({count})
                </th>
                <th></th>
                <th style={{textAlign:'center'}}>Qty</th>
                <th></th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
          <div className="bill">
            <div className="tittle">
              <span>Total</span>
            </div>
            <div className="item">
              <span style={{marginRight:'34%'}}>Items({count})</span>:
              <span style={{marginLeft:'15%'}}>${total}</span>
            </div>
            <div className="discount">
              <span style={{marginRight:'33%'}}>Discount</span>:
              <span style={{marginLeft:'15%'}}>${discount}</span>
            </div>
            <div className="type">
              <span style={{marginRight:'20%'}}>Type Discount</span>:
              <span style={{marginLeft:'15%'}}>${type}</span>
            </div>
            <div className="total">
              <span style={{marginRight:'30%'}}>Order total</span>:
              <span style={{marginLeft:'15%'}}>${order_total}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);