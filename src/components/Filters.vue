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
          v-show="completedTodos.length"
          v-on:click="clearCompleted">
          Clear completed
        </button>
      </footer>
</template>

<script type = "text/javascript" >
import { store } from '../store.js'

const ALLOWED_FILTERS = ['all', 'active', 'completed']
const DEFAULT_FILTER = 'all'

export default {
	props: {
		activeCount: Number,
		completedTodos: Array,
		currentFilter: String
	},
	mounted() {
		this.setFilter()
		window.addEventListener('hashchange', this.setFilter);
	},
	methods: {
		setFilter() {
			const filter = window.location.hash.replace(/#\/?/, '');
		    if (ALLOWED_FILTERS.includes(filter)) {
		      store.setFilter(filter)
		    } else {
		      window.location.hash = ''
		      store.setFilter(DEFAULT_FILTER)
		    }
		},
		clearCompleted() {
			this.completedTodos.forEach(function(todo) {
				store.deleteTodo(todo)
			});
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