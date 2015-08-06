/**
 * @author xialei <xialeistudio@gmail.com>
 */
var crypto = require('crypto');
exports.md5 = function(str) {
	var md5 = crypto.createHash('md5');
	md5.update(str);
	return md5.digest('hex');
};