<template>
  <section class="main">
  	<input class="toggle-all" type="checkbox" v-model="toggleAll" v-show="todos.length" v-on:click="editAll">
    <ul class='todo-list'>
        <Todo v-for="todo in todos" v-bind:todo="todo"/>
    </ul> 
  </section>
</template>

<script type = "text/javascript" >
import Todo from './Todo'
import { store } from '../store.js'

export default {
  data() {
  	return {
  		toggleAll: false
  	}
  },
  props: {
  	todos: Array,
  	allCompleted: Boolean
  },
  components: {
    Todo
  },
  methods: {
  	editAll () {
  		store.editAllTodos('done', !this.toggleAll)
  	}
  },
  watch: {
    allCompleted: {
      handler() {
      	if (this.allCompleted) {
      		this.toggleAll = true
      	} else {
      		this.toggleAll = false
      	}
      },
      deep: true	
    }
  }
}  

</script>

<style>
</style>
