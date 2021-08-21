import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import React from "react";

const people = [
  { id: 0, name: "Michelle", associations: [1, 2, 3] },
  { id: 1, name: "Sean",  associations: [0, 3] },
  { id: 2, name: "Kim", associations: [0, 1, 3] },
  { id: 3, name: "David", associations: [1, 2] }
];

const find = id => people.find(({ id:elId })=>elId === id);

const RecursiveRouter=_=>
  <Router>
    <Person match={{ params: { id: 0 }, url: "" }} />
  </Router> ;

const Person = ({ match:{ params: { id }, url } }) => {
  const person = find(Number(id));
  const {associations} = person;
  return (
    <div>
      <h3>{person.name}’s associations</h3>
      <ul>
        { associations.map(fId => { 
            /* find in original dataset */
            const friend = find(fId);
            return (
              <li key={fId}>
                <Link to={`${url}/${fId}`}>{friend.name}</Link>
              </li>
            )
          }) }
      </ul>
      <Route path={`${ url }/:id`} component={Person} />
    </div> );
};

export default RecursiveRouter;