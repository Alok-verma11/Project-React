import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h2>ℹ️ About This App</h2>

      <p style={styles.text}>
        This is a simple <strong>Todo List App</strong> built using
        <strong> React</strong>. The main purpose of this app is to help users
        manage their daily tasks in an easy and organized way.
      </p>

      <p style={styles.text}>
        You can add new tasks, mark them as completed, and delete tasks when
        they are no longer needed.
      </p>

      <h3>🚀 Features</h3>
      <ul style={styles.list}>
        <li>Add tasks</li>
        <li>Delete tasks</li>
        <li>Mark tasks as completed</li>
        <li>Simple and clean UI</li>
      </ul>

      <p style={styles.footer}>Made with ❤️ using React</p>
    </div>
  );
};

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    fontFamily: "Arial",
    lineHeight: "1.6",
  },
  text: {
    marginBottom: "15px",
  },
  list: {
    marginLeft: "20px",
  },
  footer: {
    marginTop: "30px",
    color: "gray",
    fontSize: "14px",
  },
};

export default About;
