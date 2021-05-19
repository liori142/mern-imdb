import React,{useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopRated from './pages/TopRated'
import Marvel from './pages/Marvel'
import Upcoming from './pages/Upcoming'
import Popular from './pages/Popular'
import Search from './pages/Search'
import SmartTable from './pages/SmartTable'
import SaveMovie from './pages/SaveMovie'
import './RouterPages.css'
export default function RouterPages() {
  const [searchValue,setSearchValue] = useState('')
  return (
    <Router>
      <div>
        <nav>
          <ul className="list-class">
            <li>
              <Link to="/marvel">Marvel</Link>
            </li>
            <li>
              <Link to="/">Upcoming</Link>
            </li>
            <li>
              <Link to="/popular">Popular</Link>
            </li>
            <li>
              <Link to="/top_rated">Top Rated</Link>
            </li>
            <li>
              <Link to="/smart_table">Smart Table</Link>
            </li>
            <li>
              <Link to="/save_movie">Save Movie</Link>
            </li>
            <li>
              <input id="searchInput" onChange={(e) =>setSearchValue(e.target.value)}  type="text" style={{marginRight:'10px'}}/>
              <Link to={`/search/${searchValue}`} style={{padding:'3px'}}>Search</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/save_movie">
            <SaveMovie />
          </Route>
          <Route path="/smart_table">
            <SmartTable />
          </Route>
          <Route path="/marvel">
            <Marvel category="marvel" />
          </Route>
          <Route path="/popular">
            <Popular category="popular" />
          </Route>
          <Route path="/top_rated">
            <TopRated category="top_rated" />
          </Route>
          <Route path={`/search/${searchValue}`}>
            <Search category="search" searchValue = {searchValue} />
          </Route>
          <Route path="/">
            <Upcoming category="upcoming" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
