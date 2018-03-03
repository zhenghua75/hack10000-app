'use strict';

var React = require('react-native');
var Cart = require('./Cart');
var CartStore = require('../stores/CartStore');
var ActionCreators = require('../actions/ActionCreators');
var WebApiUtils = require('../utils/WebAPIUtils');
var UserStore = require('../stores/UserStore');
var MessageBox = require('./platform/MessageBox');
var Constants = require('../constants/AppConstants');
var Loading = require('./Loading');

var {
    StyleSheet,
    View,
    InteractionManager,
    PropTypes,
    ListView,
    Text,
}=React;

function _getStateFromStores () {
    return {
        data: CartStore.getData(),
        user:UserStore.getUser(),
    };
}

var CartContainer = React.createClass({
    getInitialState: function () {
        return Object.assign({
            isLoading:true,
            cartType:'store',
            switchIsOn:false,
            isRefreshing:false,
        },_getStateFromStores());
    },
    componentDidMount: function () {
        CartStore.addChangeListener(this._onChange);
        var cartType = this.state.user.isHack?'vendor':'store';
        var switchIsOn = this.state.user.isHack;
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isLoading:false,
                cartType:cartType,
                switchIsOn:switchIsOn,
            });
        });
        // WebApiUtils.cartReceiveProducts(cartType,this.state.user,(success)=>{
        //     this.setState({
        //         isLoading:false,
        //         cartType:cartType,
        //         switchIsOn:switchIsOn,
        //     });
        // });
    },

    componentWillUnmount: function () {
        CartStore.removeChangeListener(this._onChange);
    },

    onCheckoutPress () {
        var self = this;
        var cartType = this.state.switchIsOn?'vendor':'store';
        if(!this.state.switchIsOn){
            MessageBox.show('暂不开放现金结算');
            return;
        }
        WebApiUtils.cartCheckout(this.state.user,cartType,this.state.data,function(success){
            if(success){
                self.props.navigator.push({id:'CartCheckout',cartType:cartType});
            }
        });
    },
    onEditAllPress(){
        ActionCreators.cartEditAll(this.state.cartType);
    },
    onEditDataPress(sectionID){
        ActionCreators.cartEditData(this.state.cartType,sectionID);
    },
    onCheckAllPress(){
        ActionCreators.cartCheckAll(this.state.cartType);
    },
    onCheckDataPress(sectionID){
        ActionCreators.cartCheckData(this.state.cartType,sectionID);
    },
    onCheckProductPress(sectionID,rowID) {
        ActionCreators.cartCheckProduct(this.state.cartType,sectionID,rowID);
    },
    onProductAddPress(sectionID,rowID){
        ActionCreators.cartAddQuantity(this.state.cartType,sectionID,rowID);
    },
    onProductSubPress(sectionID,rowID){
        ActionCreators.cartSubQuantity(this.state.cartType,sectionID,rowID);
    },
    onProductDelPress(sectionID,rowID){
        ActionCreators.cartDelProduct(this.state.cartType,sectionID,rowID);
    },
    onProductSelPress(product){
        console.log(product,this.state.cartType);
        if(this.state.cartType === 'vendor'){
            this.props.navigator.push({id:'Product',pid:product.id,returnText:'购物车',isShop:false});
        }else{
            this.props.navigator.push({
              id:'Product',
              isShop:true,
              pid:product.id,
              qrCode:product.store.guid,
              returnText:'购物车'
            });
        }
    },
    onSwitchChange(value){
        if(value){
            this.setState({switchIsOn:value});
            WebApiUtils.cartReceiveProducts('vendor',this.state.user,(success)=>{});
        }else{
            //WebApiUtils.cartReceiveProducts('store',this.state.user,(success)=>{});
            MessageBox.show('暂不开放现金结算');
        }
    },
    onRefresh(){
        this.setState({isRefreshing:true});
        WebApiUtils.cartReceiveProducts(this.state.cartType,this.state.user,(success)=>{
          this.setState({isRefreshing:false});
        });
    },
    render: function () {
        if (this.state.isLoading){
            var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
            var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
            return (
                <View style={{flex: 1,backgroundColor: 'transparent'}}>
                    <View style={{height:height,
                        paddingTop:paddingTop,backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',
                        alignItems:'center',paddingHorizontal:11}}>
                        <View></View>
                        <Text style={{fontSize:14,color:'#ffe400',textAlign:'center'}}>购物车</Text>
                        <View></View>
                    </View>
                    <Loading></Loading>
                </View>
            );
        }
        return (
            <Cart data={this.state.data} 
                cartType={this.state.cartType}
                switchIsOn={this.state.switchIsOn}
                user = {this.state.user}
                onCheckoutClicked={this.onCheckoutClicked}
                onSwitchChange={this.onSwitchChange}
                onEditAllPress={this.onEditAllPress}
                onEditDataPress = {this.onEditDataPress}
                onCheckAllPress = {this.onCheckAllPress}
                onCheckDataPress={this.onCheckDataPress}
                onCheckProductPress={this.onCheckProductPress}
                
                onProductAddPress={this.onProductAddPress}
                onProductSubPress={this.onProductSubPress}
                onProductDelPress={this.onProductDelPress}
                onProductSelPress={this.onProductSelPress}
                onCheckoutPress={this.onCheckoutPress}
                onLookPress={this.props.onLookPress}
                isRefreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}/>
        );
    },

    _onChange: function () {
        this.setState(_getStateFromStores());
    }
});

module.exports = CartContainer;
