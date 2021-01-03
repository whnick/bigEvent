//接口封装
//全局基地址配置
axios.defaults.baseURL = "http://ajax.frontend.itheima.net";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("请求拦截器------", config);
    //配置全局请求头
    const AUTH_TOKEN = window.localStorage.getItem("token");
    config.headers["Authorization"] = AUTH_TOKEN;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//添加响应拦截器
const { layer } = window.layui;
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { status, message } = response.data;
    layer.msg(message, { time: 2000 });
    if (status == 0) {
      return response;
    }
  },
  function (error) {
    const {
      response: {
        data: { message },
      },
    } = error;
    layer.msg(
      message,
      {
        time: 2000,
      },
      function () {
        window.localStorage.renmoveItem("token");
        window.parent.location.href = "/login.html";
      }
    );
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
//登录接口
const loginApi = function (dataStr, cb) {
  axios({
    method: "post",
    url: "/api/login",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
};
//注册接口
const registerApi = function (dataStr, cb) {
  axios({
    method: "post",
    url: "/api/reguser",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
};
//获取用户的基本信息
const userInfoApi = function (cb) {
  axios({
    method: "get",
    url: "/my/userinfo",
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
};
//设置用户的基本信息
const setUserInfoApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: "/my/userinfo",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}

//重置密码
const resetPasswordApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: "/my/updatepwd",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
//更换头像
const resetAvatarApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: "/my/update/avatar",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
// 获取文章分类列表
const getArticleCategroyApi=(cb)=>{
  axios({
    method: "get",
    url: "/my/article/cates",
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
// 新增文章分类列表
const addArticleCategroyApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: "/my/article/addcates",
    data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
//根据id删除文章分类
const deleteArticleCategroyApi=(dataStr,cb)=>{
  // axios({
  //   method: "get",
  //   url: '/my/article/deletecate',
  //   params: {
  //     id: dataStr
  //   },
  //   dataType: "json",
  // }).then((backData) => {
  //   cb(backData);
  // });
  axios.get(`/my/article/deletecate/${dataStr}`).then((res) => {
    cb(res)
  })
}

//编辑文章分类
const editArticleCategroyApi=(dataStr,cb)=>{
   axios({
    method: "post",
    url: '/my/article/updatecate',
  data:dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}

//发布新文章  FormData 格式
const addArticleApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: '/my/article/add',
  data:dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
//获取文章列表
const getArticleListApi=(dataStr,cb)=>{
  axios({
    method: "get",
    url: '/my/article/list',
  params:dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });

}
//根据id删除文章
const deleteArticleByIdApi=(dataStr,cb)=>{
  axios.get(`/my/article/delete/${dataStr}`).then((res) => {
    cb(res)
  })
}
//根据id获取文章
const getArticleByIdApi=(dataStr,cb)=>{
  axios.get(`/my/article/${dataStr}`).then((res) => {
    cb(res)
  })
}
//根据id更新文章
const updateArticleByIdApi=(dataStr,cb)=>{
  axios({
    method: "post",
    url: '/my/article/edit',
  data:dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
}
