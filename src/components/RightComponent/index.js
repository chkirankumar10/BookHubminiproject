import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import BookItem from '../BookItem'
import Footer from '../Footer'

import LeftComponent from '../LeftComponent'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

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

class RightComponent extends Component {
  state = {
    data: {},
    searchInput: '',
    activeList: bookshelvesList[0].value,
    booksApiStatus: apiStatusConstants.initial,
    activeValue: '',
    search: '',
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
    this.setState({booksApiStatus: apiStatusConstants.inProgress})

    const {search, activeList} = this.state
    const booksApi = `https://apis.ccbp.in/book-hub/books?shelf=${activeList}&search=${search}`

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
      console.log(fetchedData)
      const updatedData = {
        books: this.updatedBooksList(fetchedData.books),
        total: fetchedData.total,
      }

      this.setState({
        data: updatedData,
        booksApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({booksApiStatus: apiStatusConstants.failure})
    }
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

  renderNoMatchBooks = () => {
    const {searchInput} = this.state
    return (
      <div className="no-match-found-container">
        <img
          className="no-match-image"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="no books"
        />
        <p className="no-match-paragraph">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderTheListOfBooks = () => {
    const {data} = this.state
    const {books} = data

    return (
      <>
        <ul className="bookList-container">
          {books.map(eachBook => (
            <BookItem key={eachBook.id} bookDetails={eachBook} />
          ))}
        </ul>
      </>
    )
  }

  renderBooksSuccessView = () => {
    const {data} = this.state
    const {total} = data

    if (total !== 0) {
      return <>{this.renderTheListOfBooks()} </>
    }
    return <>{this.renderNoMatchBooks()} </>
  }

  setActiveList = value => {
    this.setState({activeList: value}, this.getBooksApiData)
  }

  onClickRetry = () => {
    this.getBooksApiData()
  }

  renderBooksProgressView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#8284C7" height={32} width={32} />
    </div>
  )

  renderBooksFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image1"
        src="https://res.cloudinary.com/dtayp31ut/image/upload/v1671035667/Home-Page-Failure-image_ee8av8.jpg"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading1">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn1"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBooks = () => {
    const {booksApiStatus} = this.state
    switch (booksApiStatus) {
      case apiStatusConstants.success:
        return <> {this.renderBooksSuccessView()}</>
      case apiStatusConstants.inProgress:
        return <>{this.renderBooksProgressView()}</>
      case apiStatusConstants.failure:
        return <>{this.renderBooksFailureView()}</>
      default:
        return null
    }
  }

  render() {
    const {activeList, searchInput, activeValue} = this.state
    return (
      <>
        <LeftComponent
          bookshelvesList={bookshelvesList}
          activeList={activeList}
          setActiveList={this.setActiveList}
        />
        <div className="Right-Component-main-Container">
          <div className="filtered-item-main-Container">
            <div className="filtered-item-Container">
              <h1 className="Right-component-heading">{activeValue} Books</h1>
              <div className="search-input-container">
                <input
                  placeholder="Search...."
                  type="search"
                  className="search-input"
                  onChange={this.onChangeInput}
                  value={searchInput}
                />
                <button
                  testid="searchButton"
                  className="search-btn"
                  onClick={this.onSearchBooks}
                  type="button"
                >
                  <BsSearch className="search=icon" />
                </button>
              </div>
            </div>
            <div className="mobile-search-input-container">
              <input
                placeholder="Search...."
                type="search"
                className="mobile-search-input"
                onChange={this.onChangeInput}
                value={searchInput}
              />
              <button
                testid="searchButton"
                className="mobile-search-btn"
                onClick={this.onSearchBooks}
                type="button"
              >
                <BsSearch className="search=icon" />
              </button>
              <h1 className="mobile-bookshelves-heading">Bookshelves</h1>
              <ul className="mobile-filter-un-order-list-container">
                {bookshelvesList.map(eachItem => {
                  const activeFilterClass =
                    activeList === eachItem.value ? 'active-filter-mobile' : ''
                  const onClickedFilter = () => {
                    this.setState(
                      {
                        activeList: eachItem.value,
                        activeValue: eachItem.label,
                      },
                      this.getBooksApiData,
                    )
                  }
                  return (
                    <li
                      className="mobile-active-filter-list1"
                      key={eachItem.label}
                    >
                      <button
                        className={`mobile-active-filter-list ${activeFilterClass}`}
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

            <div>{this.renderBooks()}</div>
          </div>

          <div className="Footer">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default RightComponent
