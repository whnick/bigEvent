//数据格式处理
const requestDataHandle=function(data){
    const arr=[]
    for(let key in data){
        arr.push(`${key}=${data[key]}`)
    };
    const dataStr= arr.join('&')
    return dataStr
}
//大窗口渲染用户基本信息
// function getUserInfo(){
//     userInfoApi((backData) => {
//       // console.log(backData.data.data);
//       let {nickname,username,user_pic}=backData.data.data
//     //   console.log(id,nickname,username,user_pic);
//     if(!nickname){
//         nickname=username
//     }
//     //渲染页面
//     $('.username').text(nickname)
//     $('.avatar').css('display', 'inline-block')
//     // 如果没上传图片 显示用户名的首字母大写
//     if (!user_pic) {
//         const firstLetter = nickname[0].toUpperCase()
//         $('.avatar').text(firstLetter)
//       } else {
//         $('.layui-nav-img').attr('src', user_pic)
//       }
//     });
//   }