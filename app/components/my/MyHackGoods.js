/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');
var NavBar = require('../NavBar');

var {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
	//Dimensions,
	TouchableHighlight,
	//Modal,
  StatusBarIOS,
}=React;

var MyHackGoods = React.createClass({
  propTypes:{
    onPress:React.PropTypes.func,
  },
  getInitialState(){
    return{
      fromOrTo:true,
    };
  },
  toogle(){
    this.setState({fromOrTo:!this.state.fromOrTo});
  },
  render(){
    var fromColor = '#fe0006';
    var toColor = '#292a2d'
    if(!this.state.fromOrTo){
      fromColor = '#292a2d';
      toColor = '#fe0006';
    }
    var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
    var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
    if(Constants.OS === 'ios'){
      StatusBarIOS.setStyle('light-content');
      StatusBarIOS.setHidden(false);
    }
    // <View style={{height:40,flexDirection:'row'}}>
    //         <TouchableHighlight underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
    //           borderBottomColor:'#d2d2d2',alignItems:'center',justifyContent:'center'}}
    //           onPress={()=>this.toogle()}>
    //           <Text style={{fontSize:13,color:fromColor}}>出售中(2)</Text>
    //         </TouchableHighlight>
    //         <View style={{height:25,width:1,backgroundColor:'#d2d2d2'}}></View>
    //         <TouchableHighlight underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
    //           borderBottomColor:'#d2d2d2',alignItems:'center',justifyContent:'center'}}
    //           onPress={()=>this.toogle()}>
    //           <Text style={{fontSize:13,color:toColor}}>待上架(2)</Text>
    //         </TouchableHighlight>
    //       </View>

    // <View style={{height:35,alignItems:'center',justifyContent:'center'}}>
    //             <Text>暂时不支持在手机上编辑</Text>
    //           </View>
    return(
        <View style={{flex:1}}>
          <NavBar returnText={'创客'} title = {'我的商品'} navigator={this.props.navigator}/>
          <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#f5f2f2'}}>
            <View style={{backgroundColor:'#ffffff'}}>
              <View style={{flexDirection:'row',marginLeft:12,borderBottomWidth:1,borderBottomColor:'#d2d2d2'}}>
                <Image source={{uri:'http://www.hack10000.com/Public/app/0471.png'}} style={{width:75,height:75}}/>
                <View style={{marginLeft:12,justifyContent:'space-around',height:75,}}>
                  <Text style={{width:170}} numberOfLines={2}>经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋经典雕花皮鞋</Text>
                  <Text>已售：235  库存：365</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
  },
});

module.exports = MyHackGoods;
