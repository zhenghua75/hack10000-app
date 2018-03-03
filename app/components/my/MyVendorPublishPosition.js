"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
}=React;

var MyVendorPublishPosition = React.createClass({
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
					<TouchableOpacity>
			            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
			            backgroundColor:'#ffffff',height:50}}>
			              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>国家</Text>
			              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
			            </View>
			        </TouchableOpacity>
			        <TouchableOpacity>
			            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
			            backgroundColor:'#ffffff',height:50}}>
			              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>省份</Text>
			              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
			            </View>
			        </TouchableOpacity>
			        <TouchableOpacity>
			            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
			            backgroundColor:'#ffffff',height:50}}>
			              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>城市</Text>
			              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
			            </View>
			        </TouchableOpacity>
				</View>
				<View style={{height:50}}>
			    	<TouchableOpacity style={{flex:1,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}}>
			          <Text>完成</Text>
			    	</TouchableOpacity>
				</View>
			</View>
			);
	},
});

module.exports = MyVendorPublishPosition;