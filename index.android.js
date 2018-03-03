'use strict';

var React = require('react-native');
var HackTab = require( './app/components/HackTab');
var HackSwiper = require( './app/components/HackSwiper');
var Constants = require( './app/constants/AppConstants');
var My = require( './app/components/My');
var MySetting = require( './app/components/my/MySetting');
var MyBookmarkedProducts = require( './app/components/my/MyBookmarkedProducts');
var MyOrder = require( './app/components/my/MyOrder');
var MyComment = require( './app/components/my/MyComment');
var MyHack = require( './app/components/my/MyHack');
var MyVendor = require( './app/components/my/MyVendor');
var Product = require('./app/components/Product');
var ProductDetail = require('./app/components/ProductDetail');
var MallCatalog = require('./app/components/MallCatalog');
var MyCard = require('./app/components/my/MyCard');
var MyHackGoods = require('./app/components/my/MyHackGoods');
var MyHackCash = require('./app/components/my/MyHackCash');
var MyHackMarket = require('./app/components/my/MyHackMarket');
var MyHackAuth = require('./app/components/my/MyHackAuth');
var MyHackStore = require('./app/components/my/MyHackStore');
var MyHackQrCode = require('./app/components/my/MyHackQrCode');
var MyVendorCash = require('./app/components/my/MyVendorCash');
var MyVendorMarket = require('./app/components/my/MyVendorMarket');
var MyVendorAuth = require('./app/components/my/MyVendorAuth');
var MyVendorStore = require('./app/components/my/MyVendorStore');
var MyVendorGoods = require('./app/components/my/MyVendorGoods');
var MyVendorPublish = require('./app/components/my/MyVendorPublish');
var MyVendorPublishCamera = require('./app/components/my/MyVendorPublishCamera');
var MyVendorPublishDesc = require('./app/components/my/MyVendorPublishDesc');
var MyVendorPublishPosition = require('./app/components/my/MyVendorPublishPosition');
var MyVendorPublishCatalog = require('./app/components/my/MyVendorPublishCatalog');
var HackRegister = require('./app/components/HackRegister');
var HackLogin = require('./app/components/HackLogin');
var BarcodeScanner = require('./app/components/BarcodeScanner');
var ForgetPasswd = require('./app/components/ForgetPasswd');
var MyProfile = require('./app/components/my/MyProfile');
var MyService = require('./app/components/my/MyService');
var MySettingAbout = require('./app/components/my/MySettingAbout');
var MySettingSecurity = require('./app/components/my/MySettingSecurity');
var MyProfileAddress = require('./app/components/my/MyProfileAddress');
var MyProfileNickName = require('./app/components/my/MyProfileNickName');
var MySettingSecurityPwd = require('./app/components/my/MySettingSecurityPwd');
var MySettingSecurityEmail = require('./app/components/my/MySettingSecurityEmail');
var MySettingSecurityPhone = require('./app/components/my/MySettingSecurityPhone');
var MySettingSecurityFullName = require('./app/components/my/MySettingSecurityFullName');
var CatalogProducts = require('./app/components/CatalogProducts');
var MyRegister = require('./app/container/my/MyRegisterContainer');
var WebApiUtils = require('./app/utils/WebAPIUtils');
var AsyncStorageUtils = require('./app/utils/AsyncStorageUtils');
var Loading = require('./app/components/Loading');
var UserStore = require('./app/stores/UserStore');
var ActionCreators = require('./app/actions/ActionCreators');
var Tabs = require('react-native-tabs');
var MyActivity = require('./app/components/my/MyActivity');
var MyActivityDetail = require('./app/components/my/MyActivityDetail');
var MyBookmarkedShops = require('./app/components/my/MyBookmarkedShops');
var Shop = require('./app/components/Shop');
var MyMessage = require('./app/components/my/MyMessage');
var MyHackStoreName = require('./app/components/my/MyHackStoreName');
var MyHackStoreComment = require('./app/components/my/MyHackStoreComment');
var Mall = require('./app/components/Mall');
var Building = require('./app/components/Building');
var HackCoin = require('./app/components/hack/HackCoin');
var HackAchievement = require('./app/components/hack/HackAchievement');
var MyCardCoupon = require('./app/components/my/MyCardCoupon');
var MyAddress = require('./app/components/my/MyAddress');
var CartCheckout = require('./app/components/CartCheckout');
var HackCreative = require('./app/components/hack/HackCreative');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  InteractionManager,
  Component,
} = React;

