import { Outlet } from "react-router-dom"

function Input() {
  return (
    <div className="App">
      <Outlet />

      {/* 底部 */}
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>"Part of"
          <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default Input;
