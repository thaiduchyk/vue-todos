<template>
	<footer class="footer">
        <span class="todo-count">
          <strong>{{ activeCount }}</strong> {{ items }} left
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ 'selected' : this.currentFilter === 'all'}">All</a></li>
          <li><a href="#/active" :class="{ 'selected' : this.currentFilter === 'active'}">Active</a></li>
          <li><a href="#/completed" :class="{ 'selected' : this.currentFilter === 'completed'}">Completed</a></li>
        </ul>
        <button 
          class="clear-completed" 
          v-show="completedCount"
          v-on:click="clearCompleted">
          Clear completed
        </button>
      </footer>
</template>

<script type = "text/javascript" >

const ALLOWED_FILTERS = ['all', 'active', 'completed']

export default {
	props: {
		activeCount: Number,
		completedCount: Number,
		currentFilter: String
	},
	mounted() {
		window.addEventListener('hashchange', this.setFilter);
	},
	methods: {
		setFilter() {
			const filter = window.location.hash.replace(/#\/?/, '');
		    if (ALLOWED_FILTERS.includes(filter)) {
		      this.$bus.$emit("filterSet", filter)
		    } else {
		      window.location.hash = ''
		      this.$bus.$emit("filterSet", 'all')
		    }
		},
		clearCompleted() {
			this.$bus.$emit("completedCleared")
		}
	},
	computed: {
		items () {
			return (this.activeCount == 1 ? 'item' : 'items') 
		}
	}
}  

</script>

<style>
</style>