function _getStateFromStores () {
    return {
        user: UserStore.getUser(),
        regions:UserStore.getRegions(),
    };
}

var hack10000 = React.createClass({

  getInitialState(){
    return Object.assign({
      isLoading:true
    },_getStateFromStores());
  },

  componentDidMount(){
    UserStore.addChangeListener(this._onChange);

    InteractionManager.runAfterInteractions(() => {
      var self = this;
      AsyncStorageUtils.queryUser(function(user){
        self.setState({isLoading:false});
      });

    });
  },

  componentWillUnmount () {
        UserStore.removeChangeListener(this._onChange);
  },

  onFrontPress(){
    this.refs.nav.resetTo({component:HackLogin,id:'HackLogin'});
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'HackSwiper':
        return (<HackSwiper navigator={nav}/>);
        break;
      case 'HackTab':
        return (<HackTab navigator={nav} user={route.user}/>);
        break;
      // case 'Front':
      //   return (<Front navigator={nav}/>);
      //   break;
      case 'Product':
        return (<Product navigator={nav} pid={route.pid} returnText={route.returnText} isShop={route.isShop} qrCode={route.qrCode}/>);
        break;
      case 'ProductDetail':
        return (<ProductDetail navigator={nav} detail={route.detail}/>);
        break;
      case 'My':
        return (<My navigator={nav}/>);
        break;
      case 'MySetting':
        return (<MySetting navigator={nav} onLogoutPress={route.onLogoutPress}/>);
        break;
      case 'MyBookmarkedProducts':
        return (<MyBookmarkedProducts navigator={nav}/>);
        break;
      case 'MyBookmarkedShops':
        return (<MyBookmarkedShops navigator={nav}/>);
        break;
      case 'MyOrder':
        return (<MyOrder navigator={nav} user={route.user} orderClass={route.orderClass} orderType={route.orderType} returnText={route.returnText}/>)
        break
      case 'MyComment':
        return (<MyComment navigator={nav}/>);
        break;
      case 'MyHack':
        return (<MyHack navigator={nav}/>);
        break;
      case 'MyVendor':
        return (<MyVendor navigator={nav}/>);
        break;
      case 'StoreSubSecond':
        return (<StoreSubSecond navigator={nav}/>);
        break;
      case 'StoreSubPre':
        return (<StoreSubPre navigator={nav}/>);
        break;
      case 'StoreSubPreSale':
        return (<StoreSubPreSale navigator={nav}/>);
        break;
      case 'StoreSubSpecial':
        return (<StoreSubSpecial navigator={nav}/>);
        break;
      case 'MallCatalog':
        return (<MallCatalog navigator={nav} isCreative={route.title}/>);
        break;
      case 'Mall':
        return (<Mall navigator={nav} isCreative={route.isCreative} title={route.title}/>);
        break;
      case 'MyCard':
        return (<MyCard navigator={nav}/>);
        break;
      case 'MyHackGoods':
        return (<MyHackGoods navigator={nav}/>);
        break;
      case 'MyHackCash':
        return (<MyHackCash navigator={nav}/>);
        break;
      case 'MyHackMarket':
        return (<MyHackMarket navigator={nav}/>);
        break;
      case 'MyHackAuth':
        return (<MyHackAuth navigator={nav}/>);
        break;
      case 'MyHackStore':
        return (<MyHackStore navigator={nav}/>);
        break;
      case 'MyHackQrCode':
        return (<MyHackQrCode navigator={nav} hackStore={route.hackStore}/>);
        break;
      case 'MyVendorCash':
        return (<MyVendorCash navigator={nav}/>);
        break;
      case 'MyVendorMarket':
        return (<MyVendorMarket navigator={nav}/>);
        break;
      case 'MyVendorAuth':
        return (<MyVendorAuth navigator={nav}/>);
        break;
      case 'MyVendorStore':
        return (<MyVendorStore navigator={nav}/>);
        break;
      case 'MyVendorPublish':
        return (<MyVendorPublish navigator={nav}/>);
        break;
      case 'MyVendorGoods':
        return (<MyVendorGoods navigator={nav}/>);
        break;
      case 'MyVendorPublishCamera':
        return (<MyVendorPublishCamera navigator={nav}/>);
        break;
      case 'MyVendorPublishDesc':
        return (<MyVendorPublishDesc navigator={nav}/>);
        break;
      case 'MyVendorPublishPosition':
        return (<MyVendorPublishPosition navigator={nav}/>);
        break;
      case 'MyVendorPublishCatalog':
        return (<MyVendorPublishCatalog navigator={nav}/>);
        break;
      case 'HackRegister':
        return (<HackRegister navigator={nav} isForgetPasswd={route.isForgetPasswd}/>);
        break;
      case 'HackLogin':
        return (<HackLogin navigator={nav}/>);
        break;
      case 'BarcodeScanner':
        return (<BarcodeScanner navigator={nav} user={route.user}/>);
        break;
      case 'ForgetPasswd':
        return (<ForgetPasswd navigator={nav}/>);
        break;
      case 'MyProfile':
        return (<MyProfile navigator={nav}/>);
        break;
      case 'MyService':
        return (<MyService navigator={nav}/>);
        break;
      case 'MySettingAbout':
        return (<MySettingAbout navigator={nav}/>);
        break;
      case 'MySettingSecurity':
        return (<MySettingSecurity navigator={nav}/>);
        break;
      case 'MyProfileAddress':
        return (<MyProfileAddress navigator={nav} address={route.address} title={route.title} isModify={route.isModify}/>);
        break;
      case 'MyProfileNickName':
        return (<MyProfileNickName navigator={nav} user={route.user}/>);
        break;
      case 'MySettingSecurityPwd':
        return (<MySettingSecurityPwd navigator={nav} user={route.user}/>);
        break;
      case 'MySettingSecurityEmail':
        return (<MySettingSecurityEmail navigator={nav} user={route.user}/>);
        break;
      case 'MySettingSecurityPhone':
        return (<MySettingSecurityPhone navigator={nav} user={route.user}/>);
        break;
      case 'MySettingSecurityFullName':
        return (<MySettingSecurityFullName navigator={nav} user={route.user}/>);
        break;
      case 'MyVendorPublishImage':
        return (<MyVendorPublishImage navigator={nav} fullName={route.fullName} onFullNamePress={route.onFullNamePress}/>);
        break;
      case 'CatalogProducts':
        return (<CatalogProducts navigator={nav} catalog={route.catalog}/>);
        break;
      case 'MyRegister':
        return (<MyRegister navigator={nav} selectedRegister={route.selectedRegister}/>);
        break;
      case 'MyActivity':
        return (<MyActivity navigator={nav} part={route.part}/>);
        break;
      case 'MyActivityDetail':
        return (<MyActivityDetail navigator={nav} activity={route.activity} user={route.user} regions={route.regions}/>);
        break;
      case 'Shop':
        return (<Shop navigator={nav} qrCode={route.qrCode} isHack={route.isHack} returnText={route.returnText}/>);
        break;
       case 'MyMessage':
        return (<MyMessage navigator={nav}/>);
        break;
      case 'MyHackStoreName':
        return (<MyHackStoreName navigator={nav} user={route.user} hackStore={route.hackStore}/>);
        break;
      case 'MyHackStoreComment':
        return (<MyHackStoreComment navigator={nav} user={route.user} hackStore={route.hackStore}/>);
        break;
      case 'Building':
        return (<Building navigator={nav} title={route.title}/>);
        break;
      case 'HackCoin':
        return (<HackCoin navigator={nav}/>);
        break;
      case 'MyCardCoupon':
        return (<MyCardCoupon navigator={nav}/>);
        break;
      case 'HackAchievement':
        return (<HackAchievement navigator={nav}/>);
        break;
      case 'MyAddress':
        return (<MyAddress navigator={nav}/>);
        break;
      case 'CartCheckout':
        return (<CartCheckout navigator={nav} cartType={route.cartType}/>);
        break;
      case 'HackCreative':
        return (<HackCreative navigator={nav}/>);
        break;
    }
  },

  _onChange () {
        this.setState(_getStateFromStores());
  },

  render() {
      if (this.state.isLoading){
        return <Loading/>;
      }
      var firstScene = 'HackLogin';
      if(this.state.user.isFirst){
        firstScene = 'HackSwiper';
      }else if(this.state.user.isLogined){
        firstScene = 'HackTab';
      }
      return (
        <Navigator ref='nav' 
          initialRoute={{ id: firstScene,user:this.state.user}} style={{flex:1,backgroundColor:'#ffffff'}}
          configureScene={(route) => Navigator.SceneConfigs.FloatFromBottomAndroid}
          renderScene={this.renderScene}/>
      );
  },
  
});

AppRegistry.registerComponent('hack10000', () => hack10000);
