<template>
    <div id="login">
        <div class="login-wap">
            <ul class="menu-tab">
                <li v-for="item in btn" :key="item.id" :class="{'current':item.current}" @click="handleCurrent(item)">{{item.name}}</li>
            </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            
            <el-form-item prop="username">
                <label class="input_lb">邮箱</label>
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="Password">
                <label class="input_lb">密码</label>
                <el-input type="password" v-model="ruleForm.Password" autocomplete="off" maxlength="20" minlength="6"></el-input>
            </el-form-item>

            <el-form-item prop="checkPassword" v-show="isShow=='register'">
                <label class="input_lb">重复密码</label>
                <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" maxlength="20" minlength="6"></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <label class="input_lb">验证码</label>
                <el-row :gutter="10">
                <el-col :span="15"><el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
                <el-col :span="9"><el-button type="success" class="block">成功按钮</el-button></el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
import { stripscript } from "@/dataValidation/index"
export default {
    name:'login',
    data(){
        //邮箱验证
        var validateusername = (rule, value, callback) => {
        this.ruleForm.username = stripscript(value)
        value = this.ruleForm.username
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)){
          callback(new Error('请输入正确邮箱'));
        }else{
            callback();
        }
        };
      //密码验证
        var validatePassword = (rule, value, callback) => {
        this.ruleForm.Password = stripscript(value)
        value = this.ruleForm.Password
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('6-20位，数字+字母'));
        } else {
          callback();
        }
        };
      //重复密码验证
        var validatecheckPassword = (rule, value, callback) => {
        this.ruleForm.checkPassword = stripscript(value)
        value = this.ruleForm.checkPassword
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }else if(value != this.ruleForm.Password){
          callback(new Error('两次密码不一致'));
        }else if (!reg.test(value)) {
          callback(new Error('6-20位，数字+字母'));
        } else {
          callback();
        }
        };
      //验证码验证
        var checkcode = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
        let reg = /^[a-z0-9]{6}$/
        if (value ==='') {
          return callback(new Error('请输入验证码'));
        }else if(!reg.test(value)){
            callback(new Error('请输入正确的验证码'));
        }else{
            callback();
        }
      };
    return{
        btn:[
            {name:'登录',current:true,type:'login'},
            {name:'注册',current:false,type:'register'},
        ],
        isShow:'login',
        //验证数据
        ruleForm: {
          username: '',
          Password:'',
          checkPassword: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateusername, trigger: 'blur' }
          ],
          Password:[
             { validator: validatePassword, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatecheckPassword, trigger: 'blur' }
          ],
          code: [
            { validator: checkcode, trigger: 'blur' }
          ]
        }
      };
    },

    methods:{
        handleCurrent(data){
          this.isShow = data.type
            this.btn.forEach((elem) => {
                elem.current = false
            });
            data.current = true
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}
.login-wap{
    height: 330px;
    width: 300px;
    margin: auto;
}
.menu-tab{
    text-align: center;
}
.menu-tab li{
    display: inline-block;
    line-height: 36px;
    width: 88px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
.current{
    background-color: rgba(0,0,0,.1);
}

.block{
    display: block;
    width: 100%;
}

.input_lb{
    color:#fff;
    font-size:12px;
}
</style>