"use strict";

var React = require('react-native');
//var Camera = require('react-native-camera');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Animated,
}=React;

var MyVendorPublishCamera = React.createClass({
  	getInitialState() {
    	return {
      		cameraType: Camera.constants.Type.back,
    	}
  	},
	onTakePicturePress() {
	    this.refs.cam.capture(function(err, data) {
	      console.log(err, data);
	    });
	},
	render(){
		return (
			<View style={{flex:1}}>
		        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
		        	height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
		          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
		            <View style={{flexDirection:'row',alignItems:'center'}}>
		              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
		              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>拍照</Text>
		            </View>
		          </TouchableOpacity>
		          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
		            <TouchableOpacity>
		              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
		            </TouchableOpacity>
		          </View>
		        </View>
				<Camera ref="cam" style={{flex: 1,}}>
				</Camera>
				<TouchableOpacity style={{height:50,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}} onPress={this.onTakePicturePress}>
			          <Text>拍照</Text>
			    </TouchableOpacity>
			</View>
			);
	},
});


module.exports = MyVendorPublishCamera;