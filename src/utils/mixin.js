import { PAGEINDEX, PAGESIZE, TOTAL } from './const'

export const mixin = {
    data() {
        return {
            pageIndex: PAGEINDEX,
            pageSize: PAGESIZE,
            total: TOTAL,
            list: [],
            selectedList: []
        }
    },
    methods: {
        search() {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		reset() {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		handleCurrentChange(index) {
			this.pageIndex = index
			this.getList()
		},
		handleSizeChange(size) {
			this.pageSize = size
			this.pageIndex = PAGEINDEX
			this.getList() 
        }
    }
}