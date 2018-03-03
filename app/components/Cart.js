'use strict';

var React = require('react-native');
var Loading = require('./Loading');
var Constants = require('../constants/AppConstants');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    PropTypes,
    SwitchIOS,
    SwitchAndroid,
    PullToRefreshViewAndroid,
}=React;

var Switch = Constants.OS==='ios'?SwitchIOS:SwitchAndroid;

var checkedImage = <View style={{width:22,height:22,borderRadius:11,
                      borderWidth:1,borderColor:'black',alignItems:'center',
                      justifyContent:'center'}}><Text>√</Text></View>;
var unCheckedImage = <View style={{width:22,height:22,borderRadius:11,borderWidth:1,borderColor:'black'}}/>;

var Product = React.createClass({
  render(){
    // console.log(this.props.product);
    // return null;
    // <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-end',backgroundColor:'#d2d2d2',height:45,width:165*widthRatio}} onPress={this.props.onSelPress}>
    //           <Text style={{fontSize:11}}>{specStr}</Text>
    //           <Text style={{margin:5,width:26,height:26}}>{'v'}</Text>
    //         </TouchableOpacity>
    var product = this.props.product;
    var specs = product.specs;
    var productCheckImage = product.checked?checkedImage:unCheckedImage;
    
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
    var rowProduct = product.edited?
        <View style={{flex:1,flexDirection:'row',marginLeft:5}}>
          <View style={{justifyContent:'center',marginTop:5}}>
            <View style={{flexDirection:'row',height:44}}>
              <TouchableOpacity onPress={this.props.onSubPress}
                style={{width:44,height:44,alignItems:'center',justifyContent:'center',backgroundColor:'#d2d2d2',
                    borderRightWidth:1,borderRightColor:'#ffffff',borderBottomWidth:1,borderBottomColor:'#ffffff'}}>
                <Text>{'-'}</Text>
              </TouchableOpacity>
              <View style={{width:44,backgroundColor:'#d2d2d2',alignItems:'center',justifyContent:'center',
                borderRightWidth:1,borderRightColor:'#ffffff',borderBottomWidth:1,borderBottomColor:'#ffffff'}}>
                <Text>{specs.quantity}</Text>
              </View>
              <TouchableOpacity onPress={this.props.onAddPress}
                style={{width:44,height:44,alignItems:'center',justifyContent:'center',backgroundColor:'#d2d2d2',
                    borderRightWidth:1,borderRightColor:'#ffffff',borderBottomWidth:1,
                    borderBottomColor:'#ffffff'}}>
                <Text>{'+'}</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <TouchableOpacity onPress={this.props.onDelPress}
            style={{flex:1,height:100,alignItems:'center',justifyContent:'center',backgroundColor:'#ffe400',marginLeft:5}}>
            <Text style={{fontSize:15,}}>删除</Text>
          </TouchableOpacity>
        </View>:
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
            </View>;
      var imageUrl = specs.image===''?product.images.length>0?product.images[0]:'':specs.image;
      imageUrl = imageUrl.replace('96x72','300x225');
      return (
        <View style={{height:100,flexDirection:'row',alignItems:'center',marginLeft:12}}>
                <TouchableOpacity onPress={this.props.onCheckPress}>
                    {productCheckImage}
                  </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onSelPress}>
                  <Image style={{marginLeft:12,width:96,height:72}} source={{uri:imageUrl}}/>
                </TouchableOpacity>
                {rowProduct}
              </View>
      );
  },
});

