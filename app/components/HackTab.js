"use strict";

var React = require('react-native');
var Tabs = require('react-native-tabs');
var Shop = require('./Shop');
var CartContainer = require('./CartContainer');
var My = require('./My');
var Constants = require('../constants/AppConstants');
var WebApiUtils = require('../utils/WebAPIUtils');
var UserStore = require('../stores/UserStore');
var MyHack = require('./my/MyHack');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Navigator,
  TabBarIOS,
  ViewPagerAndroid,
  ToolbarAndroid,
}=React;

var TabIcon = React.createClass({
  render(){
    return(
      <View name={this.props.name} style={{alignItems:'center'}}>
                <Image source={this.props.selected?this.props.image1:this.props.image2} style={{width:22,height:22}}/>
                <Text style={{color:this.props.selected?'#d2d2d2':'#ffe400',fontSize:11}}>{this.props.title}</Text>
              </View>
      );
  },
});

var routeStatck = [
            {id:'hack'},
            {id:'shop'},
            {id:'cart'},
            {id:'my'},
            ];

var HackTabAndroid = React.createClass({
  onTabPress(el) {

    var tab = el.props.name;
    this.props.onTabPress(tab);
    var tabs = {'hack':0,'shop':1,'cart':2,'my':3};
    var page = tabs[tab];
    this.refs.nav.jumpTo(routeStatck[page]);
    
    return {selected: true};
  },
  renderScene(route, nav) {
    switch (route.id) {
      case 'hack':
        return <MyHack navigator={this.props.navigator}/>;
        break;
      case 'shop':
        return <Shop navigator={this.props.navigator}/>;
        break;
      case 'cart':
        return <CartContainer navigator={this.props.navigator}/>;
        break;
      case 'my':
        return <My navigator={this.props.navigator}/>;
        break;
    }
  },
  render() {
      return (
        <View style={{flex:1}}>
          <Navigator ref='nav' style={{flex:1,marginBottom:49}}
            renderScene={this.renderScene} initialRouteStack={routeStatck}/>
          <Tabs selected={this.props.selectedTab} style={{backgroundColor:'#292a2d'}}
                onSelect={this.onTabPress}>
                <TabIcon key={'tab1'} name='hack' selected={this.props.selectedTab==='hack'} image1={require('image!hack_grey')} image2={require('image!hack_yellow')} title={'创客时空'}/>
                <TabIcon key={'tab2'} name='shop' selected={this.props.selectedTab==='shop'} image1={require('image!house_grey_flat')} image2={require('image!house_yellow_3')} title={'隔空对望'}/>
                <TabIcon key={'tab3'} name='cart' selected={this.props.selectedTab==='cart'} image1={require('image!cart_grey')} image2={require('image!cart_yellow')} title={'购物车'}/>
                <TabIcon key={'tab4'} name='my'   selected={this.props.selectedTab==='my'} image1={require('image!man_grey')} image2={require('image!man_yellow')} title={'我的'}/>
          </Tabs>
        </View>
      );
  }
});

var HackTabIOS = React.createClass({
  render() {
    return (
      <View style={{flex:1}}>
        <TabBarIOS
          tintColor='#ffe400'
          barTintColor="#292a2d"
          translucent={true}>
          <TabBarIOS.Item
            title="商城"
            icon={require('image!bag_yellow')}
            selected={this.props.selectedTab === 'mall'}
            onPress={() => this.props.onTabPress('mall')}>
            <MyHack navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="店铺"
            icon={require('image!house_yellow_3')}
            selected={this.props.selectedTab === 'shop'}
            onPress={() => this.props.onTabPress('shop')}>
            <ShopContainer navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={require('image!cart_yellow')}
            title="购物车"
            selected={this.props.selectedTab === 'cart'}
            onPress={() => this.props.onTabPress('cart')}>
            <CartContainer navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={require('image!man_yellow')}
            title="我的"
            selected={this.props.selectedTab === 'my'}
            onPress={() => this.props.onTabPress('my')}>
            <MyContainer navigator={this.props.navigator} onFrontPress={this.props.onFrontPress}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
});

var HackTab = React.createClass({
  getInitialState(){
    return {
      selectedTab:'my',
      user:UserStore.getUser(),
    };
  },
  onTabPress(tab){
    this.setState({selectedTab:tab});
    switch(tab){
      case 'my':
        WebApiUtils.getUserOrdersQuantity(this.state.user,function(){});
      break;
      case 'cart':
        var cartType = this.state.user.isHack?'vendor':'store';
        WebApiUtils.cartReceiveProducts(cartType,this.state.user,(success)=>{
        });
      break;
      case 'shop':
        console.log(this.state.user.qrCode);
        if(this.state.user.qrCode!= undefined && this.state.user.qrCode !== ''  ){
          WebApiUtils.receiveShop(this.state.user,this.state.user.qrCode,function(){});
        }
      break;
      case 'hack':
        WebApiUtils.getHackStore(this.state.user,function(){
        });

        WebApiUtils.getHackOrdersQuantity(this.state.user,function(){});
      break;
    }
  },
  render(){
      if(Constants.OS === 'ios'){
        return (
          <HackTabIOS 
            selectedTab={this.state.selectedTab} 
            onTabPress={this.onTabPress} 
            navigator={this.props.navigator}
            onFrontPress={this.props.onFrontPress}/>
        );
      }
      return (
        <HackTabAndroid 
          selectedTab = {this.state.selectedTab} 
          onTabPress={this.onTabPress} 
          navigator={this.props.navigator}/>
      );
  },
});

module.exports = HackTab;
