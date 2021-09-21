<template>
  <div class="container">
    <div class="title">
      <h1>
        智能家居
      </h1>
    </div>
    <div class="time">{{time}}</div>
    <!-- 空调整体 -->
    <div class="air">
      <!-- 显示空调参数的图片 -->
      <img src="../static/img/air.png" alt="x" class="picture">
      <!-- 显示模式的图片，默认为雪花 -->
      <img  :src=arr_img[is_hot] :class="air_flag == 0 ? 'pattern_off' : 'pattern_on'"  alt="x">

      <!-- 显示温度 -->
      <span :class="air_flag == 0 ? 'font_off' : 'font_on'">{{temp}}°C</span>
      <!-- logo，直接放个特殊字符，就不引字体图标了 -->
      <span class="logo">☁</span>
      <!-- 空调右下角的小绿点 -->
      <span :class="air_flag == 0 ?'dot_off' : 'dot_on'"></span>
    </div>
    <!-- 显示风的效果，里面为3条风 -->
    <div class="wind">
      <span class="wind1"></span>
      <span class="wind2"></span>
      <span class="wind3"></span>
    </div>
    <!-- 装按钮的盒子 -->
    <div class="btn">
      <!-- 上 -->
      <div class="up" @click="air_up"></div>
      <!-- 下 -->
      <div class="down" @click="air_down"></div>
      <!-- 太阳 -->
      <div class="sun" @click="air_hot"></div>
      <!-- 雪花 -->
      <div class="snow" @click="air_cold"></div>
      <!-- 开关 -->
      <div  :class="air_flag == 0 ? 'open_off' : 'open_on'" @click="air_on"></div>
      <audio ref="audio_air" :src="audioUrlAir"></audio>
      <audio ref="audio_click" :src="audioUrlClick"></audio>
    </div>

    <div class="app">

      <ul class="widget">
        <li>
          <h2>光照强度</h2>
          <div class="val">{{lux}}<small>Lux</small></div>
        </li>
        <li>
          <h2>气压</h2>
          <div class="val">{{pre}}<small>Kpa</small></div>
        </li>
        <li>
          <h2>湿度</h2>
          <div class="val">{{hum}}<small>%</small></div>
        </li>
        <li>
          <h2>温度</h2>
          <div class="val">{{alt}}°C</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getdata} from '@/api/getdata';

