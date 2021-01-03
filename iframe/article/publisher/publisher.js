//编辑文章 根据id该表单赋值 该id是有list页面传递到当前页面
let Id = window.location.href.split("=")[1];
// console.log(Id);
function editArticle() {
  if (Id) {
    getArticleByIdApi(Id, (backData) => {
      // console.log(backData.data.data);
      //快速赋值
      form.val("edit", backData.data.data);
      //分类赋值
      form.render("select", "edit");
      //图片赋值
      let url = backData.data.data.cover_img;
      // $('#image').attr('src',`http://ajax.frontend.itheima.net${url}`)
      cropper.replace(`http://ajax.frontend.itheima.net${url}`);
    });
  }
}
editArticle();
//发布文章模块
//文章分类下拉框 表单验证
getArticleCategroyApi((backData) => {
  // console.log(backData.data.data);
  // <option value="" lay-verify="cate">所有分类</option>
  $(backData.data.data).each((index, item) => {
    $("select[name=cate_id]").append(
      `<option value="${item.Id}" lay-verify="cate">${item.name}</option>`
    );
    //手动刷新下拉选项
    form.render("select", "edit");
    editArticle();
  });
});

//初始化富文本
// tinymce.init({
//   selector: "textarea[name=content]", //容器，可使用css选择器
//   language: "zh_CN", //调用放在langs文件夹内的语言包
//   plugins: ["link", "table", "image"], //选择需加载的插件
//   //选中时出现的快捷工具，与插件有依赖关系
// });
initEditor()

//初始化裁剪
let cropper = new Cropper($("#image")[0], {
  aspectRatio: 1, // 裁剪图层的横纵比例
  preview: $(".img-preview"), // 多看文档里每个属性的意思, 一般都会有, 实在没用自己写/换个插件
});
$(".select").on("click", () => {
  $("#file").click();
});
$("#file").on("change", function () {
  let file = this.files[0];
  let url = URL.createObjectURL(file);
  cropper.replace(url);
});
//发布新文章
// title	是	string	文章标题
// cate_id	是	int	所属分类 Id
// content	是	string	文章内容
// cover_img	是	blob二进制	文章封面
// state 	是	string	状态，可选值为：已发布、草稿
$(".layui-form").on("submit", function (e) {
  e.preventDefault();
  //获取数据
  let fd = new FormData($(".layui-form")[0]);
  //获取富文本插件的文本
  let textStr = tinyMCE.activeEditor.getContent();
  fd.set("content", textStr);
  // cover_img	是	blob二进制	文章封面
  let canvas = cropper.getCroppedCanvas({
    // 利用cropper的方法, 把裁剪区域输出到一个canvas标签上 // width和height是canvas标签的大小
    width: 100,
    height: 100,
  });
  canvas.toBlob(function (blobObj) {
    // console.log(blobObj);
    fd.append("cover_img", blobObj);
    // fd.forEach((item,index)=>{
    //   console.log(item,index);
    // })
    // 发送请求
    if (Id) {
      fd.append("Id", Id);
      updateArticleByIdApi(fd, (backData) => {
        // console.log(backData);
        setTimeout(() => {
          window.location.href = "../list/list.html";
        }, 1000);
      });
    } else {
      addArticleApi(fd, (backData) => {
        // console.log(backData);
        setTimeout(() => {
          window.location.href = "../list/list.html";
        }, 1000);
      });
    }
  });
});
