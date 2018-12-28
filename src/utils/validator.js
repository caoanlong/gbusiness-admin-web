// 验证非负浮点数（正浮点数） 2位小数
export const checkFloat2 = (rule, value, callback) => {
	const r = /(^[1-9]\d*\.\d{1,2}$)|(^0{1}\.\d{1,2}$)|(^[1-9]\d*$)/
	if (value && !r.test(value)) {
		callback(new Error('请输入正确的数字'))
	} else {
		callback()
	}
}