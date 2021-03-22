import React from 'react'
import {startLogin} from '../actions/auth'
import {connect} from 'react-redux'

export const LoginPage = ({ startLogin }) => (

    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Overhead</h1>
            <p>Keep track of your expenses!</p>
            <button className="button" onClick = {startLogin}>Login with Google</button>
        </div>
    </div>

);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)