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
  {/* <ul className="todo-list" data-id="todo-list">
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
  </ul> */}
  <Outlet />
  <footer className={classNames("footer", { "none": list.length === 0 }) } data-testid="footer">
    <span className="todo-count">{list.length-selectedList.length} item left!</span>
    <ul className="filters" data-testid="footer-navigation">
      <li><span className="selected" onClick={onClick && (() => navigate("/all"))}>All</span></li>
      <li><span className="" onClick={onClick && (() => navigate("/active"))}>Active</span></li>
      <li><span className="" onClick={onClick && (() => navigate("/completed"))}>Completed</span></li>
    </ul>
    <button className="clear-completed" disabled="">Clear completed</button>
  </footer>
</main>
</section>