import DashBoard from './Components/DashBoard'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const App = () => (
  <div className="app-container">
    <DashBoard categories={categoriesList} />
  </div>
)

export default App
