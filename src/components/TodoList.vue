<template>
  <section class="main">
  	<input class="toggle-all" type="checkbox" v-model="toggleAll">
    <ul class='todo-list' v-for="todo in todos">
        <Todo v-bind:todo="todo"/>
    </ul> 
  </section>
</template>

<script type = "text/javascript" >
import Todo from './Todo'

export default {
  data() {
  	return {
  		toggleAll: null
  	}
  },
  props: ['todos'],
  components: {
    Todo
  },
  watch: {
    toggleAll: {
      handler: function () {
      	const toggleAll = this.toggleAll
        this.todos.forEach(function (todo, index) {
			todo.done = toggleAll
	  	});
      }
    }
  }
}  

</script>

<style>
</style>
