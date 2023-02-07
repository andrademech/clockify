import { useEffect, useState } from 'react'
import './App.css'

// Preciso construir uma aplicação que receba uma task e faça uma contagem do tempo que ela leva para ser concluída
// Preciso de um botão que inicie a contagem
// Preciso de um botão que pare a contagem
// Preciso que exiba a task e o tempo que levou para ser concluída
// Preciso que exiba o tempo total de todas as tasks

interface Task {
  task: string
  time: number
}

function App() {
  const [task, setTask] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [totalTime, setTotalTime] = useState<Task[]>([])

  useEffect(() => {
    let intervalId: number | undefined
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isRunning])

  function handleStart() {
    setIsRunning(true)
  }

  function handleStop() {
    setIsRunning(false)
    setTotalTime([...totalTime, { task, time }])
    setTask('')
    setTime(0)
  }

  return (
    <div>
      <h1>Insira sua Task =D</h1>
      <div>
        <form action="" className='form'>
          <input className='input' type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button className='button' type="button" onClick={handleStart}>
            Iniciar
          </button>
          <button className='button' type="button" onClick={handleStop}>
            Parar
          </button>
        </form>
      </div>
      <div>
        <span>Tempo: {time} segundos</span>
      </div>
      <div>
        <h2>Lista de Tasks</h2>
        {totalTime.map((task, index) => {
          return (
            <div key={index}>
              <p>{task.task}: {task.time} segundos</p>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default App
