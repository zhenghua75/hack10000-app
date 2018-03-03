"use strict";

var React = require('react-native');
//var MyProfileAddress = require('./MyProfileAddress');
var MyProfileNickName = require('./MyProfileNickName');
var Constants = require('../../constants/AppConstants');
var UserStore = require('../../stores/UserStore');
var Modal   = require('react-native-modalbox');
var ArrowLeftYellow = require('../ArrowLeftYellow');
var ArrowRightGrey = require('../ArrowRightGrey');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var WebApiUtils = require('../../utils/WebAPIUtils');
var MySex = require('./MySex');
var NavBar = require('../NavBar');
var Loading = require('../Loading');
var MyAddress = require('./MyAddress');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	TouchableHighlight,
  DatePickerIOS,
  NativeModules,
  InteractionManager,
}=React;

var Portal = require('react-native/Libraries/Portal/Portal');

function _getStateFromStores () {
    return {
        user:UserStore.getUser(),
    };
}

var options = {
  title: '选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '📷拍照',
  chooseFromLibraryButtonTitle: '图库',
  maxWidth: 150,
  maxHeight: 150,
  quality: 0.5,
  allowsEditing: false, 
  noData: false,
};


var portal_sex:any;

var MyProfile = React.createClass({
  propTypes:{
    onPress:React.PropTypes.func,
  },
  getInitialState(){
    return Object.assign({
      isHeadImage:false,
      isSex:false,
      isBirthday:false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      buttonRect: {},
      isFrontVisible:false,
      isLoading:true,
    },_getStateFromStores());
  },
  componentDidMount(){
    UserStore.addChangeListener(this._onChange);

    InteractionManager.runAfterInteractions(() => {
        this.setState({isLoading:false});
      });
  },
  _onChange () {
        this.setState(_getStateFromStores());
  },
  componentWillMount(){
    portal_sex = Portal.allocateTag();
  },
  componentWillUnmount () {
    UserStore.removeChangeListener(this._onChange);
  },
  onMyProfileAddressPress(){
    //this.props.navigator.push({component:MyProfileAddress,id:'MyProfileAddress'});
    this.props.navigator.push({component:MyAddress,id:'MyAddress'});
  },
  onHeadImagePress(){
    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          WebApiUtils.uploadHeadImage(this.state.user,response.uri,response.data,function(sucess){});
        }
      }
    });
  },
  onModalHeadImageClosed(){
    this.setState({isHeadImage:false});
  },
  onModifySexPress(sex){
    Portal.closeModal(portal_sex);
    WebApiUtils.modifyUser(this.state.user,'sex',sex,function(sucess){});
  },
  onSexPress(){
    Portal.showModal(portal_sex,<MySex key={'portal_sex'} onModifySexPress={this.onModifySexPress}/>);
  },
  onModalSexClosed(){
    this.setState({isSex:false});
  },
  onBirthdayAndroidPress(){
    var self = this;
    NativeModules.DateAndroid.showDatepicker(function() {}, function(year, month,day) {
        var birthday = year + "-" + (month+1) + '-' +day;
        WebApiUtils.modifyUser(self.state.user,'birthday',birthday,function(){});
      });
  },
  onBirthdayIOSPress(){
    if(this.state.isBirthday){
      this.refs.ModalBirthday.close();
    }else{
      this.refs.ModalBirthday.open();
    }
    this.setState({isBirthday:!this.state.isBirthday});
  },
  onBirthdayPress(){
    if(Constants.OS==='ios'){
      this.onBirthdayIOSPress();
    }else{
      this.onBirthdayAndroidPress();
    }
  },
  onModalBirthdayClosed(){
    this.setState({isBirthday:false});
  },
  onDateChange(date) {
    this.setState({date: date});
    this.setState({birthday:date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()});
  },
  onFrontPress(){
    this.setState({isFrontVisible:!this.state.isFrontVisible});
  },
  onModalFrontClosed(){
    this.setState({isFrontVisible:false});
  },
  render(){
    var sex = '保密';
    switch(this.state.user.sex){
      case '1':
        sex = '男';
      break;
      case '2':
        sex = '女';
      break;
    }
    if(this.state.isLoading){
      return (
        <View style={{flex:1}}>
        <NavBar returnText={'设置'} title = {'个人资料'} navigator={this.props.navigator}/>
        <Loading/>
        </View>
      );
    }
    return(
      <View style={{flex:1}}>
        <NavBar returnText={'设置'} title = {'个人资料'} navigator={this.props.navigator}/>
        <ScrollView style={{backgroundColor:'#d2d2d2'}} automaticallyAdjustContentInsets={false}>
          <TouchableHighlight style={{marginTop:11,height:64}} onPress={this.onHeadImagePress}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',height:55,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:14,color:'#292a2d',marginLeft:10}}>头像</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginRight:11,height:44,width:44}} source={{uri:this.state.user.headImage}}/>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.props.navigator.push({
            component:MyProfileNickName,
            id:'MyProfileNickName',
            user:this.state.user,
          })}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',
              height:44,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:14,color:'#292a2d',marginLeft:11}}>昵称</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#bfbfbf',marginRight:11}}>{this.state.user.nikeName}</Text>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onSexPress}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',
              height:44,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:14,color:'#292a2d',marginLeft:10}}>性别</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#bfbfbf',marginRight:10}}>{sex}</Text>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onBirthdayPress}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',
              height:44,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:13,color:'#292a2d',marginLeft:11}}>生日</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:12,color:'#bfbfbf',marginRight:11}}>{this.state.user.birthday}</Text>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',
              height:44,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:14,color:'#292a2d',marginLeft:11}}>会员等级</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#bfbfbf',marginRight:11}}>V{this.state.user.level}</Text>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.onMyProfileAddressPress()}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',height:55,
              borderBottomColor:'#bfbfbf',borderBottomWidth:1}}>
              <Text style={{fontSize:13,color:'#292a2d',marginLeft:10}}>我的收货地址</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <ArrowRightGrey style={{marginRight:11}}/>
              </View>
            </View>
          </TouchableHighlight>
        </ScrollView>
          <Modal visible={this.state.isSex} transparent={true} ref={'ModalSex'} onClosed={this.onModalSexClosed} style={{flex:1,backgroundColor:'transparent'}}>
            <TouchableOpacity style={{flex:1}} 
              onPress={this.onSexPress}>
              
            </TouchableOpacity>
          </Modal>
          <Modal visible={this.state.isBirthday} transparent={true} ref={'ModalBirthday'} onClosed={this.onModalBirthdayClosed} style={{flex:1,backgroundColor:'transparent'}}>
              <View style={{flex:1,backgroundColor:'#000000',opacity:0.6,justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'#ffffff',borderRadius:10,width:330*Constants.WIDTHRATIO}}>
                  <View style={{flexDirection:'row',borderTopLeftRadius:10,borderTopRightRadius:10,justifyContent:'space-around',height:45,alignItems:'center',
                    borderBottomColor:'#d2d2d2',borderBottomWidth:1,}}>
                    <TouchableOpacity onPress={this.onBirthdayPress}>
                      <Text>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onBirthdayPress}>
                      <Text>确认</Text>
                    </TouchableOpacity>
                  </View>
                  
                    <DatePickerIOS
                      date={this.state.date}
                      mode="date"
                      timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                      onDateChange={this.onDateChange}/>
                    <View style={{borderBottomLeftRadius:10,borderBottomRightRadius:10,height:20}}>
                    </View>
                </View>
              </View>
          </Modal>
          
      </View>
      );
  },
});

module.exports = MyProfile;
