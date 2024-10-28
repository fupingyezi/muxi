import { useState, useEffect } from "react"
import classNames from  "classname"


//随机数数组，渲染方块个数
function randomArray(size) {
    let arr = []
    let map = new Map()
    let tmp
    for (let i = 0; i < size*size; i++) {
      map.set(i, 0)
    }
    if (size % 2 === 0) {
      for (let i = 0; i < size*size; i++) {
        let x = Math.floor(Math.random() * (size * size/2))+1
        tmp = map.get(x)
        if (tmp < 2) {
          tmp++;
          map.set(x, tmp)
          arr.push(x)
        }
        else {
          i--;
        }
      }
    }
    else {
      for (let i = 0; i < size*size-1; i++) {
        let x = Math.floor(Math.random() * (size * size/2))+1
        tmp = map.get(x)
        if (tmp < 2) {
          tmp++;
          map.set(x, tmp)
          arr.push(x)
        }
        else {
          i--;
        }
      }
    }
    return arr
}


function App() {
  // 渲染方块
  const [arr, setArr] = useState([]);
  const [size, setSize] = useState(4);

  // 翻方块
  // const [stage, setStage] = useState(1);   //当前的阶段
  const [score, setScore] = useState(null);  //上一次翻的方块数字是多少
  const [lastIndex, setLastIndex] = useState(null);   //上一次翻的方块索引
  const [sum, setSum] = useState(0);   //一共翻面了多少个方块

  const reSet = () => {
    setArr(randomArray(size));
    document.querySelectorAll('div[data-name="grid-item"]').forEach(item => {
      item.classList.remove('bg-green-500')
      item.classList.remove('bg-blue-500')
      item.classList.add('bg-gray-300')
      item.classList.remove('text-white')
      item.classList.add('text-gray-400')
      item.innerHTML = '?'
    })
    setLastIndex(null);
    setSum(0)
    document.querySelector('div[data-name="skr"]').style.display = "none"
  }

  useEffect(() => {
    setArr(randomArray(size));
  }, [size])

  return (
    <div className="App">

      {/* 标题 */}
      <div className="flex flex-col items-center justify-center
      min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">无情翻翻乐</h1>

      {/* 输入框 */}
      <div className="mb-4">
      <label for="gridSize" class="mr-2">矩阵大小: (填入数字，最大值 10)</label>
      <input type="number" id="gridSize" min="2" max="10" class="border-2 border-gray-300 rounded px-2 py-1" value={size} onChange = {(e) => setSize(e.target.value)}/>
      </div>

      {/* 方块 */}
      <div className={classNames(`grid gap-2 mb-4`, {[`grid-container${size}`]: true})}>
        {arr.map((item, index) => {
          return (
            <div key={index} data-index={index} data-name="grid-item" className={classNames(`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300  bg-gray-300 text-gray-400`)} onClick = {(e) => {
              // console.log(Number(e.target.dataset.index))
              // console.log(lastIndex)
              console.log(sum)
              if (lastIndex === null) {
                e.target.classList.toggle("bg-blue-500")
                e.target.classList.toggle("text-white")
                e.target.innerHTML = item
                setLastIndex(index)
                setScore(item)
                setSum(sum + 1)
              }
              else {
                if (lastIndex === Number(e.target.dataset.index)) {
                  e.target.classList.remove("bg-blue-500")
                  e.target.classList.add("bg-gray-300")
                  e.target.classList.remove("text-white")
                  e.target.classList.add("text-gray-400")
                  e.target.innerHTML = '?'
                  setLastIndex(null)
                  setScore(null)
                }
                else {
                  e.target.classList.remove("bg-gray-300")
                  e.target.classList.add("bg-blue-500")
                  e.target.classList.remove("text-gray-400")
                  e.target.classList.add("text-white")
                  e.target.innerHTML = item
                  setTimeout(() => {
                    if (score === item) {
                      e.target.classList.remove("bg-blue-500")
                      e.target.classList.add("bg-green-500")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.remove("bg-blue-500")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.add("bg-green-500")
                      setLastIndex(null)
                      setScore(null)
                      setSum(sum + 1)
                    }
                    else {
                      e.target.classList.remove("bg-blue-500")
                      e.target.classList.add("bg-gray-300")
                      e.target.classList.remove("text-white")
                      e.target.classList.add("text-gray-400")
                      e.target.innerHTML = '?'
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.remove("bg-blue-500")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.add("bg-gray-300")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.remove("text-white")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).classList.add("text-gray-400")
                      document.querySelector(`.grid-container${size} div[data-index="${lastIndex}"]`).innerHTML = '?'
                      setLastIndex(null)
                      setScore(null)
                      setSum(sum - 1)
                    }
                    if (size*size % 2 === 0) {
                      if (sum === size*size-1) {
                        document.querySelector('div[data-name="skr"]').style.display = "block"
                        setSum(0)
                      } 
                    }
                    else {
                      if (sum === size*size-2) {
                        document.querySelector('div[data-name="skr"]').style.display = "block"
                        setSum(0)
                      }
                    }
                  },1000)
                }
              }
            }}>?</div>
          )
        })}
      </div>
      <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce none" data-name = "skr">你好厉害！</div>
      <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" onClick = {reSet}>重来</button>
      </div>
    </div>
  )
}

export default App
