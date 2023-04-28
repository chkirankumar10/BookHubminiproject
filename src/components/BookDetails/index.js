import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants1 = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    BookItemList: {},
    apiStatus1: apiStatusConstants1.initial,
  }

  componentDidMount() {
    this.getBookDetailsApi()
  }

  getBookDetailsApi = async () => {
    this.setState({apiStatus1: apiStatusConstants1.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookDetailsApi, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          aboutAuthor: fetchedData.book_details.about_author,
          readStatus: fetchedData.book_details.read_status,
          title: fetchedData.book_details.title,
        },
      }
      this.setState({
        BookItemList: updatedData,
        apiStatus1: apiStatusConstants1.success,
      })
    } else {
      this.setState({apiStatus1: apiStatusConstants1.failure})
    }
  }

  onClickRetry = () => {
    this.getBookDetailsApi()
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="top-rated-books-failure-container2">
      <img
        className="top-rated-books-failure-image2"
        src="https://res.cloudinary.com/dtayp31ut/image/upload/v1671035667/Home-Page-Failure-image_ee8av8.jpg"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading2">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn2"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookItemDetails = () => {
    const {BookItemList} = this.state
    const {bookDetails} = BookItemList
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
    } = bookDetails

    return (
      <div className="book-details-card-container">
        <div className="book-details-container">
          <div className="image-data-container">
            <img className="book-details-image" alt={title} src={coverPic} />
            <div className="container1">
              <h1 className="book-title" key={title}>
                {title}
              </h1>
              <p className="book-details-author-name">{authorName}</p>
              <div className="book-details-rating-container">
                <p className="book-details-abg-rating-heading">
                  Avg rating
                  <BsFillStarFill className="book-details-star-icon" /> {rating}
                </p>
              </div>
              <p className="book-details-status-heading">
                Status:
                <span className="book-details-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <div className="container2">
            <hr name="horizontal-line" />
            <div>
              <h1 className="about-heading">About Author</h1>
              <p className="about-paragraph">{aboutAuthor}</p>
            </div>
            <div>
              <h1 className="about-heading">About Book</h1>
              <p className="about-paragraph">{aboutBook}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBookViews = () => {
    const {apiStatus1} = this.state

    switch (apiStatus1) {
      case apiStatusConstants1.success:
        return this.renderBookItemDetails()
      case apiStatusConstants1.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants1.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="get-Book-details-container">
          {this.renderBookViews()}
          <Footer />
        </div>
      </>
    )
  }
}
export default BookDetails
