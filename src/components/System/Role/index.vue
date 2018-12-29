<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>角色列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="角色名称">
						<el-input placeholder="请输入..." v-model="find.roleName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="$router.push({name: 'saverole'})">添加角色</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini" 
                    v-loading="loading">
					<el-table-column label="角色名称" prop="roleName"></el-table-column>
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
						<template slot-scope="scope" v-if="scope.row.permissions != '*'">
							<el-button size="mini" 
                                type="warning" 
                                icon="el-icon-edit" 
                                @click="$router.push({name: 'saverole', query: {id: scope.row.roleId}})">
                                编辑
                            </el-button>
							<el-button 
                                size="mini" 
                                type="danger" 
                                icon="el-icon-delete" 
                                @click="del(scope.row.roleId)">
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
import { mixin } from '../../../utils/mixin'
import Role from '../../../api/Role'
export default {
    mixins: [mixin],
    data() {
        return {
            find: {
                roleName: ''
            },
            loading: true
        }
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.find.roleName = ''
            this.getList()
        },
        getList() {
            Role.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                roleName: this.find.roleName
            }).then(res => {
                this.loading = false
                this.total = res.total
                this.list = res.list
            })
        },
        del(roleId) {
            Role.del({ roleId }).then(res => {
                Message.success(res.data.msg)
                this.getList()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
