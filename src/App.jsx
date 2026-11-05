
import React, { Component } from "react";
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

// Main class component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tasks: []
    };
  }

  // Update input value
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  // Add a new task
  handleAdd = () => {
    const value = this.state.text.trim();

    if (value === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: value,
      done: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      text: ""
    });
  };

  // Toggle task completion
  handleToggle = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    });
  };

  // Delete a task
  handleDelete = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(
        (task) => task.id !== id
      )
    });
  };

  render() {
    const { text, tasks } = this.state;

    const completed = tasks.filter(
      (task) => task.done
    ).length;

    return (
      <div style={{ padding: "20px" }}>
        <h1>To-Do App</h1>

        <input
          type="text"
          value={text}
          onChange={this.handleChange}
          placeholder="Enter a task"
        />

        <button onClick={this.handleAdd}>
          Add
        </button>

        <h3>
          {completed} of {tasks.length} tasks done
        </h3>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.handleToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
