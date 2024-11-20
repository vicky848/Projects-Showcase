import './index.css'

const DashBoardItem = props => {
  const {productDetails} = props
  const {name, imageUrl} = productDetails

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="image" />
      <p className="para-name">{name}</p>
    </li>
  )
}

export default DashBoardItem
