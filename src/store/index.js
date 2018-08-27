import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	todos: [],
	filter: 'all'
}

const getters = {
	getAllTodos: state => state.todos,
	getActiveTodos: state => state.todos.filter(todo => !todo.done),
	getCompletedTodos: state => state.todos.filter(todo => todo.done),
	getFilteredTodos (state, getters) {
		if (state.filter === 'all') {
			return getters.getAllTodos
		} else if (state.filter === 'active') {
			return getters.getActiveTodos
		} else if (state.filter === 'completed') {
			return getters.getCompletedTodos;  
		}
	},
	allCompleted (state, getters) {
		return state.todos.length && !getters.getActiveTodos.length;
	}
}

const mutations = {
	INITIALIZE_STORE (state) {
		if (localStorage.getItem('todos-app-store')) {
			this.replaceState(
				Object.assign(state, JSON.parse(localStorage.getItem('todos-app-store')))
				);
		}
	},
	ADD_TODO (state, payload) {
		let newTodo = {
			text: payload.text,
			done: false
		}
		state.todos.push(newTodo);
	},
	TOGGLE_TODO (state, payload) {
		payload.todo.done = payload.done
	},
	DELETE_TODO (state, payload) {
		let todoIndex = state.todos.indexOf(payload);
      	state.todos.splice(todoIndex, 1);
	},
	UPDATE_FILTER (state, payload) {
		state.filter = payload
	}
}

const actions = {
	addTodo (context, payload) {
		context.commit("ADD_TODO", payload)
	},
	deleteTodo (context, payload) {
		context.commit("DELETE_TODO", payload)
	},
	toggleAll ({ commit, state }, payload) {
		state.todos.forEach((todo) => {
      		commit('TOGGLE_TODO', { todo: todo, done: payload })
    	})
	},
	setFilter (context, payload) {
		context.commit("UPDATE_FILTER", payload)
	}
}

const saveToLSPlugin = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('todos-app-store', JSON.stringify(state));
  })
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	plugins: [saveToLSPlugin]
})