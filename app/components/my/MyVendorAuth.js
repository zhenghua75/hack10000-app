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

var MyVendorAuth = React.createClass({
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>认证管理</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2'}}>
          <View style={{marginTop:5,borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>真实姓名</Text>
            <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>完颜米娜</Text>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>身份证号码</Text>
            <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>5****************5</Text>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>学号</Text>
            <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>12010010042</Text>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>所属学校</Text>
            <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>云南师范大学</Text>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>手持身份证正面反面照上传</Text>
            <Image style={{marginRight:20}} source={require('image!image')}/>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
            <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>手机号码</Text>
            <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>134*****679</Text>
          </View>
        </ScrollView>
      </View>
      );
  },
});

module.exports = MyVendorAuth;