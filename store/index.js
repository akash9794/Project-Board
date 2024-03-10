// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

// Vue.use(Vuex)

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       tasks: []
//     },
//     mutations: {
//       SET_TASKS(state, tasks) {
//         state.tasks = tasks
//       },
//       UPDATE_TASK(state, updatedTask) {
//         const index = state.tasks.findIndex(task => task.id === updatedTask.id)
//         if (index !== -1) {
//           state.tasks.splice(index, 1, updatedTask)
//         }
//       },
//       DELETE_TASK(state, taskId) {
//         state.tasks = state.tasks.filter(task => task.id !== taskId)
//       }
//     },
//     actions: {
//       setTasks({ commit }, tasks) {
//         commit('SET_TASKS', tasks)
//       },
//       updateTask({ commit }, updatedTask) {
//         commit('UPDATE_TASK', updatedTask)
//       },
//       deleteTask({ commit }, taskId) {
//         commit('DELETE_TASK', taskId)
//       }
//     },
//     plugins: [
//       // Use createPersistedState only in the browser environment
//       process.client ? createPersistedState() : null
//     ].filter(Boolean)
//   })
// }

// export default createStore


