"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
  TouchableHighlight,
}=React;

var MyVendorGoods = React.createClass({
  propTypes:{
    onPress:React.PropTypes.func,
  },
  getInitialState(){
    return{
      fromOrTo:true,
    };
  },
  toogle(){
    this.setState({fromOrTo:!this.state.fromOrTo});
  },
  render(){
    var fromColor = '#fe0006';
    var toColor = '#292a2d'
    if(!this.state.fromOrTo){
      fromColor = '#292a2d';
      toColor = '#fe0006';
    }
    return(
        <View style={{flex:1}}>
          <View style={{backgroundColor:'#292a2d',justifyContent:'center',
            height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
            <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginLeft:15,width:10,height:16}} source={require('image!arrow_left_yellow')}/>
                <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>我的供品</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height:40,flexDirection:'row'}}>
            <TouchableHighlight underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
              borderBottomColor:'#d2d2d2',alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.toogle()}>
              <Text style={{fontSize:13,color:fromColor}}>出售中(2)</Text>
            </TouchableHighlight>
            <View style={{height:25,width:1,backgroundColor:'#d2d2d2'}}></View>
            <TouchableHighlight underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
              borderBottomColor:'#d2d2d2',alignItems:'center',justifyContent:'center'}}
              onPress={()=>this.toogle()}>
              <Text style={{fontSize:13,color:toColor}}>仓库中(2)</Text>
            </TouchableHighlight>
          </View>
          <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#f5f2f2'}}>
            <View style={{backgroundColor:'#ffffff'}}>
              <View style={{flexDirection:'row',marginLeft:12,borderBottomWidth:1,borderBottomColor:'#d2d2d2'}}>
                <Image source={{uri:'http://www.hack10000.com/Public/app/0471.png'}} style={{width:75,height:75}}/>
                <View style={{marginLeft:12,justifyContent:'space-around',height:75,}}>
                  <Text style={{width:170}} numberOfLines={2}>经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋</Text>
                  <Text>已售：235  库存：365</Text>
                </View>
              </View>
              <View style={{height:35,alignItems:'center',justifyContent:'center'}}>
                <Text>暂时不支持在手机上编辑</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={{height:50,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}}>
            <Text>发布商品</Text>
          </TouchableOpacity>
        </View>
      );
  },
});

module.exports = MyVendorGoods;
