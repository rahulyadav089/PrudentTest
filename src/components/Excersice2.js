import React from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  InputGroup,
  Spinner,
} from "reactstrap";

const Excersice2 = ({ dictionary }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState();

  const handleCheck = async () => {
    if (value === "") {
      alert("please enter something");
      return;
    } else {
      setIsLoading(true);
      const data = dictionary.find(
        (v) => v.toLowerCase() === value.toLowerCase()
      );
      if (data) {
        setIsLoading(false);
        setResult([data]);
      } else {
        setIsLoading(false);
        setResult([]);
      }
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;

    setValue(value);
  };

  const handleReset = () => {
    setResult();
    setIsLoading(false);
    setValue("");
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Correct Case</CardTitle>
        </CardBody>

        <CardBody>
          <InputGroup>
            <Input
              placeholder="Enter a word"
              onChange={handleChange}
              value={value}
              data-testid="maininput"
            />
            <Button data-testid="submit" onClick={handleCheck} color="success">
              {isLoading ? (
                <div>
                  <Spinner size="sm" />
                  <span className="ml-2">Please wait</span>
                </div>
              ) : (
                <div>check if word exist</div>
              )}
            </Button>
          </InputGroup>
        </CardBody>

        {result && (
          <CardBody>
            {result.length === 0 ? (
              <Alert color="danger" data-testid="fail-alert">
                Sorry, Could't find the word you are looking for
              </Alert>
            ) : (
              <div>
                <Alert color="success" data-testid="success-alert">
                  Congratulations, here is the matching word from the dictionary
                </Alert>
                <Input
                  data-testid="resultinput"
                  type="textarea"
                  value={result.join(" ")}
                  readOnly
                />
              </div>
            )}
          </CardBody>
        )}
        <CardBody>
          <Button data-testid="reset" onClick={handleReset} color="warning">
            Reset
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Excersice2;
