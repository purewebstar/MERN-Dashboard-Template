# MERN Dashboard Template

This Template allows you to quickly and easily develop a web application using MERN stack.

It helps you if you read through this README to get the most our of what this template has to offer. I appreciate any issue reports or recommendations for further development. 

Screenshot
![Sample Images](https://github.com/abriilo/MERN-Dashboard-Template/blob/main/repo-images/p_1.png?raw=true)

## Implementation
**:heavy_check_mark: Below is implementation of FrontEnd**

## Table of Contents
1. [File Structure](#file-structure)
2. [Api](#api)
3. [Assets](#assets)
4. [Components](#components)
5. [Redux](#redux)
6. [Routes](#routes)
7. [Utils](#utils)
8. [Constants](#constants)


## File Structure <a  id="file-structure"></a>
| Folder | Description |
| --- | --- |
| `api` | Fetching datas from server API  |
| `assets` | custom css, sass styling for the app |
| `components` | pages[views], layouts of the app |
| `constants` | configuration and other constants |
| `redux` | redux store management for the app |
| `routes` | routing system, route authenticating |
| `utils` | utilities which ease development |

## Api <a  id="api"></a>
This is where we request to server using axios library.
There is one instance file which configure a request for the rest of api's.

```javascript
// create instance
const instance = axios.create({
    baseURL: config.WS_BASE_URL, // base url 
});

// ithe intercepting
instance.interceptors.request.use(async (config) => {
    config.headers.ContentType = 'application/json';
    /*
     * This is where we add more configurations for the request
     * Different headers e.g Authorization, Range, Cookies, ... etc
    */
    return config;
}); 
// The rest of api requests will use this instance.
```
Sample API object or function
```javascript
// creating account for example
export const createAccount = {
    google: async(data_from_form) =>(
        await instance.post(your_api_end_point_url, {data_from_form})
    )
}
```
## Assets <a  id="assets"></a>
This directory basically contains custom css, javascript ..etc files

## Components <a  id="components"></a>
1. Layouts
Different layouts for page gui
e.g: Appbar, Bottombar, etc
Here you can use any layouts for your app
2. Views
- Views directory contains 2 folders
- 
A. Private - for authorized users [Dashboard, Profile, ...]
B. Public - for unauthorized users [Home, Login, Register, ...]

- When you need to add a page into your app, If it's authorized page added to private directory else, added to public directory

## Redux <a  id="redux"></a>


## Routes <a  id="routes"></a>
This template uses V6 for react-router-dom
### Router V6
The routing system implementation is as below:

The App.js file imports all routes array of objects from Routes-Director
```javascript
import { useRoutes} from "react-router-dom"; // useRoutes to route array of objects
//
const App = ()=>{
  let elements = useRoutes(routes);
  return ({ elements }); // will return routes which contains [path, elements ... etc ]
}
```
In the Routes director we have [PrivateRoute.js && routes.js] files

PrivateRoute.js
```javascript
// this files check if the route is authorized or not..
const PrivateRoute = ({ children }) => {
  let location = useLocation();
  if (!(here_your_auth_provider)) {
    // redirecting to signin page or your default page
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};
```
routes.js 
```javascript
// a route array of objects
// here is where you import your view/page components
// for example: to add a new view page [ one authorized, one unauthorized]
// unauthorized view page = HomeComponent
// authorized view page = DashboardComponent

// import layouts for your authorized and unauthorized pages
// Here -> Layouts should contains <Outlet/>
// PublicLayout -> for Unauthorized pages
// PrivateLayout -> for Authorized pages
```

Public Layout
```javascript
import {Outlet} from 'react-router-dom'; // outlet which will render all it's children elements
const PublicLayout = ()=>{
    return(
        // if you have top navigation or something add here...
        // then render all it's childrens
        <Outlet/>
    )
}
// same will goes to PrivateLayouts ... if you need a different layouts
```

```javascript
// HomeComponent - public view page
// DashboardComponent - private view page
// PrivateLayout - for private view pages
// PublicLayout - for public view pages
const routes = [
    // for unauthorized view page adding...
    {
      path: '/',
      element: <PublicLayout/>,
      children: [
          { index: true, element: <HomeComponent /> },
      ]
    }
    // for authorized view page adding...
    {
      path: '/user',
      element: <PrivateLayout/>,
      children: [
          { index: true, element: <DashboardComponent /> },
      ]
    }
];
// so this is what we use in app.js [let element = useRoutes(routes) ]
```

## Utils <a  id="utils"></a>
Here, we added locastorage and cookie functions.
which will help us in different situations [authentication, data retreive or store]
For example using local storage we have

```javascript
// storing data in locastorage
const setLocalStorage = (key, value) =>{
  window.localStorage.setItem(key, JSON.stringify(value));
}
// 
```

## Constants <a  id="constants"></a>
1. Configuration for base url, host url .. etc
So, you are required to change accordingly

```
const config = {
    WS_BASE_URL: ?, // api base url e.g [http://localhost:4000/user/] -> change according 
    WS_URL: ?, // just base url with slash last e.g [http://localhost:4000/] -> change according 
    WS_BACK_URL: ?, // just base url  e.g [http://localhost:4000] -> change according 
    DOMAIN_NAME: ?, // front end host  e.g [http://localhost:3000] -> change according 
    GOOGLE_CLIENT_ID: ?, // your google client id
}

```
1. Theme scheme .. etc