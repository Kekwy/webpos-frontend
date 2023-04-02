<template>
  <div>
    <iframe ref="iframe" height="750" src="/html/pos-index.html" width="100%"></iframe>
  </div>
</template>


<script>

export default {
  name: "Home",
  data() {
    return{
      title: "Squanchy POS"
    }
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
      })
    });
  },
  methods: {}

}


</script>