export default {
  name: 'App',
  data() {
    return {
      time:"10:00",
      lux: 12.3,
      temp: 24,
      pre:100,
      hum:40,
      alt:1000,
      air_flag:0,
      air_flagb:0,
      is_hot:0,
      arr_img:["../static/img/snow1.png", "../static/img/sun1.png"],
      audioUrlAir:"../static/audio/ac-work.m4a",
      audioUrlClick:"../static/audio/di.m4a",
    }
  },
  created () {


  },
  methods: {
    getValue() {
        let data = getdata();
        data.then((dataValue) => {
          console.log(dataValue)
          let val = dataValue.split(',');
          this.lux = val[0].split('=')[1];
          // this.temp = val[1].split('=')[1];
          this.pre = val[2].split('=')[1];
          this.hum = val[3].split('=')[1];
          this.alt = val[1].split('=')[1];
          this.lux == null ? 12.3 : this.lux;
          this.pre == null ? 100 : this.pre;
          this.hum == null ? 40 : this.hum;
          this.alt == null ? 28 : this.alt;

          if (this.alt > 28 && this.air_flagb == 0) {
            this.air_flag = 1;
          }



        })
        console.log('aaa',data)

    },
    air_on() {
      this.air_flag = this.air_flag == 0 ? 1 : 0;
      this.air_flagb = this.air_flagb == 0 ? 1 : 0;
      console.log(this.air_flag)

    },
    air_up() {
      if (this.air_flag == 1 && this.temp < 34) {
        this.temp++;
        console.log('温度调高',this.temp)
      }


    },
    air_down() {
      if (this.air_flag == 1  && this.temp > 16) {
        this.temp--;
        console.log('温度调低',this.temp)
      }
    },
    air_hot() {
      if (this.air_flag == 1) {
        this.is_hot = 1;
      }

      console.log("变热")
    },
    air_cold() {
      if (this.air_flag == 1) {
        this.is_hot = 0;
      }
      console.log("变冷")
    },
    play_air(){
      this.$refs.udio_air.play();//点击触发 点击音效
    },
    play_click(){
      this.$refs.udio_click.play();//点击触发 点击音效
    }


  },
  mounted() {
    this.timer = setInterval(this.getValue, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}

</script>

<style>
  @font-face {

    /*src: url('static/font/DS-Digital/DS-DIGI.TTF');*/
  }

  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    height: 100vh;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    /*radial-gradient(ellipse farthest-corner at center bottom, #6beace, #2e9aa4);*/
    background: #6beace;
    color: #8b9095;
    font-size: 14px;
    font-family: sans-serif;
  }
  .container{
    position: absolute;
    top: 40px;
    width: 340px;
    height: 600px;
    /*  border: 1px solid rgb(201, 201, 201); */
  }
  .title {
    margin: 10px;
    float:left;
  }
  .container h1 {
    position: absolute;
    top: -22px;
    /*left: -2px;*/
    text-transform: uppercase;
    color: #fff;
    font-weight: 100;
    font-size: 27px;
    opacity: .9;
  }
  .time {
    position: absolute;
    float: right;
    top: -4px;
    right: 5px;
    text-transform: uppercase;
    color: #fff;
    opacity: .7;
    font-size: 16px;
    text-align: right;
    line-height: 1.25;
    letter-spacing: 0.5px;
  }

  .air{
    position: relative;
    margin: 0 auto;
    width: 320px;
    height: 120px;
    top: 20px;

    background-color: rgb(255, 255, 255);
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 2px 4px rgb(145, 145, 145));
  }
  .air::after{
    content: '';
    position: absolute;
    bottom: -21px;
    left: 0;
    height: 20px;
    width: 320px;
    background-color: rgb(255, 255, 255);
    border-radius: 0 0 20px 20px;
  }
  .picture{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 65px;
    border-radius: 5px;
  }
  .air_hot {
    background-image: url(../static/img/sun1.png);
  }
  .air_cold {
    background-image: url(../static/img/snow1.png);
  }
  .pattern_on{
    position: absolute;
    top: 22px;
    right: 30px;
    width: 20px;
    height: 20px;
    opacity: 1;
    transition: all 0.3s;
  }
  .pattern_off{
    position: absolute;
    top: 22px;
    right: 30px;
    width: 20px;
    height: 20px;
    opacity: 0;
    transition: all 0.3s;
  }
  .font_on{
    /* 引用LED字体 */
    font-family: "led regular";
    position: absolute;
    right: 32px;
    top: 50px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color: rgb(184, 184, 184);
    opacity: 1;
    transition: all 0.3s;
  }
  .font_off{
    /* 引用LED字体 */
    font-family: "led regular";
    position: absolute;
    right: 32px;
    top: 50px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color: rgb(184, 184, 184);
    opacity: 0;
    transition: all 0.3s;
  }
  .logo{
    position: absolute;
    left: 50%;
    bottom: 3px;
    transform: translateX(-50%);
    font-size: 10px;
    color: rgb(139, 139, 139);
  }
  .dot_on{
    position: absolute;
    bottom: -8px;
    right: 12px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgb(19, 221, 53);
    z-index: 1;
    opacity: 1;
    transition: all 0.3s;
  }
  .dot_off{
    position: absolute;
    bottom: -8px;
    right: 12px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgb(19, 221, 53);
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
  }
  .wind{
    position: relative;
    top: 50px;
    width: 250px;
    height: 40px;
    margin: 0 auto;
    opacity: 0;
    transition: all 1.2s;
    animation: move 1.5s ease-in-out infinite;
  }
  @keyframes move{
    0%,100%{
      transform: translateY(0px);
    }
    50%{
      transform: translateY(5px);
    }
  }
  .wind>span{
    position: absolute;
    width: 5px;
    height: 40px;

  }
  .wind1{
    left: 20%;
    transform: rotate(20deg);
  }
  .wind2{
    left: 50%;
  }
  .wind3{
    left: 80%;
    transform: rotate(-20deg);
  }
  .btn{
    position: relative;
    top: 65px;
    margin:0 auto;
    width: 140px;
    height: 190px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }
  .btn .up{
    background-image: url(../static/img/up.png);
  }
  .btn .down{
    background-image: url(../static/img/down.png);
  }
  .btn>div{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 12px;
    line-height: 35px;
    text-align: center;
    background-color: rgb(204, 204, 204);
    box-shadow: 0 2px 4px rgb(151, 151, 151);
    cursor: pointer;
    user-select: none;
  }
  .btn>div:active{
    background-color: rgb(240, 240, 240);
  }
  .sun,.snow{
    background-size: 50% 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .up{
    background-size: 80% 80%;
    background-position: 50% 0%;
    background-repeat: no-repeat;
  }
  .down{
    background-size: 80% 80%;
    background-position: 50% 100%;
    background-repeat: no-repeat;
  }
  .btn .sun{
    background-image: url(../static/img/sun.png);
    background-color: rgb(255, 130, 13);
  }
  .btn .snow{
    background-image: url(../static/img/snow.png);
    background-color: rgb(13, 138, 255);
  }
  .btn .open_on{
    background-size: 50% 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-image: url(../static/img/open.png);
    background-color: rgb(33, 255, 13);
  }
  .btn .open_off{
    background-size: 50% 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-image: url(../static/img/open.png);
    background-color: red;
  }
  .app {
    position: relative;
    top: 40%;
    left: 62%;
    width: 362px;
    height: 300px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .widget {
    width: 362px;
    height: 300px;
  }

  .app .widget li {
    /*position: absolute;*/
    list-style-type:none;
    float: left;
    width: 140px;
    height: 120px;
    padding: 40px 10px;
    margin: 0.5px;
    background: #fff;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 64, 58, 0.15);
    transition: all 0.3s cubic-bezier(0.67, 0.13, 0.1, 0.81);
    /*-webkit-transform-origin: right bottom;*/
    transform-origin: right bottom;
    /*-webkit-transform: scale(0);*/
    /*transform: scale(0);*/
  }
  .app .widget li:nth-child(2) {
    /*-webkit-transform-origin: left bottom;*/
    /*transform-origin: left bottom;*/
    /*transition-delay: .1s;*/
  }
  /*.app .widget li:nth-child(3) {*/
  /*  -webkit-transform-origin: right top;*/
  /*  transform-origin: right top;*/
  /*  transition-delay: .2s;*/
  /*}*/
  /*.app .widget li:nth-child(4) {*/
  /*  -webkit-transform-origin: left top;*/
  /*  transform-origin: left top;*/
  /*  transition-delay: .3s;*/
  /*}*/
  /*.app .widget li h2 {*/
  /*  font-size: 11px;*/
  /*  opacity: .8;*/
  /*  margin-bottom: 10px;*/
  /*  text-transform: uppercase;*/
  /*}*/
  .app .widget li .val {
    font-size: 22px;
    font-weight: 100;
    color: #343a42;
  }
  /*.app .widget li .val small {*/
  /*  font-size: 30px;*/
  /*}*/
  /*.app .widget li .val small sup {*/
  /*  position: relative;*/
  /*  top: -12px;*/
  /*}*/

  /*.active .app .widget li {*/
  /*  -webkit-transform: scale(1);*/
  /*  transform: scale(1);*/
  /*  transition: all 0.5s cubic-bezier(0.67, 0.13, 0.1, 0.81);*/
  /*}*/
  /*.active .app .widget li:nth-child(2) {*/
  /*  -webkit-transform-origin: left bottom;*/
  /*  transform-origin: left bottom;*/
  /*  transition-delay: .2s;*/
  /*}*/
  /*.active .app .widget li:nth-child(3) {*/
  /*  -webkit-transform-origin: right top;*/
  /*  transform-origin: right top;*/
  /*  transition-delay: .4s;*/
  /*}*/
  /*.active .app .widget li:nth-child(4) {*/
  /*  -webkit-transform-origin: left top;*/
  /*  transform-origin: left top;*/
  /*  transition-delay: .6s;*/
  /*}*/




</style>
