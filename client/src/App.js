import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail'

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component = {LandingPage}/>
    <Route path='/home/:id' component={Detail}/>
    <Route path='/home' component = {Home}/>
    <Route path='/createrecipe' component={RecipeCreate}/>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
