<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <!-- <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phoneNum" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="passport" />
        <button style="width: 50px; height: 30px" @click="getPassport()">
          验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click.prevent="userRegister()">完成注册</button>
      </div> -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            type="text"
            v-model.number="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="passport">
          <el-input
            v-model.number="ruleForm.passport"
            autocomplete="off"
          ></el-input>
          <button id="port" @click="getPassport()">验证码</button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="userRegister()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
      //自定义表单验证方式
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      agree: true,
      ruleForm: {
        phone: "",
        pass: "",
        checkPass: "",
        passport:"",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "密码长度不能小于8位", trigger: "blur" },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 8, message: "密码长度不能小于8位", trigger: "blur" },
          { validator:  validateCheckPass , trigger: "blur" },
        ],
        passport: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { pattern: /\d{6}/, message: "验证码长度必须是6位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
     getPassport(){
     this.$refs.ruleForm.validateField("phone",async(valid)=>{
      if(!valid){      
        try {
          await this.$store.dispatch("userInfoOption/getPassport",this.ruleForm.phone)
          this.ruleForm.passport = this.passport;
        } catch (error) {
        alert(error.message);
        }
      }
  })
    },
    userRegister() {
      const { phone, pass, passport } = this.ruleForm;

      this.$refs.ruleForm
        .validate()
        .then(async(result) => {
          try {
          (await this.$store.dispatch("userInfoOption/userRegister", {
            code: passport,
            phone,
            password: pass,
          }))
          this.$router.push("/login");
          alert("登录成功，快去登录");
      } catch (error) {
        alert(error.message);
      }
         
        })
        .catch((err) => {
          alert("登录失败");
        });
 
    },
    submitForm() {
   
    },
  },
  computed: {
    ...mapState("userInfoOption", ["passport"]),
  },
};
</script>

<style lang="less" scoped>
.register-container {
  overflow: hidden;
  /deep/.el-input__inner {
    height: 20px;
    width: 250px;
    border-width: 0 0 2px 0;
  }
  /deep/.el-form-item {
    margin-bottom: 20px;
    margin-top: 50px;
   
    margin-left: 45px;
    /deep/.el-form-item__content{
      margin-top: 10px;
    }
  }
  /deep/.el-form {
    position: relative;
    overflow: hidden;
    width: 500px;
    height: 75%;
    margin: 80px auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .el-input {
      width: 70%;
      margin-left: 10%;
    }
   
  }
  .register {
    width: 1200px;
    height: 650px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    overflow: hidden;

    /deep/.el-button--primary {
      text-align: center;
      line-height: 24px;
      margin: 0px auto;
      outline: none;
      width: 250px;
      height: 45px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
    /*
    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }
*/
  }
  #port {
    width: 50px;
    height: 30px;
  }
  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>