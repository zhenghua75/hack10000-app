"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');
var ArrowLeftYellow = require('../ArrowLeftYellow');
var UserStore = require('../../stores/UserStore');
var ArrowTopBlack = require('../ArrowTopBlack');
var WebApiUtils = require('../../utils/WebAPIUtils');
var NavBar = require('../NavBar');
var Loading = require('../Loading');
var Helpers = require('../Helpers');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Dimensions,
  StatusBarIOS,
  ListView,
}=React;

function _getStateFromStores () {
    return {
        orders:UserStore.getOrders(),
    };
}

var MyOrders = React.createClass({
  getInitialState(){
    return Object.assign({
      isLoading:true,
      buttons:{
        all:{
          orderClass:'-1',
          selected:this.props.orderClass==='all'?true:false,
        },
        paying:{
          orderClass:'0',
          selected:this.props.orderClass==='paying'?true:false,
        },
        shipping:{
          orderClass:'1',
          selected:this.props.orderClass==='shipping'?true:false,
        },
        receiving:{
          orderClass:'2',
          selected:this.props.orderClass==='receiving'?true:false,
        },
        commenting:{
          orderClass:'99',
          selected:this.props.orderClass==='commenting'?true:false,
        },
        servicing:{
          orderClass:'4',
          selected:this.props.orderClass==='servicing'?true:false,
        },
      }
    },_getStateFromStores());
  },
  componentDidMount(){
    UserStore.addChangeListener(this._onChange);
    var self = this;
    WebApiUtils.getOrders(this.props.user,this.props.orderType,this.state.buttons[this.props.orderClass].orderClass,function(){
      self.setState({isLoading:false});
    });
  },
  _onChange () {
    this.setState(_getStateFromStores());
  },
  componentWillUnmount () {
    UserStore.removeChangeListener(this._onChange);
  },
  renderHeader(){
    return (
      <View key={'order_header'} style={{height:11,backgroundColor:'#d2d2d2'}}></View>
      );
  },
  renderSeparator(sectionId,rowId,adjacentRowHighlighted){
    return (
      <View key={'order_separator_'+sectionId+'_'+rowId} style={{height:11,backgroundColor:'#d2d2d2'}}></View>
      );
  },
  renderRow(rowData,sectionId,rowId){
    var products = [];
    for(var id in rowData.products){
      var product = rowData.products[id];
      console.log(product.image);
      products.push(
        <View key={rowData.id+'-'+product.id} style={{flexDirection:'row',height:90,borderBottomColor:'#d2d2d2',borderBottomWidth:1,
              justifyContent:'space-between',alignItems:'center',marginHorizontal:12}}>
              <View style={{flexDirection:'row'}}>
                <Image source={{uri:product.image}} style={{width:96,height:72}}/>
                <Text style={{fontSize:13,marginLeft:12}}>{product.name}</Text>
              </View>
              <View style={{marginLeft:8}}>
                <Text style={{fontSize:13}}>￥{product.price}</Text>
                <Text style={{fontSize:13}}>X{product.quantity}</Text>
              </View>
            </View>
        );
    }
    return (
      <View key={rowData.id} style={{marginTop:5,backgroundColor:'#ffffff'}}>
        <View style={{flexDirection:'row',alignItems:'center',height:44,justifyContent:'space-around',borderBottomColor:'#d2d2d2',borderBottomWidth:1,marginHorizontal:12}}>
          <Text style={{fontSize:14,color:'#fe0006'}}>订单编号:{rowData.id}</Text>
          <Text style={{fontSize:14,color:'#fe0006'}}>{rowData.statusname}</Text>
        </View>
        {products}
        <View style={{height:44,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginHorizontal:12,borderBottomColor:'#d2d2d2',borderBottomWidth:1}}>
          <Text>共{rowData.quantity}件商品</Text>
          <Text>实付：￥{rowData.amount}</Text>
        </View>
      </View>
    );
  },
  onOrderClassPress(orderClass){
    var buttons = this.state.buttons;
    for(var id in buttons){
      buttons[id].selected = id === orderClass;
    }

    this.setState({isLoading:true,buttons:buttons});
    var self = this;
    WebApiUtils.getOrders(this.props.user,this.props.orderType,this.state.buttons[orderClass].orderClass,function(){
      self.setState({isLoading:false});
    });
  },
  render(){
    var navBar = <NavBar returnText={this.props.returnText} title = {'我的订单'} navigator={this.props.navigator}/>;
    if (this.state.isLoading){
        return (<View style={{flex:1}}>
                {navBar}
                <Loading/>
              </View>);
      }
    var orderSource = Helpers.listViewPagingSource(this.state.orders);
    return(
      <View style={{flex:1}}>
        {navBar}
        <View style={{height:44,borderBottomColor:'#d2d2d2',borderBottomWidth:1,flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('all')}>
            <Text style={{fontSize:14,color:this.state.buttons.all.selected?'#fe0006':'#292a2d'}}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('paying')}>
            <Text style={{fontSize:14,color:this.state.buttons.paying.selected?'#fe0006':'#292a2d'}}>待付款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('shipping')}>
            <Text style={{fontSize:14,color:this.state.buttons.shipping.selected?'#fe0006':'#292a2d'}}>待发货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('receiving')}>
            <Text style={{fontSize:14,color:this.state.buttons.receiving.selected?'#fe0006':'#292a2d'}}>待收货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('commenting')}>
            <Text style={{fontSize:14,color:this.state.buttons.commenting.selected?'#fe0006':'#292a2d'}}>待评价</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>this.onOrderClassPress('servicing')}>
            <Text style={{fontSize:14,color:this.state.buttons.servicing.selected?'#fe0006':'#292a2d'}}>退款/售后</Text>
          </TouchableOpacity>
        </View>
        <ListView automaticallyAdjustContentInsets={false} 
          style={{backgroundColor:'#d2d2d2',flex:1}}
              renderSeparator={this.renderSeparator}
              renderHeader={this.renderHeader}
              dataSource={orderSource} 
              renderRow={this.renderRow}
              initialListSize={10}
              pageSize={4}
              scrollRenderAheadDistance={2000}/>
      </View>
      );
  },
});

module.exports = MyOrders;