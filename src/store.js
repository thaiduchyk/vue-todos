export const store = {
	state: {
		todos: [],
		filter: 'all'
	},
	initTodos(todos) {
		this.state.todos = todos
	},
	addTodo(todo) {
		//todo.id = this.generateId()
		this.state.todos.push(todo);
	},
	deleteTodo(todo) {
		const todoIndex = this.state.todos.indexOf(todo);
      	this.state.todos.splice(todoIndex, 1);
	},
	editAllTodos(field, value) {
		this.state.todos.forEach(function (todo, index) {
			todo[field] = value
	  	})
	},
	setFilter(value) {
		this.state.filter = value
	}
};