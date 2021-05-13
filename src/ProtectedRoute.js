import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { UserContext } from "./App"

const ProtectedRoute = ({ children,  ...rest }) => {

  const token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={() =>
        token ? (
          children
        ) : (
          <Redirect to={'/Login'} />
        )
      }
    />
  )
}

export default ProtectedRoute