import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({render: Component, auth, ...rest}) => {
    return (
        <Route {...rest}
        render={(props) => {
            if(auth === 'user'){
                return <Component {...props} />
            }
            else{
                return(
                    <Redirect to={
                        {
                            pathname: '/signin',
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                )
            }
        }}/>
    )
}

export default ProtectedRoute;


