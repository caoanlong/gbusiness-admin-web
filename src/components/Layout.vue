<template>
    <div class="app-wrapper clearfix" :class="{hideSidebar: !sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="top-bar">
			<navbar></navbar>
			<tags-view></tags-view>
		</div>
		<div class="main-container right-container">
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import Sidebar from './Common/SideBar'
import Navbar from './Common/NavBar'
import AppMain from './Common/AppMain'
import TagsView from './Common/TagsView'
export default {
    name: 'layout',
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        }
    },
    components: {
        Navbar,
        Sidebar,
        AppMain,
        TagsView
    }
}
</script>

<style lang="stylus" scoped>
.top-bar
    position fixed
    top 0
    right 0
    z-index 99
    left 180px
.hideSidebar
    margin-left 36px
    .top-bar
        left 36px
</style>
