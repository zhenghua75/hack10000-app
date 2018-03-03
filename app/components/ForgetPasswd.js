"use strict";

var React = require('react-native');
var UserStore = require('../stores/UserStore');
var ActionCreators = require('../actions/ActionCreators');
var ForgetPasswd = require('./ForgetPasswd');
var Constants = require('../constants/AppConstants');

var {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  AlertIOS,
  AsyncStorage,
  StatusBarIOS,
}=React;

function _getStateFromStores () {
    return {
        userName: '',
        passwd: '',
        confirmPasswd:'',
        validateCode:'',
    };
}

var ForgetPasswdContainer = React.createClass({
  getInitialState(){
    return _getStateFromStores();
  },
  componentDidMount(){
    UserStore.addChangeListener(this._onChange);

    InteractionManager.runAfterInteractions(() => {
        this.setState({isLoading:false});
      });
  },
    _onChange: function () {
        this.setState(_getStateFromStores());
    },
    componentWillUnmount: function () {
        UserStore.removeChangeListener(this._onChange);
    },
    onResetPasswdPress(){
      // if(this.state.pwd !== this.state.confirmPwd){
      //  AlertIOS.alert('注册','两次输入的密码不一致');
      //  return;
      // }
      // let validateCode = '123456'
      // if(this.state.validateCode !== validateCode){
      //  AlertIOS.alert('注册','输入的验证码不正确');
      //  return;
      // }

      // try{
      //   AsyncStorage.setItem(HackConstants.HACK_LOGINED,'true').then(()=>{
      //     GlobalConstants.ISLOGINED = 'true';
      //     this.props.navigator.resetTo({component:HackTab,id:'HackTab',passProps:{onFrontPress:this.props.onFrontPress}});
      //   });
      // }catch(error){console.log(error);}

      // ActionCreators.userRegister(this.state.userName,this.state.passwd,this.state.validateCode,()=>{
      //   //this.props.navigator.resetTo({component:HackTab,id:'HackTab',passProps:{onFrontPress:this.props.onFrontPress}});
      // });
    },
    onLoginPress(){
      // if(Constants.OS==='ios'){
      //   this.props.onLoginPress();
      // }
      // this.props.navigator.push({id:'HackLogin'});
      this.props.navigator.pop();
    },
    onUserNameChange(userName){
      this.setState({userName:userName});
    },
    onPasswdChange(passwd){
      this.setState({passwd:passwd});
    },
    onConfirmPasswdChange(confirmPasswd){
      this.setState({confirmPasswd:confirmPasswd});
    },
    onValidateCodeChange(validateCode){
      this.setState({validateCode:validateCode});
    },
    onValidateCodePress(){},
    render(){
      return(
      <Image style={{flex: 1,justifyContent: 'center',backgroundColor: 'transparent',width:null,height:null,paddingHorizontal:33}} 
        source={require('image!background_login')}>
          <View style={{flexDirection:'row',borderWidth:2,borderColor:'#ffe400',borderRadius:5,
             height:58,justifyContent:'center',alignItems:'center'}}>
            <TextInput placeholder={'请输入手机号'} placeholderTextColor='#ffe400'  
              value={this.state.userName} 
              onChangeText={(text) => this.onUserNameChange(text)}
            style={{height:58,fontSize:20,flex:1,color:'#ffe400',borderRadius:5}}/>
          </View>
          <View style={styles.split}></View>
          <View style={{flexDirection:'row',borderWidth:2,borderColor:'#ffe400',borderRadius:5,
             height:58,justifyContent:'center',alignItems:'center'}}>
            <TextInput placeholder={'新密码'} secureTextEntry={true} password={true} placeholderTextColor='#ffe400' 
              value={this.state.passwd} onChangeText={(text) => this.onPasswdChange(text)}
              style={{height:58,fontSize:20,flex:1,color:'#ffe400',borderRadius:5}}/>
          </View>
          <View style={styles.split}></View>
          <View style={{flexDirection:'row',borderWidth:2,borderColor:'#ffe400',borderRadius:5,
             height:58,justifyContent:'center',alignItems:'center'}}>
            <TextInput placeholder={'请再次输入您的密码'} secureTextEntry={true} password={true} placeholderTextColor='#ffe400' 
              value={this.state.confirmPasswd} onChangeText={(text) => this.onConfirmPasswdChange(text)}
              style={{height:58,fontSize:20,flex:1,color:'#ffe400',borderRadius:5}}/>
          </View>
          <View style={styles.split}></View>
          <View style={{flexDirection:'row',borderWidth:2,borderColor:'#ffe400',borderRadius:5,
             height:58,justifyContent:'center',alignItems:'center'}}>
            <TextInput placeholder='请输入验证码' placeholderTextColor='#ffe400' 
              value={this.state.validateCode} onChangeText={(text) => this.onValidateCodeChange(text)}
              style={{height:58,fontSize:20,flex:1,color:'#ffe400',borderRadius:5}}/>
            <TouchableHighlight underlayColor='#8b8b8b' style={{borderRadius:5,height:50,justifyContent:'center',
              alignItems:'center',backgroundColor: '#292a2d',margin:4,width:95}}
              onPress={this.onValidateCodePress}>
                    <Text style={{color:'#ffe400',fontSize:15}}>获取验证码</Text>
                </TouchableHighlight>
          </View>
                <View style={styles.split}></View>
                <TouchableHighlight underlayColor='#8b8b8b' 
                  style={{borderRadius:5,height:58,justifyContent:'center',alignItems:'center',backgroundColor: '#292a2d'}} 
                  onPress={this.onResetPasswdPress}>
                 <Text style={{color:'#ffe400',fontSize:30}}>{'重置密码'}</Text>
              </TouchableHighlight>
                <View style={styles.split}></View>
                <TouchableHighlight underlayColor='#8b8b8b' 
                  style={{borderRadius:5,height:58,justifyContent:'center',alignItems:'center',backgroundColor: '#292a2d'}} 
                  onPress={this.onLoginPress}>
                  <Text style={{color:'#ffe400',fontSize:30}}>{'登录'}</Text>
                </TouchableHighlight>
      </Image>
    );
  },
});

var styles = StyleSheet.create({
  split:{
    height:20
  },
});

 module.exports = ForgetPasswdContainer;