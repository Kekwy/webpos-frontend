<template>
  <div>
    <iframe ref="iframe" height="750" src="/html/pos-index.html" width="100%"></iframe>
  </div>
</template>


<script>

export default {
  name: "Home",
  data() {
    return {
      title: "POS online | Home"
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    // 获取HTML文件的window对象
    const htmlWindow = this.$refs.iframe.contentWindow;

    // 等待页面加载完成之后再获取元素
    htmlWindow.addEventListener("load", () => {
      // 将Vue组件中的方法绑定到HTML文件中的按钮上
      htmlWindow.document.querySelector("#logout-btn-id").addEventListener("click", () => {
        this.postRequest("/logout", "").then(resp => {
          if (resp.data.code === 0) {
            window.sessionStorage.removeItem('tokenStr');
            this.$message.success("登出成功");
            this.$router.replace('/');
          } else {
            this.$message.error(resp.data.message);
          }
        })
      });
      htmlWindow.document.querySelector("#checkout-btn").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.postRequest("/checkout", cart).then(resp => {
          if (resp.data.code === 0) {
            this.$message.success("支付成功，您的余额：" + resp.data.obj.toFixed(2));
            htmlWindow.document.querySelector("#clean-btn").dispatchEvent(new MouseEvent('click'));
          } else if (resp.data.code === 1) {
            this.$message.warning("余额不足，您的余额：" + resp.data.obj.toFixed(2));
          } else {
            alert("未知错误");
          }
        });
      })
    });
  },
  methods: {}

}


</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.bg-default,
.btn-default {
  background-color: #f2f3f8;
}

.btn-error {
  color: #ef5f5f;
}
</style>