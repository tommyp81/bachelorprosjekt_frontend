import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { UserContext } from "./UserContext"

const ProtectedRoute = ({ children,  ...rest }) => {

  const {user} = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={() =>
        user.loggedIn ? (
          children
        ) : (
          <Redirect to={'/Login'} />
        )
      }
    />
  )
}

export default ProtectedRoute