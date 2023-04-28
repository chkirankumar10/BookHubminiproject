import {withRouter} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails

  const onClickBookItem = () => {
    const {history} = props
    history.push(`/books/${id}`)
  }

  return (
    <li className="book-item-list-container">
      <div className="book-item-btn">
        <button
          onClick={onClickBookItem}
          className="book-item-btn"
          type="button"
        >
          <img className="book-item-cover-pic" src={coverPic} alt={title} />
        </button>
      </div>
      <div className="book-item-details-card-container">
        <h1 className="book-item-title">{title}</h1>
        <p className="book-item-author-name">{authorName}</p>
        <div className="book-item-avg-rating-container">
          <p className="book-item-avg-rating">
            Avg Rating <BsFillStarFill className="book-item-start-icon" />
            {rating}
          </p>
        </div>
        <p className="book-item-status-heading">
          Status: <span className="book-item-status">{readStatus}</span>
        </p>
      </div>
    </li>
  )
}

export default withRouter(BookItem)
