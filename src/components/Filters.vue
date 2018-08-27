<template>
	<footer class="footer">
        <span class="todo-count">
          <strong>{{ activeTodos.length }}</strong> {{ items }} left
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ 'selected' : this.currentFilter === 'all'}">All</a></li>
          <li><a href="#/active" :class="{ 'selected' : this.currentFilter === 'active'}">Active</a></li>
          <li><a href="#/completed" :class="{ 'selected' : this.currentFilter === 'completed'}">Completed</a></li>
        </ul>
        <button 
          class="clear-completed" 
          v-show="completedTodos.length"
          v-on:click="clearCompleted">
          Clear completed
        </button>
      </footer>
</template>

<script type = "text/javascript" >
import { mapGetters } from 'vuex'

const ALLOWED_FILTERS = ['all', 'active', 'completed']
const DEFAULT_FILTER = 'all'

export default {
	computed: {
		currentFilter () {
			this.$store.state.filter
		},
		items () {
			return (this.activeTodos.length == 1 ? 'item' : 'items') 
		},
  		...mapGetters({
  			completedTodos: 'getCompletedTodos',
  			activeTodos: 'getActiveTodos'
		})
    },
	mounted() {
		this.setFilter()
		window.addEventListener('hashchange', this.setFilter);
	},
	methods: {
		setFilter() {
			const filter = window.location.hash.replace(/#\/?/, '');
		    if (ALLOWED_FILTERS.includes(filter)) {
		      this.$store.dispatch('setFilter', filter)
		    } else {
		      window.location.hash = ''
		      this.$store.dispatch('setFilter', DEFAULT_FILTER)
		    }
		},
		clearCompleted() {
			this.completedTodos.forEach(function(todo) {
				this.$store.dispatch('deleteTodo', todo)
			}.bind(this));
		}
	}
}  

</script>

<style>
</style>