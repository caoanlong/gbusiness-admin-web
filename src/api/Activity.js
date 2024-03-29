import Base from './Base'
import request from '../utils/request'

class Activity extends Base {
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

export default new Activity('/activity', request)