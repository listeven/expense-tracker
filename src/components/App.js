import React from 'react';
import Header from "./Header";
import ExpenseTracker from "./ExpenseTracker"
// For FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

// Bootstrap style sheet 
import "bootstrap/dist/css/bootstrap.min.css";

// FontAwesome Icons that will be used throughout the project
library.add(faTimesCircle)

function App() {
  return (
    <div>
      <Header />
      <ExpenseTracker />
    </div>
  );
}

export default App;

