<template>
	<header class="header">
		<h1>todos</h1>
		<input class="new-todo"
		placeholder="What needs to be done?"
		v-on:keyup.enter="addTodo"
		v-model="text"
		autofocus
		>
	</header>
</template>

<script type = 'text/javascript' >

export default {
	data() {
		return {
			text: ''	
		}
	},
	methods: {
		addTodo() {
			let trimedText = this.text.trim()
			if (trimedText) {
        		this.$store.dispatch('addTodo', {text: trimedText})
      		}  
			this.text = ''
		}
	}
}  
</script>