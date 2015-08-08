/**
 * @author xialei <xialeistudio@gmail.com>
 */
var fs = require('fs');
var tools = require('./tools');
var cachePath = 'cache';
/**
 * 初始化，检测缓存目录是否存在
 */
var init = function() {
	fs.exists('cache', function(isExists) {
		if (!isExists) {
			fs.mkdir('cache', 666);
		}
	});
};
//初始化
init();
/**
 * 设置缓存
 * @param key
 * @param value
 * @param duration
 * @returns {*}
 * @private
 * @param callback
 */
var _set = function(key, value, duration, callback) {
	var filename = cachePath + '/' + tools.md5(key);
	if (typeof duration == 'function') {
		callback = duration;
		duration = 0;
	}
	else {
		duration = duration == 0 ? 0 : (new Date().getTime() + duration * 1000);
	}
	var obj = {
		key: key,
		value: value,
		expires_in: duration
	};
	fs.writeFile(filename, JSON.stringify(obj), 'UTF-8', callback);
};
/**
 * 获取缓存
 * @param key
 * @returns {*}
 * @private
 * @param callback
 */
var _get = function(key, callback) {
	var filename = cachePath + '/' + tools.md5(key);
	if (!fs.existsSync(filename)) {
		typeof callback == 'function' && callback(null, false);
		return;
	}
	fs.readFile(filename, 'UTF-8', function(err, data) {
		data = JSON.parse(data);
		//检测过期
		if (data.expires_in > 0 && data.expires_in < new Date().getTime()) {
			typeof callback == 'function' && callback(err, null);
		}
		else {
			typeof callback == 'function' && callback(err, data.value);
		}
	});
};
/**
 * 删除缓存
 * @param key
 * @returns {*}
 * @private
 * @param callback
 */
var _remove = function(key, callback) {
	var filename = cachePath + '/' + tools.md5(key);
	fs.unlink(filename, callback)
};
/**
 * 清空缓存
 * @returns {*}
 * @private
 */
var _clean = function(callback) {
	fs.readdir(cachePath, function(err, list) {
		if (err) {
			throw err;
		}
		else {
			list.forEach(function(item) {
				var file = cachePath+'/'+item;
				fs.unlink(file);
			});
		}
	});
};
module.exports = {
	'set': _set,
	'get': _get,
	'remove': _remove,
	'clean': _clean
};