var Vendor = React.createClass({
  render(){
    var shopCheckImage = this.props.data.checked?checkedImage:unCheckedImage;
    var shopEditText = this.props.data.edited?'完成':'编辑';
    return (
        <View style={{marginBottom:5,backgroundColor:'#ffffff'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            marginHorizontal:13,height:44,borderBottomWidth:1,borderBottomColor:'#d2d2d2'}}>
            <View style={{flexDirection:'row',justifyContent:'center',height:44,alignItems:'center'}}>
              <TouchableOpacity onPress={this.props.onCheckPress}>
                {shopCheckImage}
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:12,height:44,flexDirection:'row',
                alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('image!house_black_flat')} style={{width:22,height:22}}/>
                  <Text style={{fontSize:13,marginLeft:14,width:100}} numberOfLines={1}>{this.props.data.name}</Text>
                  <Text style={{marginLeft:15}} >{'>'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.props.onEditPress}>
              <View style={{borderLeftWidth:1,borderLeftColor:'#d2d2d2',width:50}}>
                <Text style={{fontSize:13,textAlign:'center'}}>{shopEditText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
  },
});


var Cart = React.createClass({
    renderRow(rowData, sectionID, rowID) {
      return (
        <Product product={rowData} 
          cartType={this.props.cartType}
          onCheckPress={()=>this.props.onCheckProductPress(sectionID,rowID)}
          onAddPress={()=>this.props.onProductAddPress(sectionID,rowID)}
          onSubPress={()=>this.props.onProductSubPress(sectionID,rowID)}
          onDelPress={()=>this.props.onProductDelPress(sectionID,rowID)}
          onSelPress={()=>this.props.onProductSelPress(rowData)}/>
      );
    },
    renderSectionHeader(sectionData, sectionID) {
      return (
        <Vendor data={sectionData} 
          onCheckPress={()=>this.props.onCheckDataPress(sectionID)}
          onEditPress={()=>this.props.onEditDataPress(sectionID)}/>
      );
    },
    getDataSource:function(){
        var _data = this.props.data;
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
    render: function () {
        var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
        var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
        if(!this.props.data || !this.props.data[this.props.cartType] || Object.keys(this.props.data[this.props.cartType]).length===0){
          return (
            <View style={{flex: 1,backgroundColor: 'transparent'}}>
                <View style={{height:height,
                    paddingTop:paddingTop,backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'center',
                    alignItems:'center'}}>
                    <Text style={{fontSize:14,color:'#ffe400',textAlign:'center'}}>购物车</Text>
                </View>
                <View style={{flex:1,backgroundColor:'#d2d2d2',alignItems:'center'}}>
                  <Image source = {require('image!cart_white')} style={{width:100,height:100,marginTop:115}}/>
                  <Text style={{fontSize:16,color:'grey',marginTop:25}}>您的购物车暂无宝贝</Text>
                  <TouchableOpacity style={{borderColor:'grey',borderWidth:1,width:75,height:30,
                    justifyContent:'center',alignItems:'center',marginTop:15}}
                    onPress={this.props.onLookPress}>
                    <Text style={{fontSize:15}}>去逛逛</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
        }
        var allCheckedImage = this.props.data.checked?checkedImage:unCheckedImage;
        var editedAllText = this.props.data.edited?'完成':'编辑全部';
        
        var dataSource = this.getDataSource();
        var hackText = this.props.switchIsOn?'慧爱币':'现金';
        var rightSwitch = this.props.user.isHack?
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{color:'#ffe400',fontSize:14}}>{hackText}</Text>
            <Switch 
              tintColor={'#bfbfbf'} 
              onValueChange={(value) => this.props.onSwitchChange(value)}
              value={this.props.switchIsOn} /></View>:<View></View>;
        return(
            <View style={{flex: 1,backgroundColor: 'transparent'}}>
                <View style={{height:height,
                    paddingTop:paddingTop,backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',
                    alignItems:'center',paddingHorizontal:11}}>
                    <TouchableOpacity onPress={()=>this.props.onEditAllPress()}>
                        <Text style={{fontSize:14,color:'#ffe400',textAlign:'center'}}>{editedAllText}</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:14,color:'#ffe400',textAlign:'center'}}>购物车({this.props.data.quantity})</Text>
                    {rightSwitch}
                </View>
                <PullToRefreshViewAndroid 
                  style={{flex:1}}
                  refreshing={this.props.isRefreshing}
                  onRefresh={this.props.onRefresh}
                  colors={['#ff0000', '#00ff00', '#0000ff']}
                  progressBackgroundColor={'#ffe400'}>
                <View style={{flex:1}}>
                  <ListView style={{flex:1}} dataSource={dataSource} 
                    renderRow={this.renderRow} 
                    automaticallyAdjustContentInsets={false}
                    renderSectionHeader={this.renderSectionHeader}/>
                  <View style={{height:49,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:49,paddingLeft:12}}>
                      <TouchableOpacity onPress={this.props.onCheckAllPress}>
                          {allCheckedImage}
                      </TouchableOpacity>
                      <Text style={{marginLeft:13}}>全选</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{marginRight:14,justifyContent:'center',alignItems:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize:13,color:'#292a2d'}}>合计：</Text>
                          <Text style={{color:'#fe0006'}}>￥{this.props.data.total}</Text>
                        </View>
                        <Text style={{fontSize:11,color:'#292a2d'}}>不含运费</Text>
                      </View>
                      <View style={{width:100}}>
                        <TouchableOpacity style={{flex:1,backgroundColor:'#ffe400',alignItems:'center',
                          justifyContent:'center'}}
                          onPress={this.props.onCheckoutPress}>
                          <Text style={{fontSize:15,color:'#292a2d'}}>结算({this.props.data.quantity})</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </PullToRefreshViewAndroid>
            </View>
      );
    },
});

module.exports = Cart;
