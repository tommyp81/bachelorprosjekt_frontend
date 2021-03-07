import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { UserContext } from "./UserContext"

const ProtectedRoute = ({ component: Component,  ...rest }) => {

  const {user} = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        user.loggedIn ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={'/Login'} />
        )
      }
    />
  )
}

export default ProtectedRoute