import Base from './Base'
import request from '../utils/request'

class MerchantMember extends Base {
    findAll(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findAll',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new MerchantMember('/merchantMember', request)