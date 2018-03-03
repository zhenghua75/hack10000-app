'use strict';

var React = require('react-native');
var Loading = require('./Loading');
var Constants = require('../constants/AppConstants');
var CartStore = require('../stores/CartStore');
var ActionCreators = require('../actions/ActionCreators');
var WebApiUtils = require('../utils/WebAPIUtils');
var UserStore = require('../stores/UserStore');
var MessageBox = require('./platform/MessageBox');
var NavBar = require('./NavBar');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    PropTypes,
}=React;

var Product = React.createClass({
  render(){
    var product = this.props.product;
    var specs = product.specs;
    var specStr = '';

    if(specs.spec===null || specs.spec === undefined || specs.spec.length===null){
      return <View><Text style={{textAlign:'center',color:'red'}}>{'❌'}</Text></View>;
    }
    var length = specs.spec.length;
    for(var i=0;i<length;i++){
      var spec = specs.spec[i];
      if(spec.id>0){
        specStr += spec.name+':'+spec.value.name+' ';
      }
    }
    var widthRatio = Constants.WIDTHRATIO;
      var imageUrl = specs.image===''?product.images.length>0?product.images[0]:'':specs.image;
      imageUrl = imageUrl.replace('96x72','300x225');
      return (
        <View style={{height:100,flexDirection:'row',alignItems:'center',marginLeft:12}}>
                <Image style={{marginLeft:12,width:96,height:72}} source={{uri:imageUrl}}/>
                <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
                <View style={{justifyContent:'center',flex:1}}>
                  <Text style={{fontSize:11,color:'#292a2d',}}>{product.name}</Text>
                  <Text style={{fontSize:12,marginTop:15}}>{specStr}</Text>
                  <View style={{flexDirection:'row',marginTop:13}}>
                    <Text style={{fontSize:13,color:'#fe0006'}}>￥{this.props.cartType==='vendor'?specs.hackPrice:specs.price}</Text>
                    <Text style={{fontSize:13,color:'#858484',textDecorationLine:'line-through'}}>￥{specs.marketPrice}</Text>
                  </View>
                </View>
                <View style={{alignItems:'flex-end',justifyContent:'flex-end',height:90,marginRight:13}}>
                  <Text style={{color:'#292a2d'}}>X{specs.quantity}</Text>
                </View>
            </View>
              </View>
      );
  },
});

var Vendor = React.createClass({
  render(){
    return (
        <View style={{marginBottom:5,backgroundColor:'#ffffff'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            marginHorizontal:13,height:44,borderBottomWidth:1,borderBottomColor:'#d2d2d2'}}>
            <View style={{flexDirection:'row',justifyContent:'center',height:44,alignItems:'center'}}>
              <TouchableOpacity style={{marginLeft:12,height:44,flexDirection:'row',
                alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('image!house_black_flat')} style={{width:22,height:22}}/>
                  <Text style={{fontSize:13,marginLeft:14,width:100}} numberOfLines={1}>{this.props.data.name}</Text>
                  <Text style={{marginLeft:15}} >{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
  },
});

function _getStateFromStores () {
    return {
        data: CartStore.getData(),
        user:UserStore.getUser(),
    };
}

var CartCheckout = React.createClass({
    getInitialState: function () {
        return Object.assign({
            isLoading:false,
            cartType: this.props.cartType,
        },_getStateFromStores());
    },
    componentDidMount: function () {
        CartStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CartStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(_getStateFromStores());
    },
    renderRow(rowData, sectionID, rowID) {
      return (
        <Product product={rowData} cartType={this.props.cartType}/>
      );
    },
    renderSectionHeader(sectionData, sectionID) {
      return (
        <Vendor data={sectionData}/>
      );
    },
    getDataSource:function(){
        var _data = this.state.data;
        var type = this.props.cartType;
        var getSectionData = (dataBlob, sectionID) => {
          return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
          return dataBlob[sectionID].products[rowID];
        };

        var dataSource = new ListView.DataSource({
          getRowData: getRowData,
          getSectionHeaderData: getSectionData,
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        

        var sectionIDs = [];
        var rowIDs = [];
        var sectionID = 0;
        for(var id in _data[type]){
          var data = _data[type][id];
          sectionIDs.push(data.id);
          rowIDs[sectionID] = [];
          var products = data.products;
          for(var j in products){
            var product = products[j];
            rowIDs[sectionID].push(product.cartid);
          }
          sectionID++;
        } 
        return dataSource.cloneWithRowsAndSections(_data[type], sectionIDs, rowIDs);
    },
    onCheckoutPress(){
      var self = this;
        WebApiUtils.cartCheckoutFinish(this.state.user,this.props.cartType,this.state.data,function(success){
            if(success){
                WebApiUtils.cartReceiveProducts(self.props.cartType,self.state.user,(success)=>{
                  self.props.navigator.pop();
                });
            }
        });
    },
    render: function () {
      var navBar = <NavBar returnText={'购物车'} title = {'确认支付'} navigator={this.props.navigator}/>;
      if(this.state.isLoading){
        if (this.state.isLoading){
            return <View style={{flex:1}}>
                    {navBar}
                    <Loading/>
                  </View>;
        }
      }
      var dataSource = this.getDataSource();
      return(
          <View style={{flex: 1,backgroundColor: 'transparent'}}>
            {navBar}
            <ListView style={{flex:1}} dataSource={dataSource} 
              renderRow={this.renderRow} 
              automaticallyAdjustContentInsets={false}
              renderSectionHeader={this.renderSectionHeader}/>
            <View style={{flexDirection:'row',height:49}}>
              <TouchableOpacity onPress={this.onCheckoutPress} style={{flex:1,backgroundColor:'#ffa349',justifyContent:'center',alignItems:'center'}}>
                <Text>确认支付</Text>
              </TouchableOpacity>
            </View>
          </View>
    );
    },
});

module.exports = CartCheckout;
