/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');

var {
	StyleSheet,
	Text,
	View,
	Image,
	//TextInput,
	TouchableOpacity,
	//ScrollView,
	//Dimensions,
	//Modal,
  ListView,
  StatusBarIOS,
}=React;

var MyComment = React.createClass({
  propTypes:{
    onPress:React.PropTypes.func,
  },
  getInitialState(){
    return{
      fromOrTo:true,
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!== r2}),
    };
  },
  componentDidMount(){
    this.onFromPress();
  },
  onFromPress(){
    var comment = [
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
    ];
    
    this.setState({dataSource:this.state.dataSource.cloneWithRows(comment),fromOrTo:true});
  },
  onToPress(){
    var comment = [
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'他人－爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'他人－爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'他人－爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'他人－爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
      {
        image:'http://www.hack10000.com/Public/app/0471.png',
        title:'他人－爆款秒杀＋红包，根本停不下来',
        text:'双11影音秒杀专场，每天数码爆款秒杀，抢现金红包，领取大额优惠券',
        data:'2015-11-11 11:11:11',
      },
    ];

    this.setState({dataSource:this.state.dataSource.cloneWithRows(comment),fromOrTo:false});
  },
  renderRow(rowData,sectionId,RowId){
    return (
      <View>
        <TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image style={{marginLeft:15,width:65,height:65}} source={{uri:rowData.image}}/>
                <View style={{marginLeft:5,justifyContent:'center'}}>
                  <Text>{rowData.title}</Text>
                  <Text numberOfLines={3} style={{width:170}}>{rowData.text}</Text>
                </View>
            </View>
            <Image style={{marginRight:33}} source={require('image!arrow_right_black')}/>
          </View>
        </TouchableOpacity>
        <View style={{alignItems:'flex-end',marginRight:15}}>
          <Text>{rowData.date}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:20}}>
          <TouchableOpacity style={{marginRight:50}}>
            <Image source={require('image!bin_black')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:50}}>
            <Image source={require('image!message_white')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  renderSeparator(sectionId,rowId,adjacentRowHighlighted){
    return (
      <View style={{height:5,backgroundColor:'#f5f2f2'}}></View>
      );
  },
  render(){
    var fromOtherColor = '#ffffff';
    var toOtherColor = '#f5f2f2'
    if(this.state.fromOrTo){
      fromOtherColor = '#f5f2f2';
      toOtherColor = '#ffffff';
    }
    var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
    var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
    if(Constants.OS === 'ios'){
      StatusBarIOS.setStyle('light-content');
      StatusBarIOS.setHidden(false);
    }
    return(
        <View style={{flex:1}}>
          <View style={{backgroundColor:'#292a2d',justifyContent:'center',height:height,paddingTop:paddingTop}}>
            <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image style={{marginLeft:15,width:10,height:16}} source={require('image!arrow_left_yellow')}/>
                  <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>评价管理</Text>
                </View>
              </TouchableOpacity>
          </View>
          <View style={{height:40,flexDirection:'row'}}>
            <TouchableOpacity underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
              borderBottomColor:'#d2d2d2',backgroundColor:fromOtherColor,alignItems:'center',justifyContent:'center'}}
              onPress={this.onFromPress}>
              <Text>来自他人的评价</Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor='#f5f2f2' style={{flex:1,borderBottomWidth:1,
              borderBottomColor:'#d2d2d2',backgroundColor:toOtherColor,alignItems:'center',justifyContent:'center'}}
              onPress={this.onToPress}>
              <Text>给他人的评价</Text>
            </TouchableOpacity>
          </View>
          <ListView automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource} 
          renderSeparator={this.renderSeparator}
          renderRow={this.renderRow}/>
        </View>
      );
  },
});

module.exports = MyComment;