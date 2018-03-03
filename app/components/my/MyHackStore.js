"use strict";

var React = require('react-native');
var MyHackQrCode = require('./MyHackQrCode');
var Constants = require('../../constants/AppConstants');
var NavBar = require('../NavBar');
var ArrowRightGrey = require('../ArrowRightGrey');
var UserStore = require('../../stores/UserStore');
var WebApiUtils = require('../../utils/WebAPIUtils');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
  StatusBarIOS,
}=React;

var options = {
  title: '选择', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '📷拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '图库', // specify null or empty string to remove this button
  // customButtons: {
  //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  maxWidth: 200,
  maxHeight: 200,
  quality: 0.5,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
  // storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
  //   skipBackup: true, // image will NOT be backed up to icloud
  //   path: 'images' // will save image at /Documents/images rather than the root
  // }
};
var options2 = {
  title: '选择', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '📷拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '图库', // specify null or empty string to remove this button
  // customButtons: {
  //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  maxWidth: 1200,
  maxHeight: 400,
  quality: 0.5,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
  // storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
  //   skipBackup: true, // image will NOT be backed up to icloud
  //   path: 'images' // will save image at /Documents/images rather than the root
  // }
};
function _getStateFromStores () {
    return {
        user:UserStore.getUser(),
        hackStore:UserStore.getHackStore(),
    };
}

var MyHackStore = React.createClass({
  getInitialState(){
    return _getStateFromStores();
  },
  componentDidMount(){
    UserStore.addChangeListener(this._onChange);

    WebApiUtils.getHackStore(this.state.user,function(){
      });
  },
  _onChange () {
      this.setState(_getStateFromStores());
  },
  componentWillUnmount () {
      UserStore.removeChangeListener(this._onChange);
  },
  onLogoPress(){
    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          WebApiUtils.uploadHackStoreImage(this.state.user,this.state.hackStore,'logopath',response.uri,response.data,function(){});
        }
      }
    });
  },
  onBackgroundPress(){
    UIImagePickerManager.showImagePicker(options2, (didCancel, response) => {
      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          WebApiUtils.uploadHackStoreImage(this.state.user,this.state.hackStore,'backgroudpath',response.uri,response.data,function(){});
        }
      }
    });
  },
  onHackStoreNamePress(){
    this.props.navigator.push({id:'MyHackStoreName',user:this.state.user,hackStore:this.state.hackStore});
  },
  onHackStoreCommentPress(){
    this.props.navigator.push({id:'MyHackStoreComment',user:this.state.user,hackStore:this.state.hackStore});
  },
  onEnterShopPrss(){
    this.props.navigator.push({id:'Shop',qrCode:this.state.hackStore.guid,isHack:true,returnText:'创客时空管理'});
  },
  render(){
    // <TouchableOpacity>
    //         <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
    //         backgroundColor:'#ffffff',height:50}}>
    //           <Text style={{fontSize:13,marginLeft:20,color:'#292a2d'}}>店铺等级</Text>
    //           <Text style={{fontSize:13,marginRight:20,color:'#292a2d'}}>V5</Text>
    //         </View>
    //       </TouchableOpacity>
    var logo = this.state.hackStore.logopath===''?<View></View>:<Image source={{uri:this.state.hackStore.logopath}} style={{height:44,width:44}}/>;
    var background = this.state.hackStore.backgroudpath === ''?<View></View>:<Image source = {{uri:this.state.hackStore.backgroudpath}} style = {{width:240,height:80}}/>;
    return(
      <View style={{flex:1}}>
        <NavBar returnText={'创客'} title = {'设置'} navigator={this.props.navigator}/>
        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2',flex:1}}>
          <TouchableOpacity style={{marginTop:5,}} onPress={this.onLogoPress}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:64}}>
              <Text style={{fontSize:14,marginLeft:11,color:'#292a2d'}}>LOGO</Text>
              <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
                {logo}
                <ArrowRightGrey/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHackStoreNamePress}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:44}}>
              <Text style={{fontSize:14,marginLeft:11,color:'#292a2d'}}>店铺名称</Text>
              <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:11,color:'#898a8b'}}>{this.state.hackStore.name}</Text>
                <ArrowRightGrey/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onHackStoreCommentPress}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
              backgroundColor:'#ffffff',height:64}}>
              <Text style={{fontSize:14,marginLeft:11,color:'#292a2d'}}>描述</Text>
              <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:11,marginLeft:11,color:'#292a2d',width:200}} numberOfLines={10}>{this.state.hackStore.comment}</Text>
                <ArrowRightGrey/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:84}} onPress={this.onBackgroundPress}>
            <Text style={{fontSize:14,marginLeft:11,color:'#292a2d'}}>背景</Text>
            <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
              {background}
              <ArrowRightGrey/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyHackQrCode,id:'MyHackQrCode',hackStore:this.state.hackStore})}>
            <View style={{borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            backgroundColor:'#ffffff',height:44}}>
              <Text style={{fontSize:14,marginLeft:11,color:'#292a2d'}}>我的二维码</Text>
              <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri:this.state.hackStore.qrcodepath}} style={{height:44,width:44}}/>
                <ArrowRightGrey/>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={this.onEnterShopPrss} 
          style={{height:44,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:18,color:'#ffffff'}}>进入创客时空</Text>
        </TouchableOpacity>
      </View>
      );
  },
});

module.exports = MyHackStore;
