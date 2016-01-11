/**
 * @author xialei <xialeistudio@gmail.com>
 */
var fs = require('fs');
var tools = require('./tools');
var Promise = require('bluebird');
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
 */
var _set = function(key, value, duration) {
	var filename = cachePath + '/' + tools.md5(key);
	duration = duration == undefined ? 0 : (new Date().getTime() + duration * 1000);
	var obj = {
		key: key,
		value: value,
		expires_in: duration
	};
	return new Promise(function(resolve, reject) {
		fs.writeFile(filename, JSON.stringify(obj), 'UTF-8', function(e) {
			if (e) {
				return reject(e);
			}
			return resolve();
		});
	});
};
/**
 * 获取缓存
 * @param key
 * @returns {*}
 * @private
 */
var _get = function(key) {
	var filename = cachePath + '/' + tools.md5(key);
	if (!fs.existsSync(filename)) {
		return Promise.resolve(null);
	}
	return new Promise(function(resolve, reject) {
		fs.readFile(filename, 'UTF-8', function(err, data) {
			if (err) {
				return reject(err);
			}
			try {
				data = JSON.parse(data);
				//检测过期
				if (data.expires_in > 0 && data.expires_in < new Date().getTime()) {
					return resolve(null);
				}
				return resolve(data.value);
			}
			catch (e) {
				console.error('[xl-cache] getCache->jsonParse: ' + e.message + ', Promise will resolve(null)');
				return resolve(null);
			}
		});
	});
};
/**
 * 删除缓存
 * @param key
 * @returns {*}
 * @private
 */
var _remove = function(key) {
	var filename = cachePath + '/' + tools.md5(key);
	return new Promise(function(resolve, reject) {
		fs.unlink(filename, function(err) {
			if (err) {
				return reject(err);
			}
			return resolve();
		})
	});
};
/**
 * 清空缓存
 * @returns {*}
 * @private
 */
var _clean = function() {
	return new Promise(function(resolve, reject) {
		fs.readdir(cachePath, function(err, list) {
			if (err) {
				return reject(err);
			}
			return resolve(Promise.map(list, function(item) {
				var file = cachePath + '/' + item;
				fs.unlink(file);
				return Promise.resolve();
			}));
		});
	});
};
module.exports = {
	'set': _set,
	'get': _get,
	'remove': _remove,
	'clean': _clean
};