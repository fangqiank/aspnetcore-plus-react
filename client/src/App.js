import './App.css'
import { PostProvider } from './context/PostContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { PostList } from './pages/PostList'
import { PostDetail } from './pages/PostDetail'

function App() {
  return (
    <>
      <Header />

      <Router>
        <PostProvider>
          <div className="container dark">
            <div className="app">
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
              </Routes>
            </div>
          </div>
        </PostProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
