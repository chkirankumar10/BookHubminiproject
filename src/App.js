import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
