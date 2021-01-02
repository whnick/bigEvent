// 配置插件
let cropper=new Cropper($("#image")[0], {
    aspectRatio: 1, // 裁剪图层的横纵比例
    preview: $(".img-preview") // 多看文档里每个属性的意思, 一般都会有, 实在没用自己写/换个插件
})
//通过按钮控制file
$('.select').on('click',()=>{
    $('#file').click()
})
$('#file').on('change',function(){
    let file=this.files[0]
    let url=URL.createObjectURL(file)
    cropper.replace(url)
})
//通过确定按钮 发送请求并更新大窗口
$('.sure').on('click',function(){
    // 转换图片格式
    let canvas = cropper.getCroppedCanvas({
        // 利用cropper的方法, 把裁剪区域输出到一个canvas标签上 // width和height是canvas标签的大小
        width: 100,
        height: 100,
      })
      // canvas图像 -> base64字符串
      let base64Str = canvas.toDataURL('image/jpeg')
      // 因为base64Str有一些特殊的符号, 前端要进行URL编码, 再传给后台(node+express)会进行URL解码
      base64Str = encodeURIComponent(base64Str)
      // 拼参数
      let dataStr = 'avatar=' + base64Str
    resetAvatarApi(dataStr,(backData)=>{
        window.parent.getUserInfo();
    })
})

