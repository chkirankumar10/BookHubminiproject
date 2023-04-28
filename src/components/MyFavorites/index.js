import Header from '../Header'
import Footer from '../Footer'
import FavoriteContext from '../../Context/FavoriteContext'
import BookItem from '../BookItem'

import './index.css'

const MyFavorites = props => {
  const onClickedFavorite = () => {
    const {history} = props
    history.push('/shelf')
  }

  return (
    <>
      <Header favorite />
      <FavoriteContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="favorite-books-bg-container">
              <h1 className="favorite-books-heading">My Favorite Books</h1>
              {favoriteList.length === 0 ? (
                <div className="no-favorite-container">
                  <img
                    src="https://res.cloudinary.com/diag5apbn/image/upload/v1667557544/samples/BookHub/361-3611849_product-not-found-no-result-png_f3sgge.png"
                    className="no-favorite-image"
                    alt="no favorite"
                  />
                  <p className="no-favorite-text">No Favorite Books Found</p>
                  <button
                    className="failure-button"
                    onClick={onClickedFavorite}
                    type="button"
                  >
                    Add Favorite
                  </button>
                </div>
              ) : (
                <ul className="favorite-books-list-container">
                  {favoriteList.map(eachItem => (
                    <BookItem key={eachItem.id} bookDetails={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </FavoriteContext.Consumer>
      <Footer />
    </>
  )
}

export default MyFavorites
