import React from 'react';
import Header from "./Header";
import ExpenseTracker from "./ExpenseTracker";
// For FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

// Bootstrap style sheet 
import "bootstrap/dist/css/bootstrap.min.css";

// FontAwesome Icons that will be used throughout the project
library.add(faTimesCircle, faTrashAlt, faPen, faCheck);

function App() {
  return (
    <div>
      <Header />
      <ExpenseTracker />
    </div>
  );
};

export default App;

