<template>
  <li class="todo"
      :class="{ completed: todo.done, editing: this.edited}">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.done">
      <label v-on:dblclick="startEditing"> {{ todo.text }} </label>
      <button class="destroy" v-on:click="deleteTodo"></button>
    </div>
    <input class="edit" type="text"
           v-model="todo.text"
           v-on:keyup.enter="finishEditing"
           v-on:blur="finishEditing"
           v-on:keyup.esc="cancelEditing"
    >     
  </li> 
</template>

<script type = "text/javascript" >

export default {
  props: ['todo'],
  data() {
    return {
      edited: false,
      beforeEditText: ''
    }
  }, 
  methods: {
    deleteTodo() {
      this.$bus.$emit("todoDeleted", this.todo)
    },
    toggleEdited(bool) {
      this.edited = bool
    },
    startEditing() {
      this.beforeEditText = this.todo.text
      this.toggleEdited(true)
    },
    finishEditing() {
      this.todo.text = this.todo.text.trim()
      if(!this.todo.text){
        this.deleteTodo(this.todo)
      }
      this.toggleEdited(false)  
    },
    cancelEditing() {
      this.todo.text = this.beforeEditText
      this.toggleEdited(false)
      this.beforeEditText = ''
    }
  }
}  

</script>

<style>
</style>