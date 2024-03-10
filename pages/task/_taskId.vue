<template>
  <div class="task-details">
    <div class="title-container">
      <h2 class="title">Task Details</h2>
    </div>
    <div class="form-group">
      <label for="title" class="label">Title:</label>
      <input id="title" type="text" v-model="task.title" class="input" />
    </div>
    <div class="form-group">
      <label for="status" class="label">Status:</label>
      <select id="status" v-model="task.status" class="input">
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <div class="form-group">
      <label for="description" class="label">Description:</label>
      <textarea id="description" v-model="task.description" class="input"></textarea>
    </div>
    <div class="button-group">
      <button class="update-button" @click="updateTaskHandler">Update Task</button>
      <button class="delete-button" @click="deleteTaskHandler">Delete Task</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskId: null,
      task: { id: null, title: '', status: 'notStarted', description: '' }
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
        status: 'notStarted',
        description: 'Sample Task Description'
      };
    },
    updateTaskHandler() {
      // Emit event to notify parent component about title change
      this.$emit('updateTask', this.task);
      this.$router.push('/');
    },
    deleteTaskHandler() {
      // Emit event to notify parent component about task deletion
      this.$emit('deleteTask', this.taskId);
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.task-details {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom right, #ff6699, #6699ff); /* Gradient background */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center align text */
}

.title-container {
  margin-bottom: 20px;
}

.title {
  color: #ffffff;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  color: #333333;
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







