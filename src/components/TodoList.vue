<template>
  <section class="main">
  	<input class="toggle-all" type="checkbox" v-model="toggleValue" v-show="todos.length" v-on:click="toggleAll">
    <ul class='todo-list'>
        <Todo v-for="todo in todos" v-bind:todo="todo"/>
    </ul> 
  </section>
</template>

<script type = "text/javascript" >
import Todo from './Todo'
import { mapGetters } from 'vuex'

export default {
  data() {
  	return {
  		toggleValue: false
  	}
  },
  computed: {
  	...mapGetters({
  		todos: 'getFilteredTodos',
  		allCompleted: 'allCompleted'
	})
  },
  components: {
    Todo
  },
  methods: {
  	toggleAll() {
  		this.$store.dispatch('toggleAll', !this.toggleValue)
  	}
  },
  watch: {
    allCompleted: {
      handler() {
      	this.toggleValue = this.allCompleted
      }
    }
  }
}  

</script>

<style>
</style>
