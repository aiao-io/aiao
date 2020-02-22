import './app.scss';

import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';

import CodeEditor from './code-editor/code-editor';

export const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/code-editor">code-editor</Link>
          </li>
        </ul>
      </nav>
      <Route path="/">
        <Redirect to="/code-editor" />
      </Route>
      <Route path="/code-editor" exact component={CodeEditor} />
    </>
  );
};

export default App;
