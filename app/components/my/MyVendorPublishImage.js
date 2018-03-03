/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

"use strict";

var React = require('react-native');
// var Camera = require('react-native-camera');
// var MyVendorPublishCamera = require('./MyVendorPublishCamera');
// var MyVendorPublishDesc = require('./MyVendorPublishDesc');
// var MyVendorPublishPosition = require('./MyVendorPublishPosition');
// var MyVendorPublishCatalog = require('./MyVendorPublishCatalog');
var Constants = require('../../constants/AppConstants');
var ViewPager = require('react-native-viewpager');

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
  CameraRoll,
  ActionSheetIOS,
  InteractionManager,
}=React;


var MyVendorPublishImage = React.createClass({
  getInitialState(){
    return {
      dataSource:new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,}),
      isLoading:true,
    };
  },
  componentDidMount(){
    var slides = [
      'http://www.hack10000.com/Public/app/0500.png',
      'http://www.hack10000.com/Public/app/0500.png',
      'http://www.hack10000.com/Public/app/0500.png',
    ];

    this.setState({dataSource:this.state.dataSource.cloneWithPages(slides)});

    InteractionManager.runAfterInteractions(() => {
        this.setState({isLoading:false});
      });
  },
  onRenderPage(data,pageID) {
      return (
        <TouchableOpacity>
          <Image source={{uri:data}} style={{justifyContent:'flex-end',width:Constants.WIDTH}}>
              <TouchableOpacity style={{margin:15,backgroundColor:'transparent'}}>
                  <Image source={require('image!camera_add')}/>
              </TouchableOpacity>
          </Image>
        </TouchableOpacity>
      );
  },
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#000000'}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>查看图片</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        <ViewPager
              dataSource={this.state.dataSource}
              renderPage={this.onRenderPage}/>
        

        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2'}} horizontal={true}>
          <Image source={{uri:'http://www.hack10000.com/Public/app/0503.png'}} style={{margin:10}}/>
          <Image source={{uri:'http://www.hack10000.com/Public/app/0504.png'}} style={{margin:10}}/>
          <Image source={{uri:'http://www.hack10000.com/Public/app/0505.png'}} style={{margin:10}}/>
        </ScrollView>
        <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#ffffff'}}>按住小图拖动可调整位置</Text>
        </View>
      </View>
      );
  },
});

module.exports = MyVendorPublishImage;
