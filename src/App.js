<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import BookShelves from './components/BookShelves'

import NotFound from './components/NotFound'

<<<<<<< HEAD
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6
=======
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

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

<<<<<<< HEAD
<<<<<<< HEAD
const App = () => <div>Hello World</div>
=======
=======
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/bookshelves" component={BookShelves} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
<<<<<<< HEAD
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6
=======
>>>>>>> c9c4c3448a619ed3509d92f7f30dfdd8276c1bc6

export default App
