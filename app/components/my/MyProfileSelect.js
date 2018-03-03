/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

"use strict";

var React = require('react-native');
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
  PickerIOS,
  StatusBarIOS,
}=React;


var PickerItemIOS = PickerIOS.Item;

var PROVINCE_CITY_REGION = [
  {
    id:1,
    name:'云南省',
    city:[
      {
        id:11,
        name:'昆明市',
        region:[
          {
            id:111,
            name:'盘龙区'
          },
          {
            id:112,
            name:'五华区'
          },
        ],
      },
      {
        id:12,
        name:'昭通',
        region:[
          {
            id:121,
            name:'朝阳区'
          },
          {
            id:122,
            name:'鲁甸显'
          },
        ],
      },
    ],
  },
  {
    id:2,
    name:'浙江省',
    city:[
      {
        id:21,
        name:'衢州市',
        region:[
          {
            id:211,
            name:'柯城区'
          },
          {
            id:212,
            name:'衢江区'
          },
        ],
      },
      {
        id:22,
        name:'杭州市',
        region:[
          {
            id:221,
            name:'西湖区'
          },
          {
            id:222,
            name:'灵隐寺'
          },
        ],
      },
    ],
  },
];
var MyProfileSelect = React.createClass({
  propTypes:{
    onPress:React.PropTypes.func,
    province:React.PropTypes.number,
    city:React.PropTypes.number,
    region:React.PropTypes.number,
  },
  getInitialState(){
    return{
      province: this.props.province,
      city: this.props.city,
      region:this.props.region,
    };
  },
  _onReturnPress(){
    this.props.onPress(this.state.province,this.state.city,this.state.region);
  },

  render(){
    return (
      <View style={{paddingTop:20,flex:1,backgroundColor:'#d2d2d2'}}>
        <View style={{backgroundColor:'#292a2d',justifyContent:'center',height:45}}>
          <TouchableHighlight onPress={()=>this._onReturnPress()}>
            <View style={{flexDirection:'row'}}>
              <Image style={{marginLeft:15,width:10,height:16}} source={require('image!arrow_left_yellow')}/>
              <Text style={{fontSize:15,color:'#ffe400',marginLeft:15}}>{PROVINCE_CITY_REGION[this.state.province].name + 
              PROVINCE_CITY_REGION[this.state.province].city[this.state.city].name+
              PROVINCE_CITY_REGION[this.state.province].city[this.state.city].region[this.state.region].name}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <PickerIOS
              selectedValue={this.state.province}
              onValueChange={(province) => this.setState({province, city: 0,region:0})}>
              {Object.keys(PROVINCE_CITY_REGION).map((province,provinceIdx) => (
                <PickerItemIOS
                  key={provinceIdx}
                  value={provinceIdx}
                  label={PROVINCE_CITY_REGION[provinceIdx].name}
                  />
                )
              )}
            </PickerIOS>  
        <PickerIOS
              selectedValue={this.state.city}
              key={this.state.province}
              onValueChange={(city) => this.setState({city:city,region:0})}>
              {PROVINCE_CITY_REGION[this.state.province].city.map(
                (city, cityIdx) => (
                  <PickerItemIOS
                    key={this.state.province + '_' + cityIdx}
                    value={cityIdx}
                    label={PROVINCE_CITY_REGION[this.state.province].city[cityIdx].name}
                  />
                ))
              }
            </PickerIOS>
        <PickerIOS
              selectedValue={this.state.region}
              key={this.state.province+'_'+this.state.city}
              onValueChange={(region) => this.setState({region:region})}>
              {PROVINCE_CITY_REGION[this.state.province].city[this.state.city].region.map(
                (region, regionIdx) => (
                  <PickerItemIOS
                    key={this.state.province + '_' + this.state.city+'_'+regionIdx}
                    value={regionIdx}
                    label={PROVINCE_CITY_REGION[this.state.province].city[this.state.city].region[regionIdx].name}
                  />
                ))
              }
            </PickerIOS>
      </View>
      );
  },
});

module.exports = MyProfileSelect;
