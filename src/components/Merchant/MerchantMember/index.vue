<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商家报名表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="商家报名人">
						<el-input placeholder="请输入..." v-model="find.merchantMemberName"></el-input>
					</el-form-item>
                    <el-form-item label="是否已添加商家" prop="roleId">
                        <el-select v-model="find.isAddMerchant" placeholder="请选择" style="width:100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已添加" value="Y"></el-option>
                            <el-option label="未添加" value="N"></el-option>
                        </el-select>
                    </el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini">
					<el-table-column label="商家报名人" prop="merchantMemberName"></el-table-column>
					<el-table-column label="行业" prop="industry"></el-table-column>
					<el-table-column label="是否已添加商家">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="success" v-if="scope.row.isAddMerchant == 'Y'">已添加</el-tag>
                            <el-tag size="mini" type="danger" v-else>未添加</el-tag>
                        </template>
                    </el-table-column>
					<el-table-column label="创建日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{ scope.row.createTime | transDate('YYYY年MM月DD日 hh:mm:ss') }}</span>
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
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mixin } from '../../../utils/mixin'
import MerchantMember from '../../../api/MerchantMember'
export default {
    mixins: [mixin],
    data() {
        return {
            find: {
                merchantMemberName: '',
                isAddMerchant: ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.find.merchantMemberName = ''
            this.find.isAddMerchant = ''
            this.getList()
        },
        getList() {
            MerchantMember.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                merchantMemberName: this.find.merchantMemberName,
                isAddMerchant: this.find.isAddMerchant
            }).then(res => {
                this.total = res.total
                this.list = res.list
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
