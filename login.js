//需求:
/* 
    功能一:点击按钮#goto-register和按钮#goto-login 控制登录盒子和注册盒子的显示和隐藏
    功能二:注册盒子的ajax请求 表单校验
    功能三:登录盒子的校验和请求
*/
//注册#goto-register点击事件 
$('#goto-register').on('click',function(){
    $('#login').hide().siblings('#register').show()
})
//注册#goto-login点击事件 
$('#goto-login').on('click',function(){
    $('#login').show().siblings('#register').hide()
})
// 功能二:注册盒子的ajax请求
const {form,layer}=window.layui
  //表单校验
  form.verify({
    username: [
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成'
    ]
    ,password: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
    ,repeatpd:(value)=>{//value：表单的值、item：表单的DOM对象
        if($('.register-password').val()!=value){
            return '两次密码不相同'
        }
    }
  }); 
$('#registerBtn').on('click',(e)=>{
    //阻止表单的默认跳转
    e.preventDefault()
    //获取表单数据
    const data={username:$('.register-username').val(),password:$('.register-password').val()}
    const arr=[]
    for(let key in data){
        arr.push(`${key}=${data[key]}`)
    };
    const dataStr= arr.join('&')
      //axios发送请求
      axios({
          method:'post',
          url:'http://ajax.frontend.itheima.net/api/reguser',
        data:dataStr,
        dataType:'json'
      }).then((backData)=>{
          console.log(backData.data);
          const {status,message}=backData.data
            if(status==0){
              layer.msg('注册成功,返回登录页面', {
                  icon: 1,
                  time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                  $('#goto-login').click()
                })
            }else{
                layer.msg(message, {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                })
            }
      })
})
// 功能三:登录盒子请求
$('#loginBtn').on('click',(e)=>{
    //阻止表单的默认跳转
    e.preventDefault()
    //获取登录表单数据
    const data={username:$('.login-username').val(),password:$('.login-password').val()}
    const arr=[]
    for(let key in data){
        arr.push(`${key}=${data[key]}`)
    };
    const dataStr= arr.join('&')
    console.log(dataStr)
    //   //axios发送请求
      axios({
          method:'post',
          url:'http://ajax.frontend.itheima.net/api/login',
        data:dataStr,
        dataType:'json'
      }).then((backData)=>{
          const {status,message}=backData.data
            if(status==0){
              layer.msg('登录成功', {
                  icon: 1,
                  time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }
                , function(){
                  window.location.href='./index.html'
                })
            }else{
                layer.msg(message, {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                })
            }
      })
})