import {  useEffect, useState } from "react"
import classNames from "classname"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../../store/modules/listStore"
import { updateSelect } from "../../store/modules/selectedListStore"
import { useNavigate } from "react-router-dom"

function All() {
    //列表元素
    const [list, setList] = useState([]);
    //选中的元素索引
    const [selectedList, setSelectedList] = useState([]);

    const newList = useSelector((state) => state.listStore.list || [])
    const newSelectedList = useSelector((state) => state.selectedListStore.selectedList || [])

    useEffect(() => {
        console.log("newList", newList)
        console.log("newSelectedList", newSelectedList)
        setList(newList)
        setSelectedList(newSelectedList)
    }, [newList, newSelectedList])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState("")

    //表单受控
    const inputChange = (e) => {
        setInputValue(e.target.value)
    }
    const inputKeyDown = (e) => {
        if (e.key === "Enter") {
            if (inputValue.trim() === "" || list.includes(inputValue.trim())) {
                if (list.includes(inputValue.trim()))
                    alert("该任务已存在!")
                return;
            }
            else {
                setList([inputValue, ...list])
                setInputValue("")
                let tmp = [...selectedList]
                for (let key in tmp) {
                    tmp[key]++
                }
                setSelectedList(tmp)
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
        let tmp = [...selectedList]
        for (let key in tmp) {
          if (tmp[key] > index) {
            tmp[key]--
          }
          else if (tmp[key] === index) {
            tmp = tmp.filter((item) => item!== index)
          }
          else {
            continue
          }
        }
        setSelectedList(tmp)
    }

    //删除已完成元素
    const deleteCompleted = () => {
        setList(list.filter((item, index) => !selectedList.includes(index)))
        setSelectedList([])
    }

    //点击更新list和selectlist
    const onClick = (e) => {
        dispatch(update(list))
        dispatch(updateSelect(selectedList))
        if (e.target.innerHTML === 'All') {
            navigate("/")
        }
        else if (e.target.innerHTML === 'Active') {
            navigate("/active")
        }
        else if (e.target.innerHTML === "Completed") {
            navigate("/completed")
        }
        else {
            return
        }        
    }
    


    return (
        <section className="todoapp" id="root">
        <header className="header" data-id="header">
          <h1>Todo List</h1>
          <div className="input-container">
            <input type="text" placeholder="What needs to be done?"
                        className="new-todo" id="todo-input" data-id="text-input" value={inputValue} onChange={inputChange} onKeyDown={inputKeyDown} />
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
              <li><span className="selected" onClick={onClick}>All</span></li>
              <li><span className="" onClick={onClick}>Active</span></li>
              <li><span className="" onClick={onClick}>Completed</span></li>
            </ul>
            <button className="clear-completed" disabled="" onClick={deleteCompleted}>Clear completed</button>
          </footer>
        </main>
      </section>
    )
}

export default All