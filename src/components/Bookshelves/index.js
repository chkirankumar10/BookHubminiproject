import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import Footer from '../Footer'
import BookItem from '../BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const bookApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    activeFilter: bookshelvesList[0].value,
    booksApiStatus: bookApiStatuses.initial,
    booksData: {},
    searchInput: '',
    search: '',
    activeFilterLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBooksApiData()
  }

  updatedBooksList = booksList =>
    booksList.map(eachBook => ({
      id: eachBook.id,
      title: eachBook.title,
      readStatus: eachBook.read_status,
      rating: eachBook.rating,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
    }))

  getBooksApiData = async () => {
    this.setState({booksApiStatus: bookApiStatuses.inProgress})

    const {search, activeFilter} = this.state
    const booksApi = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${search}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(booksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        books: this.updatedBooksList(fetchedData.books),
        total: fetchedData.total,
      }

      this.setState({
        booksData: updatedData,
        booksApiStatus: bookApiStatuses.success,
      })
    } else {
      this.setState({booksApiStatus: bookApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getBooksApiData()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBooks = () => {
    this.setState(
      prevState => ({search: prevState.searchInput}),
      this.getBooksApiData,
    )
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.onSearchBooks()
    }
  }

  renderBooksProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={32} width={32} />
    </div>
  )

  renderBooksFailureView = () => (
    <div className="book-shelves-failure-container">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/diag5apbn/image/upload/v1667567619/samples/BookHub/no-books-found_fbgtov.png"
        alt="failure view"
      />
      <p className="book-shelves-failure-heading">
        Something went wrong. Please try Again.
      </p>

      <button
        className="book-shelves-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderTheListOfBooks = () => {
    const {booksData} = this.state
    const {books} = booksData

    return (
      <ul className="bookList-container">
        {books.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  renderNoMatchBooks = () => {
    const {searchInput} = this.state
    return (
      <div className="no-match-found-container">
        <img
          className="failure-image"
          src="https://res.cloudinary.com/diag5apbn/image/upload/v1667567619/samples/BookHub/no-books-found_fbgtov.png"
          alt="no books"
        />
        <p className="no-match-paragraph">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksSuccessView = () => {
    const {booksData} = this.state
    const {total} = booksData
    if (total !== 0) {
      return <> {this.renderTheListOfBooks()} </>
    }
    return <> {this.renderNoMatchBooks()} </>
  }

  renderBooks = () => {
    const {booksApiStatus} = this.state
    switch (booksApiStatus) {
      case bookApiStatuses.success:
        return <> {this.renderBooksSuccessView()}</>
      case bookApiStatuses.inProgress:
        return <>{this.renderBooksProgressView()}</>
      case bookApiStatuses.failure:
        return <>{this.renderBooksFailureView()}</>
      default:
        return null
    }
  }

  render() {
    const {activeFilter, searchInput, activeFilterLabel} = this.state

    return (
      <>
        <Header shelves />
        <div>
          <div className="book-shelves-bg-container">
            <div className="book-shelves-filter-container">
              <h1 className="bookshelves-heading" key="title">
                Bookshelves
              </h1>
              <ul className="filter-list-container">
                {bookshelvesList.map(eachItem => {
                  const activeFilterClass =
                    activeFilter === eachItem.value ? 'active-filter' : ''
                  const onClickedFilter = () => {
                    this.setState(
                      {
                        activeFilter: eachItem.value,
                        activeFilterLabel: eachItem.label,
                      },
                      this.getBooksApiData,
                    )
                  }
                  return (
                    <li key={eachItem.label}>
                      <button
                        className={`active-filter-list-btn ${activeFilterClass}`}
                        onClick={onClickedFilter}
                        type="button"
                      >
                        {eachItem.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="large-container">
              <div className="filtered-books-search-input-container">
                <div>
                  <h1 className="filtered-books-heading">
                    {activeFilterLabel} Books
                  </h1>
                </div>
                <div className="search-input-container">
                  <input
                    placeholder="Search...."
                    type="search"
                    className="search-input"
                    onChange={this.onChangeInput}
                    value={searchInput}
                    onKeyDown={this.onKeyDown}
                  />
                  <button
                    className="search-btn"
                    onClick={this.onSearchBooks}
                    type="button"
                    testid="searchButton"
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
              <div>{this.renderBooks()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookShelves
