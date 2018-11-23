<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="380px" top="20vh"
      center class="dialog">
      <div class="content">
        <div class="header">
          <a class="close" href="javascript:void(0)" @click="close"></a>
          <p class="phone">咨询热线：010-58205388</p>
          <p class="tip">请填写一下信息，我们会尽快和您联系</p>
        </div>
        <div class="mainer">
          <div class="name">
            <label for="name">您的姓名：</label>
            <input type="text" id="name" v-model="name">
          </div>
          <div class="phone">
            <label for="phone">手机号码：</label>
            <input type="text" id="phone" v-model="phone">
          </div>
          <div class="phone">
            <label for="email">邮箱：</label>
            <input type="text" id="email" v-model="email">
          </div>
          <div class="content">
            <label for="content">留言内容：</label>
            <textarea id="content" v-model="content"></textarea>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitAdvise">提交留言</el-button>
  </span>
    </el-dialog>
    <div class="footer-wrap">
      <div class="footer">
        <div class="ft-box">
          <a href="javascript:void(0)">
            <img src="./common/images/logo_footer.png" alt="">
          </a>
        </div>
        <div class="ft-box">
          <ul class="text">
            <li>工作时间：08:30-17:30</li>
            <li>服务电话：010-58205388</li>
          </ul>
        </div>
        <div class="ft-box">
          <ul class="text">
            <li @click="advise">意见和建议</li>
          </ul>
        </div>
        <div class="ft-box">
          <ul class="code">
            <li>
              <a href="javascript:void(0)">
                <img class="ft_code" src="./common/images/weixin.png" alt="weixin">
                <p>微信号</p>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <img class="ft_code" src="./common/images/Android.png" alt="Android">
                <p>Android钱包</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/common/stylus/index.styl";
  import {baseURL,loginPlatform, exchangePlatform, transferPlatform, searchPlatform} from '@/common/js/public.js';
  import axios from "axios";
  import utils from "@/common/js/utils.js";
  const querystring = require('querystring');
  export default {
    name: 'App',
    components: {},
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        name:"",
        phone:"",
        content:"",
        email:"",
        tipName:"",
        centerDialogVisible: false,
        url:"",
        isRouterAlive: true,
        userId: '',
        token: "",
        userName: "",
      }
    },
    beforeMount() {
      let url = location.search;
      this.$store.state.url=url;
      if (url.indexOf("?") != -1) {
        let theRequest = new Object();
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        this.$store.state.redirectURL=theRequest.redirectURL
      } else {
        this.$store.state.redirectURL=searchPlatform
      }
    },
    mounted() {},
    beforeUpdate(){
      let url = location.search;
      this.$store.state.url=url;
      if (url.indexOf("?") != -1) {
        let theRequest = new Object();
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        this.$store.state.redirectURL=theRequest.redirectURL
      } else {
        this.$store.state.redirectURL=searchPlatform
      }
    },
    computed: {},
    watch: {},
    methods: {
      advise(){
        this.name="";
        this.phone="";
        this.content="";
        this.centerDialogVisible=true
      },
      close(){
        this.centerDialogVisible=false
      },
      submitAdvise(){
        if(this.name===""){
          this.tipName="姓名";
          this.openTip();
          return
        }
        if(this.phone===""&&this.email===""){
          this.tipName="手机号码或邮箱";
          this.openTip();
          return
        }
        if(this.content===""){
          this.tipName="反馈内容";
          this.openTip();
          return
        }
        let data={
          name:this.name,
          phone:"+86"+this.phone,
          email:this.email,
          content:this.content,
          platform:1,
        };
        //提交请求
        axios({
          method: 'post',
          url: `${baseURL}/v1/users/feedback`,
          data: querystring.stringify(data),
        }).then(res => {
          this.centerDialogVisible=false
        }).catch(error => {
          console.log(error);
        })
      },
      openTip() {
        this.$confirm(`${this.tipName}, 不能为空！`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          showCancelButton:false
        }).then(() => {
        }).catch(() => {
        });
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .main_wrap {
    flex: 1;
    box-sizing: border-box;
    margin: 0 auto;
    width 100%
    min-width 1212px
    background-color #f3f3f3
  }
  
  .footer-wrap {
    width 100%
    min-width 1212px
    background-color: #272324;
    .footer {
      box-sizing: border-box
      width 1212px
      height 160px
      margin 0 auto
      font-size 0
      .ft-box {
        display inline-block
        font-size 16px
        vertical-align top
        .text {
          height 48px
          margin-top 56px
          li {
            font-size 14px
            color #ffffff
          }
          li:last-child {
            margin-top 20px
          }
        }
        .code {
          font-size 0
          padding-right 15px
          li {
            padding-top 10px
            display inline-block
            font-size 14px
            text-align center
            a {
              color #ffffff
              p {
                font-size 16px
                color #ffffff
                padding-top 14px
              }
            }
          }
          li:first-child{
            margin-right 36px
          }
        }
      }
      .ft-box:first-child {
        margin-left 12px
        margin-right 146px
        padding-top 5px
        a {
          box-sizing border-box
          font-size: 0px;
          color: #c6351e;
          display: table-cell;
          width: 200px;
          height: 150px;
          vertical-align: top;
          text-align: center;
          img {
            vertical-align: top;
            max-width 200px
            max-height 150px
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .ft-box:nth-child(3){
        margin-left 130px
        li{
          cursor pointer
          border 1px solid #ffffff
          padding 4px
        }
      }
      .ft-box:last-child {
        float right
      }
    }
  }
</style>
<style lang="stylus">
  .dialog {
    .el-dialog--center {
      border-radius: 10px;
    }
    .el-dialog__header {
      display none
    }
    .el-dialog__body {
      padding-top 28px
      padding-bottom 28px
      position relative
      .content {
        .header{
          text-align center
          .close{
            display inline-block
            width 15px
            height 15px
            position absolute
            top 12px
            right 20px
            background-image: url('./common/images/close.png');
            background-position: top left;
            background-repeat: no-repeat;
          }
          .phone{
            font-size: 18px;
            color: #c6351e;
            margin-bottom 8px
          }
          .tip{
            color #666666
          }
        }
        .mainer{
          margin-top 40px
          margin-left 25px
          label{
            color #222222
            font-size 18px
            display inline-block
            width 90px
            text-align right
          }
          input,textarea{
            color #333333
            box-sizing border-box
            outline:none;
            border 1px solid #d2d2d2
            resize:none;
            width 210px
            padding-left 12px
          }
          input:focus,textarea:focus{
            border 1px solid #c6351e
          }
          input{
            height 26px
          }
          textarea{
            height 130px
          }
          .name{
            margin-bottom 22px
          }
          .phone{
            margin-bottom 22px
          }
          .content{
            label{
              vertical-align top
            }
            textarea{
              vertical-align top
            }
          }
        }
      }
    }
    .el-dialog__footer{
      padding-top 0
      padding-bottom 20px
      .el-button,.el-button--primary{
        border none
        width: 94px;
        height: 30px;
        background-color: #c6351e;
        border-radius: 8px;
        padding 0
        font-size: 16px;
      }
    }
  }
</style>
