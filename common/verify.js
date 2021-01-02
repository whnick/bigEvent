//表单验证模块
const { form } = window.layui;
form.verify({
    //用户注册信息验证
  username: [/^[a-z0-9]{6,10}$/, "账号名是6到10位由数字, 小写字母组成"],
  password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  repeatpd: (value) => {
    //value：表单的值、item：表单的DOM对象
    if ($(".register-password").val() != value) {
      return "两次密码不相同";
    }
  },
  //表单校验 用户信息验证
  nickname: [/^[\u4e00-\u9fa5]{0,}$/, "昵称必须是中文"],
  email: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "邮箱格式不对"],
  //用户重置密码验证
  diff: function (value) {
    if ($('input[name=oldPwd]').val() == value) {
      return "新旧密码一样";
    }
  },
  same: function (value) {
    if ($('input[name=newPwd]').val() !== value) {
      return "和新密码不一样";
    }
  },
//文章分类验证
  ctname: [
    /^[\u4E00-\u9FA5]+$/,
    "分类名只能是中文"
],
aliname: [
    /^[a-z0-9]+$/,
    "小写英文和数字组成"
],

// publisher页面 - 文章标题
articleTitle: [
  /^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/,
  "标题只能是中英文, 数字下划线中划线组成"
],
// 分类判断
cate: function(){
return !($("select[name=cate_id]").val().length) && "请选择分类"
}
})

