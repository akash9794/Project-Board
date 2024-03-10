<template>
  <div class="task-details">
    <h2>Task Details</h2>
    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" type="text" v-model="task.title" />
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="task.description"></textarea>
    </div>
    <div class="button-group">
      <button class="update-button" @click="updateTask">Update Task</button>
      <button class="delete-button" @click="deleteTask">Delete Task</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskId: null,
      task: { id: null, title: '', description: '', status: '' }
    };
  },
  created() {
    this.taskId = parseInt(this.$route.params.taskId);
    this.fetchTaskDetails();
  },
  methods: {
    fetchTaskDetails() {
      // Fetch task details based on taskId
      // Replace this with your own logic to fetch task details
      this.task = {
        id: this.taskId,
        title: 'Sample Task Title',
        description: 'Sample Task Description',
        status: 'notStarted' // Assign initial status
      };
    },
    updateTaskHandler() {
      // Emit event to notify parent component about task update, including the new status
      this.$emit('updateTask', { task: this.task, newStatus: this.task.status });
      this.$router.push('/'); // Redirect to the home page after updating task
    },
    deleteTaskHandler() {
      // Implement logic to delete task
      console.log('Task deleted:', this.task);
      // Emit event to notify parent component about task deletion
      this.$emit('deleteTask', this.taskId);
      this.$router.push('/'); // Redirect to the home page after deleting task
    }
  }
};
</script>

<style>
.task-details {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button {
  background-color: #4caf50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

button:hover {
  background-color: #555;
}
</style>
