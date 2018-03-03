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
	Modal,
}=React;


var MyVendorCash = React.createClass({
  render(){
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>我的资产</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:125*Constants.HEIGHTRATIO}}>
            <Image style={{flex: 1,flexDirection:'row',alignItems:'center',backgroundColor: 'transparent',width:null,height:null}} 
              source={require('image!background_my')}>
              <Image style={{marginLeft:15,width:75,height:75}} source={{uri:'http://www.hack10000.com/Public/app/0417.png'}}/>
              <View style={{marginLeft:15}}>
                <Text style={{fontSize:15,color:'#ffe400'}}>完颜米娜</Text>
                <Text style={{fontSize:15,color:'#ffe400'}}>等级：v5</Text>
              </View>
            </Image>
        </View>
        <View style={{backgroundColor:'#e5e3e3',alignItems:'center',flex:1}}>
          <View style={{marginTop:24,borderRadius:10,backgroundColor:'#febd3b',width:300*Constants.HEIGHTRATIO,height:400*Constants.HEIGHTRATIO}}>
            <View style={{borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomWidth:1,borderBottomColor:'#ffffff',
                flex:1,flexDirection:'row'}}>
              <View style={{borderTopLeftRadius:10,borderRightWidth:1,borderRightColor:'#ffffff',flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>慧爱币</Text>
                <Text style={{color:'#ffffff'}}>￥50000.00</Text>
              </View>
              <View style={{borderTopRightRadius:10,flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>优惠券</Text>
                <Text style={{color:'#ffffff'}}>2</Text>
              </View>
            </View>
            <View style={{borderBottomLeftRadius:10,borderBottomRightRadius:10,flexDirection:'row',flex:1}}>
              <View style={{borderBottomLeftRadius:10,borderRightColor:'#ffffff',borderRightWidth:1,flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>银行卡</Text>
                <Text style={{color:'#ffffff'}}>1</Text>
              </View>
              <View style={{borderBottomRightRadius:10,flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>充值</Text>
                <Text style={{color:'#ffffff'}}>2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      );
  },
});

module.exports = MyVendorCash;
