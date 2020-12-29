//判断token权限
console.log(window.localStorage.getItem("token"));
if (!window.localStorage.getItem("token")) {
  layer.msg(
    "您的登录信息已过期,请重新登录",
    {
      time: 2000,
    },
    function () {
      window.location.href = "./login.html";
    }
  );
}
//渲染用户基本信息
userInfoApi((backData) => {
  console.log(backData.data.data);
  let {nickname,username,user_pic}=backData.data.data
//   console.log(id,nickname,username,user_pic);
if(!nickname){
    nickname=username
}
//渲染页面
$('.username').text(nickname)
$('.avatar').css('display', 'inline-block')
// 如果没上传图片 显示用户名的首字母大写
if (!user_pic) {
    const firstLetter = nickname[0].toUpperCase()
    $('.avatar').text(firstLetter)
  } else {
    $('.layui-nav-img').attr('src', user_pic)
  }
});
//退出
$('#logout').on('click',()=>{
    layer.confirm('是否退出?', {icon: 3}, function(index){
        window.location.href='./login.html'
        layer.close(index);
      })
})
