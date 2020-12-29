//接口封装
//全局基地址配置
axios.defaults.baseURL = "http://ajax.frontend.itheima.net";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("请求拦截器------", config);
    const AUTH_TOKEN = window.localStorage.getItem("token");
    //配置全局请求头
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
    // data: dataStr,
    dataType: "json",
  }).then((backData) => {
    cb(backData);
  });
};
