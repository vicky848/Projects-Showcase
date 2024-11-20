import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import DashBoardItem from '../DashBoardItem'
import Headers from '../Headers'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class DashBoard extends Component {
  state = {
    productsItem: [],
    apiStatus: apiStatusConstant.initial,
    selectedCategory: 'ALL',
  }

  componentDidMount() {
    this.getProduct()
  }

  getProduct = async () => {
    const {selectedCategory} = this.state
    const category = selectedCategory === 'ALL' ? 'ALL' : selectedCategory

    this.setState({apiStatus: apiStatusConstant.inProgress})

    try {
      const url = `https://apis.ccbp.in/ps/projects?category=${category}`

      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        const formattedData = data.projects.map(project => ({
          id: project.id,
          name: project.name,
          imageUrl: project.image_url,
        }))
        this.setState({
          productsItem: formattedData,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstant.failure})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onChangeCategory = event => {
    this.setState({selectedCategory: event.target.value}, this.getProduct)
  }

  renderCategories = () => {
    const {categories} = this.props
    const {selectedCategory} = this.state
    return (
      <select
        className="category-select"
        value={selectedCategory}
        onChange={this.onChangeCategory}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.displayText}
          </option>
        ))}
      </select>
    )
  }

  renderSuccessView = () => {
    const {productsItem} = this.state
    return (
      <ul className="list-container">
        {productsItem.map(eachItem => (
          <DashBoardItem key={eachItem.id} productDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      /> 
      <h1 className = "failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button-retry" onClick={this.getProduct}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderDashboardView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <Headers />
        <div className="categories-container">{this.renderCategories()}</div>
        {this.renderDashboardView()}
      </div>
    )
  }
}

export default DashBoard
