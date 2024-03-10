<template>
  <div class="container">
    <!-- Not Started Column -->
    <div class="column not-started" @dragover.prevent @drop="drop('notStarted')">
      <h2>Not Started Yet <span class="count">{{ notStartedCount }}</span></h2>
      <button @click="addTask('notStarted')" class="new-button">New Task</button>
      <div v-for="task in notStartedTasks" :key="task.id" class="draggable" draggable="true" @dragstart="dragStart(task, 'notStarted')" @click="editTask(task.id)">
        {{ task.title }}
      </div>
    </div>
    <!-- In Progress Column -->
    <div class="column in-progress" @dragover.prevent @drop="drop('inProgress')">
      <h2>In Progress <span class="count">{{ inProgressCount }}</span></h2>
      <button @click="addTask('inProgress')" class="new-button">New Task</button>
      <div v-for="task in inProgressTasks" :key="task.id" class="draggable" draggable="true" @dragstart="dragStart(task, 'inProgress')" @click="editTask(task.id)">
        {{ task.title }}
      </div>
    </div>
    <!-- Completed Column -->
    <div class="column completed" @dragover.prevent @drop="drop('completed')">
      <h2>Completed <span class="count">{{ completedCount }}</span></h2>
      <button @click="addTask('completed')" class="new-button">New Task</button>
      <div v-for="task in completedTasks" :key="task.id" class="draggable" draggable="true" @dragstart="dragStart(task, 'completed')" @click="editTask(task.id)">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notStartedTasks: [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' }
      ],
      inProgressTasks: [],
      completedTasks: []
    };
  },
  computed: {
    notStartedCount() {
      return this.notStartedTasks.length;
    },
    inProgressCount() {
      return this.inProgressTasks.length;
    },
    completedCount() {
      return this.completedTasks.length;
    }
  },
  methods: {
    addTask(status) {
      const newTask = { id: Date.now(), title: `New Task ${this[status + 'Count'] + 1}` };
      this[status + 'Tasks'].push(newTask);
    },
    dragStart(task, status) {
      // Set data to be transferred during drag
      event.dataTransfer.setData('task', JSON.stringify(task));
      event.dataTransfer.setData('status', status);
    },
    drop(status) {
      // Prevent the browser default handling of the data
      event.preventDefault();

      // Get the dragged task and its status
      const taskData = event.dataTransfer.getData('task');
      const taskStatus = event.dataTransfer.getData('status');

      // Parse the task data and add it to the target column
      const task = JSON.parse(taskData);
      this[status + 'Tasks'].push(task);

      // Remove the task from its original column
      const index = this[taskStatus + 'Tasks'].findIndex(t => t.id === task.id);
      if (index !== -1) {
        this[taskStatus + 'Tasks'].splice(index, 1);
      }
    },
    editTask(taskId) {
      // Redirect to the task details page
      this.$router.push({ name: 'task-taskId', params: { taskId } });
    },
    handleTaskUpdated(updatedTask) {
      // Find and update the corresponding task in the task columns
      const taskIndex = this.notStartedTasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.notStartedTasks.splice(taskIndex, 1, updatedTask);
        // Update other task columns similarly
      }
    },
    handleTaskDeleted(taskId) {
      // Remove the corresponding task from the task columns
      const taskIndex = this.notStartedTasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.notStartedTasks.splice(taskIndex, 1);
        // Update other task columns similarly
      }
    }
  },
  created() {
    // Listen for taskUpdated and taskDeleted events from the task details page
    this.$root.$on('taskUpdated', this.handleTaskUpdated);
    this.$root.$on('taskDeleted', this.handleTaskDeleted);
  },
  destroyed() {
    // Unsubscribe from events to prevent memory leaks
    this.$root.$off('taskUpdated', this.handleTaskUpdated);
    this.$root.$off('taskDeleted', this.handleTaskDeleted);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
  padding: 20px;
}

.count {
  font-size: 18px; /* Increased font size */
  color: #666; /* Darker color */
  margin-left: 10px; /* Added margin */
}

.not-started {
  background-color: #ffe082; /* Light yellow */
}

.in-progress {
  background-color: #90caf9; /* Light blue */
}

.completed {
  background-color: #c5e1a5; /* Light green */
}

.new-button {
  background-color: #4caf50; /* Green */
  color: white; /* White text */
  border: none; /* Remove border */
  padding: 10px 20px; /* Add padding */
  margin-top: 10px; /* Add margin to separate from tasks */
  cursor: pointer; /* Cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.new-button:hover {
  background-color: #388e3c; /* Darker green on hover */
}

.draggable {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  cursor: grab;
}
</style>


