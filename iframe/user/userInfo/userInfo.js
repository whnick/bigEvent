//获取用户信息并渲染的小窗口
function updateuserInfo(){
    userInfoApi((backData) => {
    //   console.log(backData.data.data);
      let { email, id, nickname, username, user_pic } = backData.data.data;
      // console.log(email, id, nickname, username, user_pic);
      //渲染页面
      $("input[name=username]").val(username);
      $("input[name=nickname]").val(nickname);
      $("input[name=email]").val(email);
      id: $("input[name=id]").val(id);
    });
}
updateuserInfo()
//更改用户信息
//表单验证
// const { form } = window.layui;
// //表单校验
// form.verify({
//   nickname: [/^[\u4e00-\u9fa5]{0,}$/, "昵称必须是中文"],
//   email: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "邮箱格式不对"],
// });
$(".layui-form").on("submit", (e) => {
  e.preventDefault();
  //获取参数数据
  // let fd=new FormData($('.layui-form')[0])//DOM对象
  // fd.append('id',)
  const data = {
    nickname: $("input[name=nickname]").val(),
    email: $("input[name=email]").val(),
    id: $("input[name=id]").val(),
  };
  //数据格式处理
  let dataStr = requestDataHandle(data);
  setUserInfoApi(dataStr, (backData) => {
    // console.log(backData);
    //渲染大窗口的用户信息
    window.parent.getUserInfo();
    // getUserInfo()
  });
});
//重置按钮
$('.my-reset').on('click',()=>{
    updateuserInfo()
})