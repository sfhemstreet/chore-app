import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../utils/auth';


const ProtectedRoute = ({render: Component, auth, ...rest}) => {
    return (
        <Route {...rest}
        render={(props) => {
            console.log(auth)
            if(auth === 'user'){
                console.log('success!!!')
                return <Component {...props} />
            }
            else{
                console.log("failed protected")
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


