<template>
  <div id="app">
    <div class="main_wrap">
      <router-view class="main" v-if="isRouterAlive"></router-view>
    </div>
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
            <li @click="centerDialogVisible = true">意见和建议</li>
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
          width: 150px;
          height: 150px;
          vertical-align: top;
          text-align: center;
          img {
            vertical-align: top;
            max-width 150px
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
        }
      }
      .ft-box:last-child {
        float right
      }
    }
  }
</style>
