<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>活动列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="活动名称">
						<el-input placeholder="请输入..." v-model="find.activityName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button 
                    type="primary" 
                    size="mini" 
                    icon="el-icon-plus" 
                    @click="$router.push({name: 'saveactivity'})">
                    添加活动
                </el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini" 
                    v-loading="loading">
					<el-table-column label="活动名称" prop="name"></el-table-column>
					<el-table-column label="价格" prop="price" width="100">
                        <template slot-scope="scope">
                            {{scope.row.price}}元
                        </template>
                    </el-table-column>
                    <el-table-column label="截止时间" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.endTime">
                                {{ scope.row.endTime | transDate('YYYY年MM月DD日 HH:mm:ss') }}
                            </span>
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
                                @click="$router.push({name: 'saveactivity', query: {id: scope.row.activityId}})">
                                编辑
                            </el-button>
                            <el-button 
                                size="mini" 
                                type="danger" 
                                icon="el-icon-delete" 
                                @click="del(scope.row.activityId)">
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
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mixin } from '../../utils/mixin'
import Activity from '../../api/Activity'
export default {
    mixins: [mixin],
    data() {
        return {
            find: {
                activityName: ''
            },
            loading: true
        }
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.find.activityName = ''
            this.getList()

        },
        getList() {
            Activity.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                activityName: this.find.activityName
            }).then(res => {
                this.loading = false
                this.total = res.total
                this.list = res.list
            })
        },
        del(activityId) {
            Activity.del({ activityId }).then(res => {
                Message.success(res.data.msg)
                this.getList()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
