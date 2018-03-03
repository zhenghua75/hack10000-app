"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ListView,
	TextInput,
}=React;

var MyVendorPublishCatalog = React.createClass({
	getInitialState(){
		return {
			dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
	},
	componentWillMount(){
		var dataSource = [
			{
				id:1,
				name:'女装',
			},
			{
				id:1,
				name:'手机数码',
			},
		];
		var ds = this.state.dataSource.cloneWithRows(dataSource);
		this.setState({dataSource:ds});
	},
	renderHeader(){
  	return (
  		<View style={{height:1,backgroundColor:'#d2d2d2'}}></View>
  		);
  },
  renderFooter(){
  	return (
  		<View style={{height:1,backgroundColor:'#d2d2d2'}}></View>
  		);
  },
  renderSeparator(sectionId,rowId,adjacentRowHighlighted){
  	return (
  		<View style={{height:1,backgroundColor:'#d2d2d2'}}></View>
  		);
  },
  renderRow(rowData,sectionId,rowId){
		return (
			<TouchableOpacity style={{height:50,justifyContent:'center'}}>
			
			<Text style={{fontSize:15,color:'#292a2d'}}>{rowData.name}</Text>
			</TouchableOpacity>
			);
	},
	render(){
		return (
			<View style={{flex:1}}>
		        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
		        	height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
		          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
		            <View style={{flexDirection:'row',alignItems:'center'}}>
		              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
		              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>分类</Text>
		            </View>
		          </TouchableOpacity>
		          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
		            <TouchableOpacity>
		              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
		            </TouchableOpacity>
		          </View>
		        </View>
				<View style={{flexDirection:'row',height:50,marginTop:20,marginHorizontal:5,alignItems:'center',justifyContent:'center'}}>
					<View style={{flex:1,flexDirection:'row',borderRadius:10,height:30,
							backgroundColor:'#d2d2d2',alignItems:'center',justifyContent:'center'}}>
							<Image source={require('image!search_black')}/>
							<TextInput placeholder={'寻找你喜欢的宝贝'} style={{width:200}}></TextInput>
						</View>
						<TouchableOpacity>
							<Text>搜索</Text>
						</TouchableOpacity>
				</View>
				<ListView dataSource={this.state.dataSource} 
							renderRow={this.renderRow} 
							renderSeparator={this.renderSeparator}
							renderHeader={this.renderHeader}
							renderFooter={this.renderFooter}
							style={{flex:1,marginHorizontal:18}}></ListView>
			</View>
			);
	},
});

module.exports = MyVendorPublishCatalog;