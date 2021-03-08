import React from 'react';
import ReactDOM from 'react-dom';

//requireAuthentication fgunctino to gen hoc - call func aargument is wrappedcomp and returned authInfo to show comp if authenticated user or show a message when theyre not 



const Info1 = (props) => (
    <div>
        <h1>Info1</h1>
        <p>The private info is: {props.privateInfo}</p>
        <p>The public info is: {props.publicInfo}</p>
    </div>
);


const withAdminWarning = (WrappedComponent) =>{
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information, please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const AdminInfo = withAdminWarning(Info1)

ReactDOM.render(<AdminInfo isAdmin = {true} privateInfo = 'This is the private information' publicInfo = 'Public Info'/>, document.getElementById('app'));



// -------------------------------------------------------------------

const Info = (props) => (
    <div>
        <p>Please login to show information</p>
        <p>{props.firstComponent}</p>
    </div>
);

const requireAuthentification = (WrappedComponent) =>{
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>You are not authenticated</p>}
            
        </div>
    );
};

const AuthInfo = requireAuthentification(Info)

ReactDOM.render(<AuthInfo isAuthenticated = {true} firstComponent = 'From the first component props'/>, document.getElementById('app'));