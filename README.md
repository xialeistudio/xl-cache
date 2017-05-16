# xl-cache
nodejs文件缓存模块
## 使用方法
+ 添加缓存 
set(key,value,[duration]);    
duration 过期时常，单位秒，不传或者传0时缓存不过期    
```javascript
cache.set('test1', 'xialei').then(function() {
//设置缓存成功
}).catch(function(e) {
//设置缓存失败		
});
```
+ 读取缓存    
get(key);    
```javascript
cache.get('test1').then(function(data) {
    console.log(data);
}).catch(function(e) {
});
```
+ 删除缓存   
 remove(key);    
```javascript
cache.remove('test').then(function() {
//删除成功
}).catch(function(e) {
//删除失败
});
```
+ 清空缓存   
 clean();        
```javascript
cache.clean().then(function() {
//清空成功
}).catch(function(e) {
//清空失败
});
```
# 单元测试
```
npm run test
```
