<template>
	<el-menu 
		mode="vertical" 
		:default-active="$route.name" 
		:collapse="isCollapse" 
		background-color="#304156" 
		text-color="#bfcbd9" 
		:unique-opened="true" 
		active-text-color="#409EFF"
		@select="selectIndex">
		<sidebar-item :routes="permissionMenus"></sidebar-item>
	</el-menu>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import menus from '../../../assets/data/menus.json'
export default {
	name: 'sideBar',
	data() {
		return {
			permissionMenus: []
		}
	},
	computed: {
		...mapGetters([
			'sidebar',
			'permissions'
		]),
		// menus: () => menus,
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	created() {
		this.walkMenus(menus)
		this.permissionMenus = menus
	},
	methods: {
		selectIndex(index) {
			this.$router.push({name: index})
		},
		walkMenus(menuList) {
			for (let i = 0; i < menuList.length; i++) {
				if (!this.permissions.includes(menuList[i].permission.path)) {
					if (menuList[i].children && menuList[i].children.length > 0) {
						this.walkMenus(menuList[i].children)
					}
					menuList.splice(i, 1)
				}
			}
		}
	},
	components: { 
		SidebarItem
	}
}
</script>