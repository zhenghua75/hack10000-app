"use strict";

var React = require('react-native');
var MyCardCoupon = require('./MyCardCoupon');
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
  StatusBarIOS,
}=React;
var win = Dimensions.get('window');
var MyCard = React.createClass({
  render(){
    var heightRatio = win.height/667;
    var widthRatio = win.width/375;
    var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
    var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
    if(Constants.OS === 'ios'){
      StatusBarIOS.setStyle('light-content');
      StatusBarIOS.setHidden(false);
    }
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:height,paddingTop:paddingTop}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>我的卡券</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:125*heightRatio}}>
            <Image style={{flex: 1,flexDirection:'row',alignItems:'center',backgroundColor: 'transparent',width:null,height:null}} 
              source={require('image!background_my')}>
              <Image style={{marginLeft:15,height:75,width:75}} source={{uri:'http://www.hack10000.com/Public/app/0417.png'}}/>
              <View style={{marginLeft:15}}>
                <Text style={{fontSize:15,color:'#ffe400'}}>完颜米娜</Text>
                <Text style={{fontSize:15,color:'#ffe400'}}>等级：v5</Text>
              </View>
            </Image>
        </View>
        <View style={{backgroundColor:'#e5e3e3',alignItems:'center',flex:1}}>
          <View style={{marginTop:25,borderRadius:10,backgroundColor:'#febd3b',width:325*widthRatio,height:305*heightRatio}}>
            <View style={{borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomWidth:1,borderBottomColor:'#ffffff',
                flex:1,flexDirection:'row'}}>
              <View style={{borderTopLeftRadius:10,borderRightWidth:1,borderRightColor:'#ffffff',width:100*widthRatio,
                alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>消费积分</Text>
                <Image source={require('image!money_white')} style={{marginTop:10,width:40,height:40}}/>
              </View>
              <View style={{borderTopRightRadius:10,flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>500.00</Text>
              </View>
            </View>
            <View style={{borderBottomLeftRadius:10,borderBottomRightRadius:10,borderBottomWidth:1,borderBottomColor:'#ffffff',flexDirection:'row',flex:1}}>
              <View style={{borderBottomLeftRadius:10,borderRightColor:'#ffffff',borderRightWidth:1,width:100*widthRatio
                ,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>优惠券</Text>
                <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyCardCoupon})}>
                  <Image source={require('image!money_bank_white')} style={{marginTop:10}}/>
                </TouchableOpacity>
              </View>
              <View style={{borderBottomRightRadius:10,flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffffff'}}>2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      );
  },
});

module.exports = MyCard;
