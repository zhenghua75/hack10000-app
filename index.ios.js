/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HackRegister = require('./app/components/HackRegisterContainer');
var HackLogin = require('./app/components/HackLoginContainer');
var HackTab = require('./app/components/HackTabContainer');
var HackSwiper = require('./app/components/HackSwiperContainer');

var App = require('./app/components/App');
var UserStore = require('./app/stores/UserStore');
var AsyncStorageUtils = require('./app/utils/AsyncStorageUtils');
var Loading = require('./app/components/Loading');
var MySetting = require('./app/components/my/MySetting');
var WebApiUtils = require('./app/utils/WebAPIUtils');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS,
  Modal,
  NavigatorIOS,
  AsyncStorage,
  StatusBarIOS,
  InteractionManager,
  Navigator,
  TouchableOpacity,
  TabBarIOS,
} = React;

function _getStateFromStores () {
  return {
    user: UserStore.getUser(),
    navBarHidden:UserStore.getNavigationBarHidden(),
  };
}


var hack10000 = React.createClass({
  onBarCode(data){
    this.setState({IsBarCode:true});
  },
  getInitialState(){
    return Object.assign({
      isLoading:true
    },_getStateFromStores());
  },

  componentDidMount(){
    UserStore.addChangeListener(this._onChange);

    InteractionManager.runAfterInteractions(() => {
      var self = this;
      AsyncStorageUtils.queryUser(function(){
        self.setState({isLoading:false});
      });
    });
  },

  componentWillUnmount () {
    UserStore.removeChangeListener(this._onChange);
  },

  onLoginPress(){
    this.refs.nav.resetTo({component:HackLogin,passProps:{
      onRegisterPress:this.onRegisterPress,
      onForgetPasswd:this.onForgetPasswd,
    }});
  },
  onRegisterPress(){
    this.refs.nav.push({component:HackRegister,passProps:{
      onLoginPress:this.onLoginPress,
      isForgetPasswd:false,
    }});
  },
  onForgetPasswd(){
    this.refs.nav.push({component:HackRegister,passProps:{
      onLoginPress:this.onLoginPress,
      isForgetPasswd:true,
    }});
  },
  _onChange () {
    this.setState(_getStateFromStores());
  },
  onSettingPress(){
    this.refs.nav.push({
      component:MySetting,
      title:'设置',
      backButtonTitle:'我的',
      passProps:{
        onLogoutPress:this.onLogoutPress,
      },
    });
  },
  onLogoutPress(){
    var self = this;
    WebApiUtils.userLogout(this.state.user,function(){
      //self.refs.nav.pop();
    });
  },
  render() {
    if (this.state.isLoading){
      return <Loading/>;
    }
    var displayComponent = HackLogin;
    if(this.state.user.isFirst){
      displayComponent = HackSwiper;
      // return (
      //   <HackSwiper/>
      // );
    }else if(this.state.user.isLogined){
        displayComponent = HackTab;
        // leftButtonIcon:require('image!option_yellow'),
        //     onLeftButtonPress:this.onSettingPress,
        //     rightButtonTitle: 'Cancel',
        //     onRightButtonPress: () => {},
        //     rightButtonIcon: require('image!message_yellow_3'),
        //
      
    }//else{
    //   return (
    //     <HackLogin/>
    //   );
    // }
    return (
      <NavigatorIOS ref='nav' 
        style={{flex:1}} 
        navigationBarHidden={this.state.navBarHidden}
        barTintColor='#292a2d'
        tintColor='#ffe400'
        titleTextColor='#ffe400'
        translucent={true}
          initialRoute={{
            component: displayComponent,
            title:'慧爱创客',
              passProps:{
                onLoginPress:this.onLoginPress,
                onRegisterPress:this.onRegisterPress,
                onForgetPasswd:this.onForgetPasswd,
              }
          }}/>
      );
  },
});

AppRegistry.registerComponent('hack10000', () => hack10000);
