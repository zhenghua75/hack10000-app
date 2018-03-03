/**
*创客tab页
*@Author zhenghua
*2015-11-23
**/

"use strict";

var React = require('react-native');
var Constants = require('../../constants/AppConstants');
var Modal   = require('react-native-modalbox');
var ArrowLeftYellow = require('../ArrowLeftYellow');
var ArrowRightGrey = require('../ArrowRightGrey');
var UserStore = require('../../stores/UserStore');
var WebApiUtils = require('../../utils/WebAPIUtils');
var MyWebView = require('./MyWebView');

var Portal = require('react-native/Libraries/Portal/Portal');

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
	//Modal,
  StatusBarIOS,
}=React;
var portal_my_agreement:any;
function _getStateFromStores () {
    return {
        agreementHtml:UserStore.getAgreement(),
        user:UserStore.getUser(),
    };
}
var MyAgreement = React.createClass({
  render(){
    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:44,alignItems:'center',
                backgroundColor:'#292a2d'}}>
                <TouchableOpacity onPress={this.props.onClosePress} style={{flex:1,paddingHorizontal:11}}>
                  <Text style={{color:'white'}}>取消</Text>
                </TouchableOpacity>
                <Text style={{flex:1,fontSize:18,color:'#ffe400'}} numberOfLines={1}>{this.props.title}</Text>
                <View style={{flex:1}}></View>
            </View>
            <ScrollView style={{flex:1,backgroundColor:'#ffffff',padding:11}}>
      <Text style={{fontSize:16}}>软件许可使用协议</Text>
      <Text style={{fontSize:14}}>•提示条款</Text>
      <Text style={{fontSize:11}}>本软件许可使用协议（以下称"本协议"）由您与云南楠儿投资咨询有限公司（以下称“我们”）共同签署。 
      在使用“ 慧爱创客 ”软件（以下称许可软件）之前，请您仔细阅读本协议，特别是免除或者限制责任的条款、法律适用和争议解决条款。
      免除或者限制责任的条款将以粗体标识，您需要重点阅读。如您对协议有任何疑问，可向客服咨询。如果您同意接受本协议条款和条件的约束，
      您可下载安装使用许可软件。 由于互联网高速发展，您与我们签署的本协议列明的条款并不能完整罗列并覆盖您与我们所有权利与义务，
      现有的约定也不能保证完全符合未来发展的需求。因此，慧爱创客平台《慧爱创客手册》、慧爱创客平台规则均为本协议的补充协议，
      与本协议不可分割且具有同等法律效力。如您使用许可软件，视为您同意上述补充协议。如您注册或登录慧爱创客账户，针对您在使用慧爱创客平台服务过程中与我们的权利义务，
      您与我们可适用《慧爱创客手册》。 我们如修改本协议或其补充协议，协议条款修改后，请您仔细阅读并接受修改后的协议后再继续使用许可软件。</Text>

      <Text style={{fontSize:14}}>一、 定义</Text>
      <Text style={{fontSize:11}}>许可软件：是指由我们开发的，供您从下载平台下载，并仅限在相应系统手持移动终端中安装、使用的软件系统。</Text>
      <Text style={{fontSize:11}}>慧爱创客服务：由云南慧爱大学生创业就业服务中心为您提供的服务。您可以通过许可软件在手持移动终端使用慧爱创客服务。</Text>

      <Text style={{fontSize:14}}>二、 授权范围</Text>
      <Text style={{fontSize:11}}>由于软件适配平台及终端限制，您理解您仅可在获授权的系统平台及终端使用许可软件，如您将许可软件安装在其他终端设备上
      （包括台式电脑、手提电脑、或授权终端外的其他手持移动终端、电视机及机顶盒等），可能会对您硬件或软件功能造成损害。
      您应该理解许可软件仅可用于非商业目的，您不可为商业运营目的安装、使用、运行许可软件。
      我们会对许可软件及其相关功能不时进行变更、升级、修改或转移，并会在许可软件系统中开发新的功能或其它服务。上述新的功能、软件服务如无独立协议的，您仍可取得相应功能或服务的授权，并可适用本协议。
      </Text>

      <Text style={{fontSize:14}}>三、 使用规范</Text>
      <Text style={{fontSize:11}}>您应该规范使用许可软件，以下方式是违反使用规范的： </Text>
      <Text style={{fontSize:11}}>1). 从事违反法律法规政策、破坏公序良俗、损害公共利益的行为。 </Text>
      <Text style={{fontSize:11}}>2). 对许可软件及其中的相关信息擅自出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点，借助许可软件发展与之有关的衍生产品、作品、服务、插件、外挂、兼容、互联等。 </Text>
      <Text style={{fontSize:11}}>3). 通过非由我们及其关联公司开发、授权或认可的第三方兼容软件、系统登录或使用许可软件，或针对许可软件使用非我们及其关联公司开发、授权或认证的插件和外挂。 </Text>
      <Text style={{fontSize:11}}>4). 删除许可软件及其他副本上关于版权的信息、内容。修改、删除或避开应用产品中我们为保护知识产权而设置的任何技术措施。 </Text>
      <Text style={{fontSize:11}}>5). 未经我们的书面同意，擅自将许可软件出租、出借或再许可给第三方使用，或在获得许可软件的升级版本的许可使用后，同时使用多个版本的许可使用版本，或分开转让。 </Text>
      <Text style={{fontSize:11}}>6). 复制、反汇编、修改许可软件或其任何部分或制造其衍生作品；对许可软件或者许可软件运行过程中释放在终端中的任何数据及许可软件运行过程中终端与服务器端的交互数据进行复制、修改、挂接运行或创作任何衍生作品，
      包括使用插件、外挂或非经授权的第三方工具/服务接入许可软件和相关系统等形式。 </Text>
      <Text style={{fontSize:11}}>7). 进行任何危害信息网络安全的行为，包括使用许可软件时以任何方式损坏或破坏许可软件或使其不能运行或超负荷或干扰第三方对许可软件的使用；未经允许进入他人计算机系统并删除、修改、增加存储信息；
      故意传播恶意程序或病毒以及其他破坏、干扰正常网络信息服务的行为。 </Text>
      <Text style={{fontSize:11}}>8). 利用许可软件发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容，或从事欺诈、盗用他人账户、资金等违法犯罪活动。 </Text>
      <Text style={{fontSize:11}}>9) 通过修改或伪造许可软件运行中的指令、数据、数据包，增加、删减、变动许可软件的功能或运行效果，及/或将具有上述用途的软件通过信息网络向公众传播或者运营。 </Text>
      <Text style={{fontSize:11}}>10) 其他以任何不合法的方式、为任何不合法的目的、或以任何与本协议不一致的方式使用许可软件。</Text>
      <Text style={{fontSize:11}}>您理解并同意 </Text>
      <Text style={{fontSize:11}}>1) 我们会对您是否涉嫌违反上述使用规范做出认定，并根据认定结果中止、终止对您的使用许可或采取其他依约可采取的限制措施。 </Text>
      <Text style={{fontSize:11}}>2) 对于您使用许可软件时发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议的信息，我们会直接予以删除。 </Text>
      <Text style={{fontSize:11}}>3) 对于您违反上述使用规范的行为对任意第三方造成损害的，您需要以自己的名义独立承担法律责任，并应确保我们免于因此产生损失或增加费用。 </Text>
      <Text style={{fontSize:11}}>4) 如您违反有关法律或者本协议之规定，使我们遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿我们因此造成的损失及（或）发生的费用，包括合理的律师费用、调查取证费用。</Text>

      <Text style={{fontSize:14}}>四、 第三方软件或服务</Text>
      <Text style={{fontSize:11}}>许可软件可能使用或包含了由第三方提供的软件或服务（以下称该等服务），该等服务是为了向您提供便利而设置，是取得该第三方的合法授权的。
      由于第三方为其软件或服务的提供者，您使用该等服务时，应另行与该第三方达成服务协议，支付相应费用并承担可能的风险。您应理解我们并无权在本协议中授予您使用该等服务的任何权利，也无权对该等服务提供任何形式的保证。
      我们无法对该等服务提供客户支持，如果您需要获取支持，您可直接与该第三方联系。因您使用该等服务引发的任何纠纷，您可直接与该第三方协商解决。
      您理解许可软件仅在当前使用或包含该等服务，我们无法保证许可软件将会永久地使用或包含该等服务，也无法保证将来不会使用或包含该第三方的同类型或不同类型的软件或服务或其他第三方的软件或服务，
      一旦我们在许可软件中使用或包含前述软件或服务，相应的软件或服务同样适用本条约定。
      您理解第三方需要与我们进行您的信息交互以便更好地为您提供服务，您同意在使用许可软件时如使用该等服务的，您授权我们依据 《慧爱创客手册》将您使用许可软件的信息传递给该第三方，
      或从该第三方获取您注册或使用该等服务时提供或产生的信息。如果您不希望第三方获取您的信息的，您可停止使用该等服务，我们将停止向第三方传递您的信息。
      您同意，如果该第三方确认您违反了您与其之间关于使用该等服务的协议约定停止对您提供该等服务并要求我们处理的，由于停止该等服务可能会影响您继续使用许可软件，
      我们可能会中止、终止对你的使用许可或采取其他我们可对您采取的限制措施。</Text>

      <Text style={{fontSize:14}}>五、 隐私政策与数据</Text>
      <Text style={{fontSize:11}}>保护您的个人信息对我们很重要。我们制定了《法律声明及隐私权政策》对知识产权归属及保护、您的信息收集、使用、共享、存储、保护等方面关系您切身利益的内容进行了重要披露。
      我们建议您完整地阅读《法律声明及隐私权政策》（点击查看），以帮助您更好的保护您的个人信息。</Text>

      <Text style={{fontSize:14}}>六、 特别授权</Text>

      <Text style={{fontSize:11}}>您对您的个人信息依法拥有权利，并且可以通过查阅《法律声明及隐私权政策》了解我们对您的个人信息的保护及处理方式。对您提供的除个人信息外的信息，为了向您提供您使用的各项服务，
      并维护、改进这些服务，及优化我们的服务质量等用途，对于您提交的文字、图片和视频等受知识产权保护的内容，您同意授予我们排他的、可转让、可分发次级许可、无使用费的全球性许可，
      用于我们及我们关联公司使用、复制、修订、改写、发布、翻译、分发、执行和展示您提交的资料数据或制作派生作品。</Text>

      <Text style={{fontSize:14}}>七、 无担保和责任限制</Text>

      <Text style={{fontSize:11}}>除法律法规有明确规定外，我们将尽最大努力确保许可软件及其所涉及的技术及信息安全、有效、准确、可靠，但受限于现有技术，您理解我们不能对此进行担保。
      您理解，对于不可抗力及第三方原因导致的您的直接或间接损失，我们无法承担责任。
      由于您因下述任一情况所引起或与此有关的人身伤害或附带的、间接的损害赔偿，包括但不限于利润损失、资料损失、业务中断的损害赔偿或其它商业损害赔偿或损失，需由您自行承担： </Text>
      <Text style={{fontSize:11}}>1) 使用或未能使用许可软件； </Text>
      <Text style={{fontSize:11}}>2) 第三方未经批准的使用许可软件或更改您的数据； </Text>
      <Text style={{fontSize:11}}>3) 使用许可软件进行的行为产生的费用及损失； </Text>
      <Text style={{fontSize:11}}>4) 您对许可软件的误解； </Text>
      <Text style={{fontSize:11}}>5) 非因我们的原因而引起的与许可软件有关的其它损失。</Text>
      <Text style={{fontSize:11}}>非经我们或我们授权开发并正式发布的其它任何由许可软件衍生的软件均属非法，下载、安装、使用此类软件，可能导致不可预知的风险，由此产生的法律责任与纠纷与我们无关，我们有权中止、终止使用许可和/或其他一切服务。
      您与其他使用许可软件的用户之间通过许可软件进行时，因您受误导或欺骗而导致或可能导致的任何心理、生理上的伤害以及经济上的损失，均应由过错方依法承担所有责任。</Text>
      <Text style={{fontSize:14}}>八、 知识产权</Text>

      <Text style={{fontSize:11}}>我们拥有许可软件的著作权、商业秘密以及其他相关的知识产权，包括与许可软件有关的各种文档资料。
      许可软件的相关标识属于我们及我们的关联公司的知识产权，并受到相关法律法规的保护。未经我们明确授权，您不得复制、模仿、使用或发布上述标识，也不得修改或删除应用产品中体现我们及其关联公司的任何标识或身份信息。
      未经我们及我们的关联公司事先书面同意，您不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权。</Text>
      <Text style={{fontSize:14}}>九、 协议终止和违约责任</Text>

      <Text style={{fontSize:11}}>您应理解按授权范围使用许可软件、尊重软件及软件包含内容的知识产权、按规范使用软件、按本协议约定履行义务是您获取我们授权使用软件的前提，如您严重违反本协议，我们将终止使用许可。
      您对软件的使用有赖于我们关联公司为您提供的配套服务，您违反与我们或我们关联公司的条款、协议、规则、通告等相关规定，而被上述任一网站终止提供服务的，可能导致您无法正常使用许可软件，我们有权终止使用许可。
      您理解出于维护平台秩序及保护消费者权益的目的，如果您向我们及（或）我们的关联公司作出任何形式的承诺，且相关公司已确认您违反了该承诺并通知我们依据您与其相关约定进行处理的，则我们可按您的承诺或协议约定的方式对您的使用许可及其他我们可控制的权益采取限制措施，包括中止或终止对您的使用许可。
      一旦您违反本协议或与我们签订的其他协议的约定，我们可通知我们关联公司，要求其对您的权益采取限制措施，包括要求关联公司中止、终止对您提供部分或全部服务，且在其经营或实际控制的网站依法公示您的违约情况。
      许可软件由您自下载平台下载取得，您需要遵守下载平台、系统平台、终端厂商对您使用许可软件方式与限制的约定，如果上述第三方确认您违反该约定需要我们处理的，我们可能会因第三方要求终止对您的使用许可。
      在本使用许可终止时，您应停止对许可软件的使用行为, 并销毁许可软件的全部副本。
      如您违反本协议规定的条款，给我们或其他用户造成损失，您必须承担全部的赔偿责任。如我们承担了上述责任，则您同意赔偿我们的相关支出和损失，包括合理的律师费用。</Text>

      <Text style={{fontSize:14}}>十、 管辖法律和可分割性</Text>
      <Text style={{fontSize:11}}>本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照通用国际商业惯例和（或）行业惯例。</Text>
      <Text style={{fontSize:11}}>本协议由您与我们于我们服务器所在地浙江省杭州市余杭区签署。因本协议产生或与本协议有关的争议，您可与我们以友好协商的方式予以解决或提交有管辖权的人民法院予以裁决。</Text>
      <Text style={{fontSize:11}}>本协议任何条款被有管辖权的人民法院裁定为无效，不应影响其他条款或其任何部分的效力，您与我们仍应善意履行。</Text>

      <Text style={{fontSize:14}}>十一、其他</Text>
      <Text style={{fontSize:11}}>我们可能根据业务调整而变更向您提供软件服务的主体，变更后的主体与您共同履行本协议并向您提供服务，以上变更不会影响您本协议项下的权益。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。
      本协议的所有标题仅仅是为了醒目及阅读方便，本身并没有实际涵义，不能作为解释本协议涵义的依据。</Text>
      </ScrollView>
