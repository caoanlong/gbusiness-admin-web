<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商家列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="商家名称">
						<el-input placeholder="请输入..." v-model="find.merchantName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="$router.push({name: 'savemerchant'})">添加联盟商</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini" 
                    v-loading="loading">
					<el-table-column label="商家名称" prop="merchantName"></el-table-column>
					<el-table-column label="推广/人" prop="promotionCount" width="80"></el-table-column>
					<el-table-column label="购买/单" prop="sellCount" width="80"></el-table-column>
					<el-table-column label="链接" prop="link">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showLinks(scope.row.merchantId)">链接</el-button>
                        </template>
                    </el-table-column>
					<el-table-column label="创建人" prop="createUserName" width="100" align="center"></el-table-column>
                    <el-table-column label="修改人" prop="updateUserName" width="100" align="center"></el-table-column>
					<el-table-column label="创建日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">
                                {{ scope.row.createTime | transDate('YYYY年MM月DD日 HH:mm:ss') }}
                            </span>
						</template>
					</el-table-column>
                    <el-table-column label="修改日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">
                                {{ scope.row.updateTime | transDate('YYYY年MM月DD日 HH:mm:ss') }}
                            </span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="250" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button 
                                size="mini" 
                                type="warning" 
                                icon="el-icon-edit" 
                                @click="$router.push({name: 'savemerchant', query: {id: scope.row.merchantId}})">
                                编辑
                            </el-button>
                            <el-button 
                                size="mini" 
                                type="danger" 
                                icon="el-icon-delete" 
                                @click="del(scope.row.merchantId)">
                                删除
                            </el-button>
						</template>
					</el-table-column>
				</el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
			</div>
		</el-card>
        <links :isVisible="isLinksVisible" :merchantId="currentMerchantId" @on-close="isLinksVisible = false"></links>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mixin } from '../../../utils/mixin'
import Merchant from '../../../api/Merchant'
import Links from './components/Links'
export default {
    mixins: [mixin],
    components: { Links },
    data() {
        return {
            loading: true,
            find: {
                merchantName: ''
            },
            isLinksVisible: false,
            currentMerchantId: ''
        }
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.find.merchantName = ''
            this.getList()
        },
        getList() {
            Merchant.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                merchantName: this.find.merchantName
            }).then(res => {
                this.loading = false
                this.total = res.total
                this.list = res.list
            })
        },
        showLinks(merchantId) {
            this.isLinksVisible = true
            this.currentMerchantId = merchantId
        },
        del(merchantId) {
            Merchant.del({ merchantId }).then(res => {
                Message.success(res.data.msg)
                this.getList()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
