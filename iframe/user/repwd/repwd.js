// const { form } = window.layui;
// //表单验证
// form.verify({
//   diff: function (value) {
//     if ($('input[name="oldPwd]').val() == value) {
//       return "新旧密码一样";
//     }
//   },
//   same: function (value) {
//     if ($('input[name="newPwd]').val() !== value) {
//       return "和新密码不一样";
//     }
//   },
// });
//重置密码
$(".layui-form").on("submit", (e) => {
  e.preventDefault();
  const data={
    oldPwd:$('input[name=oldPwd]').val(),
    newPwd:$('input[name=newPwd]').val(),
  }
  let dataStr = requestDataHandle(data);
  //axios请求数据
  resetPasswordApi(dataStr,backData=>{
    // console.log(backData);
    window.localStorage.removeItem('token')
    window.parent.location.href='/login.html'
  })
});
//重置按钮
$('.my_reset').on('click',()=>{
  $('input[name=oldPwd]').val('')
  $('input[name=oldPwd]').val('')
  $('#myPwd').val('')
})
