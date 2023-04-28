import './index.css'

const LeftComponent = props => {
  const {bookshelvesList, activeList, setActiveList} = props

  const clickedItem = event => setActiveList(event.target.value)

  return (
    <>
      <div className="left-Nav-Container">
        <h1 className="BookShelves-Main-Heading">Bookshelves</h1>
        <ul className="BookShelves-lists">
          {bookshelvesList.map(eachItem => {
            const ActiveId = activeList === eachItem.value ? 'ActiveColor' : ''

            return (
              <li className="list-item" key={eachItem.id}>
                <button
                  onClick={clickedItem}
                  type="button"
                  value={eachItem.value}
                  key={eachItem.id}
                  className={`list-button ${ActiveId}`}
                >
                  {eachItem.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default LeftComponent