</View>
      );
  },
});

var MySettingAbout = React.createClass({
  getInitialState(){
    return Object.assign({
      isNew:false,
    },_getStateFromStores());
  },
  onNewPress(){
    if(this.state.isNew){
      this.refs.modal1.close();
    }else{
      this.refs.modal1.open();
    }
    this.setState({isNew:!this.state.isNew});
  },
  onNewClosed(){
    this.setState({isPosition:false});
  },
  componentDidMount(){
    UserStore.addChangeListener(this._onChange);
    WebApiUtils.getAgreement(this.state.user,function(){});
  },
  _onChange () {
    this.setState(_getStateFromStores());
  },
  componentWillUnmount () {
    UserStore.removeChangeListener(this._onChange);
  },
  componentWillMount(){
    portal_my_agreement = Portal.allocateTag();
  },
  onAgreementClose(){
    Portal.closeModal(portal_my_agreement);
  },
  onAgreementPress(){
    // Portal.showModal(portal_my_agreement,<MyWebView key={'WebViewAnrdoid-my-agreement'} 
    //     onClosePress={()=>Portal.closeModal(portal_my_agreement)}
    //     html={this.state.agreementHtml}
    //     title = '网络服务协议'/>);
    Portal.showModal(portal_my_agreement,<MyAgreement key={'WebViewAnrdoid-my-agreement'} 
        onClosePress={()=>Portal.closeModal(portal_my_agreement)}
        html={this.state.agreementHtml}
        title = '网络服务协议'/>);

  },
  render(){
    var height = Constants.OS==='ios'?Constants.NAVHEIGHT+Constants.STATUSHEIGHT:Constants.NAVHEIGHT;
    var paddingTop = Constants.OS === 'ios' ?Constants.STATUSHEIGHT:0;
    if(Constants.OS === 'ios'){
      StatusBarIOS.setStyle('light-content');
      StatusBarIOS.setHidden(false);
    }
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:Constants.NAVBACKGROUNDCOLOR,
            flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            height:height,
            paddingTop:paddingTop}}>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={{height:44,paddingLeft:11,flexDirection:'row',
            alignItems:'center',flex:1}}>
              <ArrowLeftYellow/>
              <Text style={{fontSize:14,color:'#ffe400',marginLeft:11}}>设置</Text>
          </TouchableOpacity>
          <Text style={{fontSize:14,color:'#ffe400',flex:1}}>关于慧爱创客</Text>
          <View style={{flex:1}}></View>
        </View>
        <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'#d2d2d2'}}>
          <View style={{marginTop:11,borderBottomWidth:1,borderBottomColor:'d2d2d2',flexDirection:'row',height:44,
            backgroundColor:'#ffffff',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginLeft:11}}>慧爱创客</Text>
            <ArrowRightGrey  style={{marginRight:11}}/>
          </View>
          <TouchableOpacity onPress={this.onNewPress}>
          <View style={{borderBottomWidth:1,borderBottomColor:'d2d2d2',flexDirection:'row',height:44,
            backgroundColor:'#ffffff',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginLeft:11}}>新版本检测</Text>
            <View style={{marginRight:11,flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#d2d2d2',marginRight:11}}>当前已是最新版本</Text>
              <ArrowRightGrey  style={{marginRight:11}}/>
            </View>
          </View>
          </TouchableOpacity>
          <View style={{borderBottomWidth:1,borderBottomColor:'d2d2d2',flexDirection:'row',height:44,
            backgroundColor:'#ffffff',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginLeft:11}}>版权信息</Text>
            <Text style={{fontSize:9}}>Copyright © 2015 云南楠儿投资咨询有限公司版权所有</Text>
            <ArrowRightGrey style={{marginRight:11}}/>
          </View>
          <TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'d2d2d2',flexDirection:'row',height:44,
            backgroundColor:'#ffffff',justifyContent:'space-between',alignItems:'center'}} onPress={this.onAgreementPress}>
            <Text style={{marginLeft:11}}>软件许可使用协议</Text>
            <ArrowRightGrey style={{marginRight:11}}/>
          </TouchableOpacity>
        </ScrollView>

          <Modal visible={this.state.isNew} transparent={true}
              onClosed={this.onNewClosed} ref={"modal1"} style={{flex:1,backgroundColor:'transparent'}}>
            <TouchableOpacity style={{flex:1}} 
              onPress={this.onNewPress}>
              <View style={{flex:1,backgroundColor:'#000000',opacity:0.8,justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'#ffffff',opacity:1,width:240}}>
                    <Text style={{marginLeft:7,marginTop:25}}>您使用的已经是最新的版本</Text>
                    <TouchableOpacity onPress={this.onNewPress} style={{width:225,height:35,marginTop:25,backgroundColor:'#ffe400',marginHorizontal:7,
                      alignItems:'center',justifyContent:'center',marginBottom:10}}>
                        <Text>确定</Text>
                      </TouchableOpacity>
                  
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
      </View>
      );
  },
});

module.exports = MySettingAbout;
