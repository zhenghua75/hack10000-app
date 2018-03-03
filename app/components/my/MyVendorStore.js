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

var MyVendorStore = React.createClass({
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>供应商设置</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2'}}>
          <TouchableOpacity style={{marginTop:5,}}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>头像</Text>
              <View style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri:'http://www.hack10000.com/Public/app/0417.png'}} style={{width:50,height:50}}/>
                <Image style={{marginLeft:12,width:10,height:10}} source={require('image!arrow_right_grey')}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>名称</Text>
              <View style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:12,color:'#898a8b'}}>完颜米娜</Text>
                <Image style={{marginLeft:12,width:10,height:10}} source={require('image!arrow_right_grey')}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>品牌介绍</Text>
              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>发货地址</Text>
              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>收货地址</Text>
              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      );
  },
});

module.exports = MyVendorStore;
