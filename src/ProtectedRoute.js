import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { UserContext } from "./UserContext"

const ProtectedRoute = ({ children,  ...rest }) => {

  const user = localStorage.getItem('user')

  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          <Redirect to={'/Login'} />
        )
      }
    />
  )
}

export default ProtectedRoute