"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	CameraRoll,
}=React;

var MyVendorPublishDesc = React.createClass({
	onPhotoPress(){
	    var fetchParams: Object = {
	      first: 5,
	      groupTypes: 'SavedPhotos',
	      assetType: 'Photos',
	    };
	    CameraRoll.getPhotos(fetchParams, this._appendAssets, function(){});
	},
	_appendAssets: function(data: Object) {
	},
  	
	render(){
		return (
			<View style={{flex:1}}>
		        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
		        	height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
		          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
		            <View style={{flexDirection:'row',alignItems:'center'}}>
		              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
		              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>商品描述</Text>
		            </View>
		          </TouchableOpacity>
		          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
		            <TouchableOpacity>
		              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
		            </TouchableOpacity>
		          </View>
		        </View>
				<View style={{flex:1,backgroundColor:'#d2d2d2'}}>
					<Text>添加图片和文字让你的宝贝更诱人</Text>
				</View>
				<View style={{height:50,flexDirection:'row'}}>
					<TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={this.onPhotoPress}>
			          <Text>添加图片</Text>
			    	</TouchableOpacity>
			    	<TouchableOpacity style={{flex:1,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}} onPress={this.onTakePicturePress}>
			          <Text>完成</Text>
			    	</TouchableOpacity>
				</View>
				
			</View>
			);
	},
});


module.exports = MyVendorPublishDesc;