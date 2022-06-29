import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/feedback" component={ Feedback } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
