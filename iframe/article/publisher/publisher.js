//文章发布模块
//文章分类下拉框 表单验证
getArticleCategroyApi((backData) => {
  // console.log(backData.data.data);
  // <option value="" lay-verify="cate">所有分类</option>
  $(backData.data.data).each((index, item) => {
    $("select[name=cate_id]").append(
      `<option value="${item.Id}" lay-verify="cate">${item.name}</option>`
    );
    //手动属性下拉选项
    form.render("select", "edit");
  });
});
//初始化富文本
tinymce.init({
  selector: "textarea[name=content]", //容器，可使用css选择器
  language: "zh_CN", //调用放在langs文件夹内的语言包
  // toolbar: false, //隐藏工具栏
  // menubar: false, //隐藏菜单栏
  //   inline: true, //开启内联模式
  plugins: ["link", "table", "image"], //选择需加载的插件
  //选中时出现的快捷工具，与插件有依赖关系
  // quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
});

//初始化裁剪
let cropper=new Cropper($("#image")[0], {
    aspectRatio: 1, // 裁剪图层的横纵比例
    preview: $(".img-preview") // 多看文档里每个属性的意思, 一般都会有, 实在没用自己写/换个插件
})
$('.select').on('click',()=>{
    $('#file').click()
})
$('#file').on('change',function(){
    let file=this.files[0]
    let url=URL.createObjectURL(file)
    cropper.replace(url)
})
