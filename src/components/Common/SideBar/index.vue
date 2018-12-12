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
		<sidebar-item :routes="menus"></sidebar-item>
	</el-menu>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import menus from '../../../assets/data/menus.json'
export default {
	name: 'sideBar',
	computed: {
		...mapGetters([
			'sidebar'
		]),
		menus: () => menus,
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	methods: {
		selectIndex(index) {
			this.$router.push({name: index})
		}
	},
	components: { 
		SidebarItem
	}
}
</script>