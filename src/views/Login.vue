<template>
  <head>
    <meta charset="UTF-8">
    <title>POS online system | Login</title>
    <link rel="stylesheet" href="@/assets/css/loginStyle.css">
  </head>
  <body>

  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username" placeholder="用户名" />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input id="password" name="password" type="password" placeholder="密码" required/>
          </div>
          <input type="submit" value="Login" class="btn solid"/>
          <p class="social-text">或者使用第三方账号登录</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-qq"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </el-form>

        <el-form method="post" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="用户名"/>
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Email"/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="密码"/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="确认密码" name="repeat"/>
          </div>

          <input type="submit" class="btn" value="注册"/>

        </el-form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            这里是一个在线的交易平台，
            点击 “注册” 创建一个新的账号。
          </p>
          <button class="btn transparent" id="sign-up-btn">
            注册
          </button>
        </div>
        <img src="img/log.svg" class="image" alt=""/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            点击 “登录” 使用已有账号。
          </p>
          <button class="btn transparent" id="sign-in-btn">
            登录
          </button>
        </div>
<!--        <img src="img/register.svg" class="image" alt=""/>-->
      </div>
    </div>
  </div>

  <div>
    <el-form :rules="rules"
             v-loading="loading"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width: 250px; margin-right: 5px"/>
        <img :src="captchaUrl" alt="" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      // 加入 time 参数避免每次点击或访问出现的是同一张验证码
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: ''
      },
      loading: false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = '/captcha?time=' + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          // 使用响应拦截器对请求进行封装，避免反复编写 axios 代码
          // alert(1111);
          this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              this.loading = false;
              const tokenStr = resp.obj.tokenHead+resp.obj.token;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              this.$router.replace('/home');
            }
          })
        } else {
          console.log('error submit!!');
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

</style>