<template>
	<header class="header">
		<h1>todos</h1>
		<input class="new-todo"
		placeholder="What needs to be done?"
		v-on:keyup.enter="addTodo"
		v-model="text"
		>
	</header>
</template>

<script type = "text/javascript" >

export default {
	data() {
		return {
			text: ''	
		}
	},
	methods: {
		addTodo() {
			this.$bus.$emit("todoAdded", this.text)
			this.text = ''
		}
	}
}  

</script>

<style>
</style>