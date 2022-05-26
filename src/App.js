import React from "react";
import { Col, ListGroup, ListGroupItem, Row, Spinner } from "reactstrap";
import "./App.css";
import Excersice1 from "./components/Excersice1";
import Excersice2 from "./components/Excersice2";

import Header from "./components/Header";
import initialData from "./data/dictionary.txt";
function App() {
  const [dictionary, setDictionary] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentRoute, setCurrentRoute] = React.useState(0);

  const excersices = [
    {
      title: "Exercise 1",
      component: () => <Excersice1 dictionary={dictionary} />,
    },
    {
      title: "Exercise 2",
      component: () => <Excersice2 dictionary={dictionary} />,
    },
  ];

  const CurrentRoute = excersices[currentRoute].component;

  React.useEffect(() => {
    fetch(initialData)
      .then((res) => res.text())
      .then((res) => {
        const splitted = res.split("/\r?\n/");
        let newSplitted = splitted[0].split("\n");
        console.log("newSplitted", newSplitted);
        setDictionary(newSplitted);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Row className="h-100 w-100 bg-success">
        <Col className="bg-light border p-0" lg="2">
          <ListGroup className="pl-5">
            {excersices.map((ex, exi) => {
              return (
                <ListGroupItem
                  action
                  active={exi === currentRoute}
                  onClick={() => setCurrentRoute(exi)}
                  className="cursor-pointer"
                >
                  {ex.title}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
        <Col className="bg-light border" lg="10">
          <div className="p-5">
            {isLoading ? <Spinner /> : <CurrentRoute />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
