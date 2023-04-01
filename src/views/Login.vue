<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form ref="loginForm"
                 v-loading="loading"
                 :model="loginForm" :rules="loginRules" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名" type="text"/>
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码" type="password"/>
            </el-form-item>
          </div>
          <input class="btn solid" type="button" value="Login" @click="submitLogin"/>
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

        <el-form :rules="registerRules"
                 v-loading="loading"
                 ref="registerForm" :model="registerForm" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="用户名" type="text"/>
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" placeholder="Email" type="email"/>
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" placeholder="密码" type="password"/>
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <el-form-item prop="checkPass">
              <el-input v-model="registerForm.checkPass" placeholder="确认密码" type="password"/>
            </el-form-item>
          </div>
          <input class="btn solid" type="button" value="Register" @click="submitRegister"/>
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
        <img src="" class="image" alt=""/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            点击 “登录” 使用已有账号。
          </p>
          <button class="btn transparent" id="sign-in-btn" ref="sign_in_btn">
            登录
          </button>
        </div>
        <img src="" class="image" alt=""/>
      </div>
    </div>
  </div>
</template>


<script>

import '@/assets/js/fontawesomeKit';

export default {
  name: "Login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.registerForm.checkPass !== '') {
        this.$refs.registerForm.validateField('checkPass');
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        checkPass: '',
        email: ''
      },
      loading: false,
      loginRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      registerRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},
          {min:3, max:16, message: '用户名长度必须为 8 到 32 位', trigger: 'change'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: ['blur', 'change']}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
          {min:8, max:32, message: '密码长度必须为 8 到 32 位', trigger: 'change'},
          {validator: validatePass, trigger: 'blur'}],
        checkPass: [{required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.sign_in_btn = document.querySelector("#sign-in-btn");
    this.sign_up_btn = document.querySelector("#sign-up-btn");
    this.container = document.querySelector(".container");

    this.sign_up_btn.addEventListener("click", () => {
      this.container.classList.add("sign-up-mode");
    });

    this.sign_in_btn.addEventListener("click", () => {
      this.container.classList.remove("sign-up-mode");
    });
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          // 使用响应拦截器对请求进行封装，避免反复编写 axios 代码
          this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              this.loading = false;
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
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
    },
    submitRegister() {
      this.$refs.registerForm.validate((isValid) => {
        if (isValid) {
          // 使用响应拦截器对请求进行封装，避免反复编写 axios 代码
          // alert(1111);
          this.loading = true;
          this.$refs.sign_in_btn.dispatchEvent(new MouseEvent('click'));
          // this.postRequest('/register', this.registerForm).then(resp => {
          //   if (resp) {
          //     this.loading = false;
          //     this.sign_in_btn.click;
          //   }
          // })
        } else {
          console.log('error submit!!');
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    },
  }
}
</script>

<style>
@import '@/assets/css/loginStyle.css';

</style>