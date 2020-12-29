//数据格式处理
const requestDataHandle=function(data){
    const arr=[]
    for(let key in data){
        arr.push(`${key}=${data[key]}`)
    };
    const dataStr= arr.join('&')
    return dataStr
}