import {  useState } from "react";
import classNames from "classname";


function App() {
  //列表元素
  const [list, setList] = useState([]);
  //选中的元素索引
  const [selectedList, setSelectedList] = useState([]);
  //获取表单内容
  const [inputValue, setInputValue] = useState("");

  //表单受控
  const inputChange = (e) => {
    setInputValue(e.target.value);
  }
  const inputKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim() === "") {
        return;
      }
      else {
        setList([inputValue,...list])
      }
    }
  }


  //全选全不选
  const toggleAll = () => {
    if (selectedList.length === list.length) {
      setSelectedList([]);
    }
    else {
      setSelectedList(list.map((item, index) => index));
    }
  }

  //单选
  const SelectIndex = (index) => {
    if (selectedList.includes(index)) {
      setSelectedList(selectedList.filter((item) => item !== index));
    }
    else {
      setSelectedList([...selectedList, index]);
    }
  }
  //删除元素
  const deleteIndex = (index) => {
    setList(list.filter((item, itemIndex) => itemIndex !== index));
    setSelectedList(selectedList.filter((item) => item !== index));
  }


  return (
    <div className="App">
      <section className="todoapp" id="root">
        <header className="header" data-id="header">
          <h1>Todo List</h1>
          <div className="input-container">
            <input type="text" placeholder="What needs to be done?"
              className="new-todo" id="todo-input" data-id="text-input" onChange={inputChange} onKeyDown={inputKeyDown} />
            <label className="visually-hidden" htmlFor="new-todo">New Todo Input</label>
          </div>
        </header>
        <main className="main" data-id="main">
          <div className={classNames("toggle-all-container", { "none": list.length === 0 })} >
            <input type="checkbox" className="toggle-all" data-id="toggle-all" onClick={toggleAll} />
            <label htmlFor="toggle-all" className="toggle-all-label">Mark all as complete</label>
          </div>
          <ul className="todo-list" data-id="todo-list">
          {list.map((item, index) => {
            return (
              <li key={index} data-index={index} className="todo-item" data-id="todo-item">
                <input className="toggle" type="checkbox"
                  data-testid="todo-item-toggle" onClick={() => SelectIndex(index)} checked={selectedList.includes(index)} />
                <label data-testid="todo-item-label" className={classNames({"decoration": selectedList.includes(index)})}>{item}</label>
                <button className="destroy" data-testid="todo-item-button"
                  onClick={() => deleteIndex(index)}></button>
              </li>
            )
          })}
          </ul>
          <footer className={classNames("footer", { "none": list.length === 0 }) } data-testid="footer">
            <span className="todo-count">{list.length-selectedList.length} item left!</span>
            <ul className="filters" data-testid="footer-navigation">
              <li><a className="selected" href="#/">All</a></li>
              <li><a className="" href="#/active">Active</a></li>
              <li><a className="" href="#/completed">Completed</a></li>
            </ul>
            <button className="clear-completed" disabled="">Clear completed</button>
          </footer>
        </main>
      </section>

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

export default App;
