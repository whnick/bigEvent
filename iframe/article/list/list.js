//获取文章列表并渲染到页面
// pagenum	是	int	页码值
// pagesize	是	int	每页显示多少条数据
// cate_id	否	string	文章分类的 Id
// state	否	string	文章的状态，可选值有：已发布、草稿
let data={
    pagenum:2,
pagesize:2,
cate_id:'',
state:'',
}
let total=0 //总数据条数
let {form,laypage}=layui
function loading(){
    getArticleListApi(data,(backData)=>{
        // console.log(backData);
        //渲染页面
        total=backData.data.total
        backData.data.data.forEach(item => {
            let list_str=`<tr>
            <td>${item.title}</td>
            <td>${item.cate_name}</td>
            <td>${moment(item.pub_date).format('MM DD YYYY HH:mm:ss')}</td>
            <td>${item.state}</td>
            <th>
            <a href="/iframe/article/publisher/publisher.html?id=${item.Id}" class="layui-btn layui-btn-xs">编辑</a>
            <button myid="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
            </th>
        </tr>`;
        $('.layui-table>tbody').append(list_str)
        });
        page()
    })
    
}
loading()
//分页
function page(){
    laypage.render({
        elem: 'page'
        ,count: total-2
        ,limit: data.pagesize
        ,curr: data.pagenum
        ,limits: [2, 5, 10, 20]
        ,layout: ['count', 'prev', 'page', 'next', 'limit']
        ,jump: function(obj,first){
        //   console.log(obj)
          if(!first){
              data.pagenum=obj.curr
              data.pagesize=obj.limit
              loading()
        }
        }
      });
}
//筛选 分类下拉框渲染
getArticleCategroyApi((backData) => {
    // console.log(backData.data.data);
    // <option value="" lay-verify="cate">所有分类</option>
    $("select[name=category]").append(`<option value="" lay-verify="cate">所有分类</option>`);
    $(backData.data.data).each((index, item) => {
      $("select[name=category]").append(
        `<option value="${item.Id}" lay-verify="cate">${item.name}</option>`
      );
    })

    //手动刷新下拉选项
    form.render("select", "category");
    $('.search').on('submit',(e)=>{
      e.preventDefault()
      data.cate_id=$('select[name=category]').val()
      data.state=$('select[name=state]').val()
      loading()
    });
  })

  //删除文章
  $(".layui-table>tbody").on("click", ".del", function (e) {
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
      id = $(e.target).attr("myid");
      deleteArticleByIdApi(id, (backData) => {
        $(e.target).parents("tr").remove();
  })
  layer.close(index);
  })
  })
 