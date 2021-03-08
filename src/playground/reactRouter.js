import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from'react-router-dom';
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS


const ExpenseDashboardPage = () => ( <div>This is from dashboard comp </div> );


const routes = (

    <BrowserRouter>
        <Route path="/" component={ExpenseDashboardPage}/>
    
    </BrowserRouter>

);



ReactDOM.render(routes, document.getElementById('app'))

/* 

Only use browserRouter once but with every route/page needs an instance of
 <Route path="/" component = {ComponentToRender}/>

This tells ReactRouter that whenever it matches that path ("/" above) then it should render that component ({ComponentToRender} above)


BUT the API for BrowserRouter expects its child to either not exist or to have length of one so 2+ routes would break it so need to NEST IT IN A DIV!



PATH is NOT nessesary - when not specified the component will show on EVERY page
*/


const AddExpensePage = () => ( <div>This is from create expense comp </div> );


const routes = (

    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage}/>
            <Route path="/create" component={AddExpensePage}/>

    
        </div>
    
    </BrowserRouter>

);

/*

BUT above will still not work because localhost:8080/create does NOT exist b/c the browser is still trying to use server side routing. We need to use CLIENT-SIDE routing so it still serves up index.html and lets react-router determine what gets rendered so we need to tweak webpack.config to tell web-server to always serve up index.html file for all unknown 404s - 

Need to provide one more attribute onto DEV-SERVER object called: 
    historyApiFallback: true
    
This tells dev-server that we are handling all routing via client-side code and it should return index.html for all 404 routes

   devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },


Flow of it:

1) Try to access localhost:8080/create which will be a 404 
2) dev-server will see the 404 and since historyApiFallback = true it will serve index.html
3) index.html will load the bundle which loads for every single page 
4) This will actually run our router code - determine the router URL is /create
5) Render the AddExpensePage component



This will render BOTH "/" AND "/create" b/c when react router matches our path just cares if it at least starts with whatever we have SO 

For URL localhost:8080/create : "/" and "/create" component will render 
For URL localhost:8080/create/other : "/" and "/create" component will render 



WE OVERCOME this by adding another prop on <Route />: EXACT 

When EXACT is set to true/false it changes how matching works, only needed on root page once as prop

<Render exact={true} path="/" component={ExpenseDashboardPage}


*/




/*

404 PAGE FOR URLS NOT SET UP - USING SWITCH

need to import {switch} from 'react-router-dom'

change the div inside of BrowerRouter to Switch and add 404 page on the bottom of the Render stack with NO path - components with no path specified will ALWAYS show up and Switch goes through add <Render/> call top to bottom checking if the URL exactly matches - it is doesnt since a <Route/> with no path will always show up it will show the 404 page or a page that will link them back to the dashboard page

*/

import { BrowserRouter, Route, Switch } from'react-router-dom';
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS


const NotFoundPage = () => ( <div>404!!!! </div> );

const routes = (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
    
    


/*

---- LINK -----

LINKING BETWEEN PAGES using CLIENT-SIDE routing so will NOT see full-page refresh which is communicating with the server

By adding an anchor tag so the 404 page to Go back home 

const NotFoundPage = () => ( <div>404!!!! - <a href="/">Go home</a> </div> );

But when click it still full refresh page so need to 

1) Add event listener for links
2) Override the browsers default behavior (dont change page pretend it wasnt clicked)
3) Use JS to actually rerender page

By using LINK - import { link } and set up an instance of link with some text and properties INSTEAD of an anchor tag

<Link to="/">Go home</Link>

Link expects text and properties - the TO property is much like href="..."


IF linking to an outside resource can just use an anchor tag b/c you will not get the advantage of using the client-side routing but when linking internally ALWAYS use link 

*/



const NotFoundPage = () => ( <div>404!!!!  <Link to="/">Go home</Link></div> );


/* 

Rendering Header on EVERY page

Put an instance of the Header before the Switch call

*/
const Header = () => ( 
    <header>    
        <h1>Expensify</h1>
        <Link to="/">Dashboard </Link>
        <Link to="/help"> Help</Link>
    </header>
 );


const routes = (
    <BrowserRouter>
    <div>
        <Header />
            <Switch>
                <Route exact={true} path="/" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
    </div>
    </BrowserRouter>
);



/* 

-----NAV LINK ----

Better suited for situations like navigation where there are multiple links side-by-side AND we wan to call-out that specific link when we are on that page - like adding a custom style to a link of a page that we are on like making it RED or UNDERLINED 

<NavLink/> - basically identical to <Link/> with just an extra few props

props = 

activeClassName="" - lets you add a class to something to the link when we are on that page

        <NavLink activeClassName="is-active" to="/">Dashboard </NavLink>

BUT the Link uses the exact same matching as the ROUTE does so NEED exact={true}

        <NavLink activeClassName="is-active" to="/" exact={true}>Dashboard </NavLink>

*/




/*

Breaking React Router into its own location as well as each component




*/




/*

React router renders components that match the path value but also passes a few different props down


1) HISTORY - An object that contains a lot of properties that are methods that allow manipulation of history like redirect user systematically like when someone enters a valid expense form it will redirect user to somewhere else 

2) MATCH - contains why current route is a match, and has params which is an obejct and is useful when set up more dynamic URLs

3) LOCATION - contains info about current URL with pathName, hash, and search 
    - Search: start with ?  is populated when query string is used and can so something with that value like filter data that is shown to screen
    - Hash: start with # this scrolls user down to element on page with the id of #contact-us which is useful for long pages 

*/


/*

------------------------- DYNAMIC URLS WITH REACT ROUTER --------------

If want to edit the 44th entry in the expense app the url would be /edit/44 so need to use the syntax

<Route path="/edit/:id" component={EditExpensePage}/>

Where the :id is a variable name and will dynamically match anyhting that comes after the /

Can dynamically change what is shown up to the page by 

ONLY things used inside an instance of <Route /> will have access to the props so <Header /> will not b/c we created header 



*/