"use strict";

var React = require('react-native');
var MyButton = require('./MyButton');
var MyVendorCash = require('./MyVendorCash');
var MyVendorMarket = require('./MyVendorMarket');
var MyVendorAuth = require('./MyVendorAuth');
var MyVendorStore = require('./MyVendorStore');
var MyOrder = require('./MyOrder');
var MyVendorGoods = require('./MyVendorGoods');
var MyVendorPublish = require('./MyVendorPublish');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
}=React;

var MyVendor = React.createClass({
  onMyVendorCash(){
    this.props.navigator.push({component:MyVendorCash,id:'MyVendorCash'});
  },
  onMyVendorMarket(){
    this.props.navigator.push({component:MyVendorMarket,id:'MyVendorMarket'});
  },
  onMyVendorAuth(){
    this.props.navigator.push({component:MyVendorAuth,id:'MyVendorAuth'});
  },
  onMyVendorStore(){
    this.props.navigator.push({component:MyVendorStore,id:'MyVendorStore'});
  },
  onMyVendorOrderPress(){
    this.props.navigator.push({id:'MyOrder',component:MyOrder});
  },
  getInitialState(){
    return {
      vendor:{},
    };
  },
  componentDidMount(){
    var vendor = {
      name:'完颜米娜',
      level:'5',
      image:'www.hack10000.com/Public/app/0417.png',
      curAmount:'1000.00',
      curOrder:'2',
    };

    this.setState({vendor:vendor});
  },
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#292a2d',justifyContent:'center',height:Constants.NAVHEIGHT+Constants.STATUSHEIGHT,paddingTop:Constants.STATUSHEIGHT}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image style={{marginLeft:15,width:10,height:16}} source={require('image!arrow_left_yellow')}/>
                  <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>供应商</Text>
                </View>
              </TouchableOpacity>
        </View>
        <View style={{height:125*Constants.HEIGHTRATIO}}>
            <Image style={{flex: 1,justifyContent: 'flex-end',backgroundColor: 'transparent',width:null,height:null}} 
              source={require('image!background_my')}>
              <View style={{flexDirection:'row',marginLeft:100}}>
                <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>{this.state.vendor.name}</Text>
                <Image style={{marginLeft:3,marginBottom:15,alignItems:'center',justifyContent:'center',width:15,height:15}} 
                  source={require('image!dot_yellow')}>
                  <Text style={{fontSize:10}}>V{this.state.vendor.level}</Text>
                </Image>
              </View>
            </Image>
        </View>
        <View style={{height:50*Constants.HEIGHTRATIO,flexDirection:'row',backgroundColor:'#292a2d',alignItems:'center',justifyContent:'space-between'}}>
          <Image style={{marginLeft:15,marginBottom:45,width:75,height:75}} source={{uri:'http://www.hack10000.com/Public/app/0417.png'}}/>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <View>
                <Text style={{fontSize:15,color:'#ffe400'}}>今日成交额</Text>
                <Text style={{fontSize:15,color:'#ffe400'}}>￥{this.state.vendor.curAmount}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height:35*Constants.HEIGHTRATIO,width:1,backgroundColor:'#d2d2d2'}}></View>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#ffe400'}}>今日订单</Text>
                <Text style={{fontSize:15,color:'#ffe400'}}>{this.state.vendor.curOrder}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:45*Constants.HEIGHTRATIO,borderBottomWidth:1,borderBottomColor:'#d2d2d2',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{marginLeft:20}}>
            <TouchableOpacity onPress={this.onMyVendorOrderPress}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('image!order_all')} style={{width:22,height:22}}/>
                <Text style={{fontSize:13,color:'#292a2d',marginLeft:10}}>全部订单</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginRight:20}}>
            <TouchableOpacity onPress={this.onMyVendorOrderPress}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:12,color:'#898a8b'}}>查看全部订单</Text>
                <Image style={{marginLeft:10,width:10,height:10}} source={require('image!arrow_right_grey')}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:75*Constants.HEIGHTRATIO,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <MyButton image={require('image!wallet')} text={'待付款'} num={true} quantity={1}/>
          <MyButton image={require('image!box')} text={'待发货'} num={true} quantity={2}/>
          <MyButton image={require('image!chunk')} text={'待收货'} num={false} quantity={3}/>
          <MyButton image={require('image!heart_black')} text={'待评价'} num={true} quantity={4}/>
          <MyButton image={require('image!money_black')} text={'退款/售后'} num={true} quantity={5}/>
        </View>
        <View style={{backgroundColor:'#d2d2d2',flex:1}}>
          <View style={{marginTop:10,backgroundColor:'#ffffff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5*Constants.HEIGHTRATIO}}>
              <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorPublish,id:'MyVendorPublish'})}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!arrow_top_white')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>发布商品</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyVendorGoods,id:'MyVendorGoods'})}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!bag_red')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>供品管理</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onMyVendorCash}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!money_white_brown')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>我的资产</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5*Constants.HEIGHTRATIO,marginBottom:5*Constants.HEIGHTRATIO}}>
              <TouchableOpacity onPress={this.onMyVendorMarket}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!pen_green')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>营销推广</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onMyVendorAuth}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!word_zheng')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>认证管理</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onMyVendorStore}>
                <View style={{alignItems:'center'}}>
                  <Image source={require('image!option_white')} style={{height:70*Constants.HEIGHTRATIO,width:70*Constants.WIDTHRATIO}} resizeMode='contain'/>
                  <Text style={{fontSize:13,color:'#202a2d',marginTop:10}}>设置</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{height:50*Constants.HEIGHTRATIO,marginTop:10,alignItems:'center',justifyContent:'center',backgroundColor:'#ffe400'}}>
            <Text style={{fontSize:25,color:'#ffffff'}}>进入创客商城</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
  },
});

module.exports = MyVendor;