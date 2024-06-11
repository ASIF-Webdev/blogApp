import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logOut } from "./store/authSlice"
import { Header, Footer } from "./components/index"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div>
      <div>
        <Header />
        <main>
          {/* Outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
