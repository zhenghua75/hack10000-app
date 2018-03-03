"use strict";

var React = require('react-native');
//var Camera = require('react-native-camera');
var MyVendorPublishCamera = require('./MyVendorPublishCamera');
var MyVendorPublishDesc = require('./MyVendorPublishDesc');
var MyVendorPublishPosition = require('./MyVendorPublishPosition');
var MyVendorPublishCatalog = require('./MyVendorPublishCatalog');
var MyVendorPublishImage = require('./MyVendorPublishImage');
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


var MyVendorPublish = React.createClass({
  getInitialState(){
    return {
      isPhoto:true,
      dataSource:new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,}),
      isLoading:true,
    };
  },
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
  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '从相册中选择',
        '拍照',
        '取消',
      ],
      cancelButtonIndex: 2,
      //destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      //this.setState({ clicked: BUTTONS[buttonIndex] });
      switch(buttonIndex){
        case 0:
          this.onPhotoPress();
          break;
        case 1:
          //this.onCameraPress();
          this.props.navigator.push({component:MyVendorPublishCamera});
          break;
      }
      console.log(buttonIndex);
    });
  },
  componentDidMount(){
    var slides = [
      'http://www.hack10000.com/Public/app//0500.png',
      'http://www.hack10000.com/Public/app//0500.png',
      'http://www.hack10000.com/Public/app//0500.png',
    ];

    this.setState({dataSource:this.state.dataSource.cloneWithPages(slides)});

    InteractionManager.runAfterInteractions(() => {
        this.setState({isLoading:false});
      });
  },
  onRenderPage(data,pageID) {
      return (
        
        <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublishImage,id:'MyVendorPublishImage'})}>
          <Image source={{uri:data}} style={{justifyContent:'flex-end',width:Constants.WIDTH,height:Constants.WIDTH}}>
              <TouchableOpacity style={{margin:15,backgroundColor:'transparent'}}>
                  <Image source={require('image!camera_add')}/>
              </TouchableOpacity>
          </Image>
        </TouchableOpacity>
      );
    },
  render(){
    if (this.state.isLoading){
        return <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}><Text>正在加载......</Text></View>;
      }
    var photo = <View style={{height:135,alignItems:'center',justifyContent:'center',backgroundColor:'#d2d2d2'}}>
          <TouchableOpacity onPress={this.showActionSheet}>
            <Image source={require('image!camera_circle')}/>
          </TouchableOpacity>
        </View>;
    if(this.state.isPhoto){
      // photo=  <Swiper showsButtons={false} loop={true} height={375}>
      //           <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublishImage})}>
      //             <Image source={require('../images/0500.png')} style={{justifyContent:'flex-end'}}>
      //               <TouchableOpacity style={{margin:15}}>
      //                 <Image source={require('../images/0501.png')}/>
      //               </TouchableOpacity>
      //             </Image>
      //           </TouchableOpacity>
      //           <Image source={require('../images/0500.png')}/>
      //           <Image source={require('../images/0500.png')}/>
      //         </Swiper>;
      photo = <ViewPager
              dataSource={this.state.dataSource}
              renderPage={this.onRenderPage}/>;
    }
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
          height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{marginLeft:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('image!arrow_left_yellow')} style={{width:10,height:16}}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>发布商品</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
            <TouchableOpacity>
              <Image source={require('image!dot_three_yellow')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
        
        

        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2'}}>
        {photo}

        <View style={{height:45,borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff'}}>
          <Text style={{marginLeft:20,}}>商品标题</Text><TextInput style={{flex:1,marginLeft:20}}/>
        </View>

          <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublishCatalog,id:'MyVendorPublishCatalog'})}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>分类</Text>
              <View style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginLeft:12,width:10,height:10}} source={require('image!arrow_right_grey')}/>
              </View>
            </View>
          </TouchableOpacity>

            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:45}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>价格</Text>
              <TextInput style={{flex:1,marginLeft:20}}></TextInput>
              <View style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:12,color:'#898a8b'}}>￥</Text>
              </View>
            </View>

          <View style={{height:45,borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff'}}>
            <Text style={{marginLeft:20,}}>库存</Text><TextInput style={{flex:1,marginLeft:20}}/>
          </View>
          <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublishDesc,id:'MyVendorPublishDesc'})}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>商品描述</Text>
              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublishPosition,id:'MyVendorPublishPosition'})}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:50}}>
              <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>发货地</Text>
              <Image style={{marginRight:20,width:10,height:10}} source={require('image!arrow_right_grey')}/>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={{height:50,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:17}}>加入仓库</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,backgroundColor:'#ffe400',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:17}}>立即发布</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
  },
});

module.exports = MyVendorPublish;
