import './App.css'
import MainHeader from './components/mainHeader/MainHeader'
import MainCardList from './components/mainCardList/MainCardList'
import TaskList from './components/taskList/TaskList'
import FabButton from './components/fabButton/FabButton'

function App() {
  return (
    <>
      <div className="app-container">
        <div>
          <MainHeader />
        </div>
        <div>
          <MainCardList />
        </div>
        <div>
          <TaskList />
        </div>
        <div>
          <FabButton />
        </div>
      </div>
    </>
  )
}

export default App
