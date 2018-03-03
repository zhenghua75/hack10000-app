/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

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
	Dimensions,
	Modal,
}=React;

var MyVendorMarket = React.createClass({
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>营销推广</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{marginTop:35,height:90,backgroundColor:'#febd3b',marginHorizontal:25,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'#ffffff'}}>发优惠券</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:25,height:90,backgroundColor:'#fe9619',marginHorizontal:25,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'#ffffff'}}>推送消息</Text>
        </TouchableOpacity>
      </View>
      );
  },
});

module.exports = MyVendorMarket;