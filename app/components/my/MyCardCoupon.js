"use strict";

var React = require('react-native');
var ArrowBottomBrown = require('../ArrowBottomBrown');
var ArrowBottomRed = require('../ArrowBottomRed');
var ArrowBottomBlue = require('../ArrowBottomBlue');
var NavBar = require('../NavBar');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	TouchableHighlight,
	Modal,
  ListView,
  StatusBarIOS,
}=React;
var win = Dimensions.get('window');

var Coupon = React.createClass({
  render(){
    return(
      <View style={{flexDirection:'row'}}>
        <Image source={this.props.coupon.backgroundImage} style={{flexDirection:'row',width:300,height:75}}>
          <Image source={{uri:this.props.coupon.store.image}} style={{marginLeft:20,width:100,height:75}}/>
          <View style={{backgroundColor:'#transpant',flexDirection:'row'}}>
            <View style={{justifyContent:'space-around'}}>
              <Text style={{color:'#ffffff'}}>{this.props.coupon.store.name}</Text>
              <View>
                <Text style={{color:'#ffffff'}}>使用期限：</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff'}}>{this.props.coupon.coupon.beginDate}</Text>
                  <Text style={{color:'#ffffff'}}>-</Text>
                  <Text style={{color:'#ffffff'}}>{this.props.coupon.coupon.endDate}</Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#ffffff'}}>{this.props.coupon.coupon.amount}</Text>
              <View>
                <Text style={{color:'#ffffff'}}>{this.props.coupon.coupon.text}</Text>
                <Text style={{color:'#ffffff'}}>元优惠券</Text>
              </View>
            </View>
          </View>
        </Image>
        <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff'}}>
          <View style={{height:75,justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{color:this.props.coupon.textColor}}>立即</Text>
              <Text style={{color:this.props.coupon.textColor}}>使用</Text>
              {this.props.coupon.buttonImage}
            </View>
          </TouchableOpacity>
      </View>
    );
  },
});

var MyCardCoupon = React.createClass({
  getInitialState(){
    return {
      coupons:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      invalidateCoupons:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  },
  componentWillMount(){
    var coupons = [
      {
        store:{
          name:'完颜米娜',
          image:'http://www.hack10000.com/Public/app/0483.png',
        },
        coupon:{
          amount:5,
          text:'满20元即可使用',
          beginDate:'2015.11.11',
          endDate:'2015.12.12'
        },
        backgroundImage:require('image!coupon_brown'),
        buttonImage:<ArrowBottomBrown/>,
        textColor:'#ffe400',
      },
      {
        store:{
          name:'完颜米娜',
          image:'http://www.hack10000.com/Public/app/0483.png',
        },
        coupon:{
          amount:5,
          text:'满20元即可使用',
          beginDate:'2015.11.11',
          endDate:'2015.12.12'
        },
        backgroundImage:require('image!coupon_red'),
        buttonImage:<ArrowBottomRed/>,
        textColor:'#ffe400',
      },
    ];
    var invalidateCoupons = [
      {
        store:{
          name:'完颜米娜',
          image:'http://www.hack10000.com/Public/app/0483.png',
        },
        coupon:{
          amount:5,
          text:'满20元即可使用',
          beginDate:'2015.11.11',
          endDate:'2015.12.12'
        },
        backgroundImage:require('image!coupon_blue'),
        buttonImage:<ArrowBottomBlue/>,
        textColor:'#ffe400',
      },
      {
        store:{
          name:'完颜米娜',
          image:'http://www.hack10000.com/Public/app/0483.png',
        },
        coupon:{
          amount:5,
          text:'满20元即可使用',
          beginDate:'2015.11.11',
          endDate:'2015.12.12'
        },
        backgroundImage:require('image!coupon_blue'),
        buttonImage:<ArrowBottomBlue/>,
        textColor:'#ffe400',
      },
    ];

    this.setState({
      coupons:this.state.coupons.cloneWithRows(coupons),
      invalidateCoupons:this.state.coupons.cloneWithRows(invalidateCoupons),
    });
  },
  renderRow(rowData,sectionId,rowId){
    return (
      <Coupon coupon={rowData}/>
      );
  },
  renderSeparator(sectionId,rowId,adjacentRowHighlighted){
    return (
      <View style={{height:7,backgroundColor:'#d2d2d2'}}></View>
      );
  },
  render(){
    var heightRatio = win.height/667;
    var widthRatio = win.width/375;

    return (
      <View style={{flex:1,backgroundColor:'#d2d2d2'}}>
        <NavBar returnText={'我的'} title = {'我的卡券'} navigator={this.props.navigator}/>
        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff',marginHorizontal:10,marginTop:20,borderRadius:5,height:30}}>
          <Text>你有1张优惠券即将过去</Text>
        </View>
        <ListView automaticallyAdjustContentInsets={false} renderSeparator={this.renderSeparator} 
          style={{marginHorizontal:10,marginTop:20,flex:1}}
          dataSource={this.state.coupons} renderRow={this.renderRow}/>
        <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:20}}>
          <View style={{height:2,backgroundColor:'#ffffff',flex:1}}></View>
          <Text>已失效的券</Text>
          <View style={{height:2,backgroundColor:'#ffffff',flex:1}}></View>
        </View>
        <ListView automaticallyAdjustContentInsets={false} style={{marginHorizontal:10,marginTop:20,flex:1}}
          dataSource={this.state.invalidateCoupons} renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}/>
      </View>
      );
  },
});

module.exports = MyCardCoupon;
