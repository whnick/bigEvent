//需求:增删改查

//渲染列表
//获取文章分类并渲染  ==>查
function articleLoading() {
  getArticleCategroyApi((backData) => {
    // console.log(backData.data.data);
    $(".layui-table>tbody").empty();
    backData.data.data.forEach((item) => {
      let list_str = `<tr>
  <td>${item.name}</td>
  <td>${item.alias}</td>
  <td>
    <button myid="${item.Id}" data-name="${item.name}" data-alias="${item.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
    <button myid="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
  </td>
  </tr>`;
      $(".layui-table>tbody").append(list_str);
    });
  });
}
articleLoading();

// 添加类型的 - 弹出层上的 表单标签
var add_str = `
<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
<div class="layui-form-item">
  <label class="layui-form-label">类别名称</label>
  <div class="layui-input-block">
    <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
  </div>
</div>
<div class="layui-form-item">
  <label class="layui-form-label">类别别名</label>
  <div class="layui-input-block">
    <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
  </div>
</div>
<div class="layui-form-item">
  <div class="layui-input-block">
    <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
  </div>
</div>
</form>`;
$(".add").on("click", () => {
  //弹出层
  let index = layer.open({
    type: 1,
    content: add_str, //'传入任意的文本或html'
    title: "新增分类",
    area: ["500px", "300px"],
    success: function () {
      $(".add-form").on("submit", (e) => {
        e.preventDefault();
        // 获取数据
        let dataStr = $(".add-form").serialize();
        // console.log(dataStr);
        //新增文章分类请求
        addArticleCategroyApi(dataStr, (backData) => {
          // console.log(backData);
          articleLoading();
        });
        layer.close(index);
      });
    },
  });
});
// //删除文章分类 事件代理delete
$(".layui-table>tbody").on("click", ".delete", function (e) {
  // console.log(id);
  layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
    id = $(e.target).attr("myid");
  //   //do something
    deleteArticleCategroyApi(id, (backData) => {
  //     // console.log(backData);
  //     // articleLoading()
  //     //优化
      $(e.target).parents("tr").remove();
  //   });
})
layer.close(index);
})
})

// 事件委托 - 编辑按钮 - 点击事件
$(".layui-table>tbody").on("click", ".edit", function (e) {
  let edit_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <input type="hidden" name="Id">
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit >确认修改</button>
        <button type="button" class="layui-btn layui-btn-primary my_reset">重置</button>
      </div>
    </div>
  </form>`;
  let id = $(e.target).attr("myid");
  let name = $(e.target).data("name");
  let alias = $(e.target).data("alias");
  let index = layer.open({
    type: 1,
    content: edit_str, //'传入任意的文本或html'
    title: "编辑分类",
    area: ["500px", "300px"],
    success: function () {
      //表单快速赋值
      form.val("edit", {
        Id: id,
        name,
        alias,
      });
      $(".add-form").on("submit", (e) => {
        e.preventDefault();
        // 获取数据
        let dataStr = $(".add-form").serialize();
        console.log(dataStr);
        //更新文章分类请求
        editArticleCategroyApi(dataStr, (backData) => {
          // console.log(backData);
          articleLoading();
        });
        layer.close(index);
      });
      $(".add-form").on("click", ".my_reset", (e) => {
        e.preventDefault();
        form.val("edit", {
          Id: id,
          name,
          alias,
        });
      });
    },
  });
});