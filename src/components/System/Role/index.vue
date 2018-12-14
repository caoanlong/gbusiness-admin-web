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
				<el-button type="danger" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
                    :data="list" 
                    border 
                    style="width: 100%" 
                    size="mini" 
                    @selection-change="selectionChange">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="角色名称" prop="roleName"></el-table-column>
					<el-table-column label="创建人" prop="createBy" width="100" align="center"></el-table-column>
					<el-table-column label="创建日期" align="center" width="170">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{ scope.row.createTime | transDate('YYYY年MM月DD日 hh:mm:ss') }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="250" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="warning" icon="el-icon-edit" @click="$router.push({name: 'saverole', query: {id: scope.row.roleId}})">编辑</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.roleId)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
			</div>
		</el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 400,
            pageIndex: 1,
            pageSize: 100,
            find: {
                roleName: ''
            },
            list: [
                {
                    roleId: 1,
                    roleName: '运营',
                    createBy: '龙哥',
                    createTime: new Date()
                }
            ],
            selectedList: []
        }
    },
    methods: {
        reset() {
            this.find.roleName = ''
        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        selectionChange() {

        },
        search() {

        },
        edit() {

        },
        del() {

        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
