import { fireEvent, render } from "@testing-library/react";
import Excersice1 from "../Excersice1";
import testdictionary from "./testdictionary";

describe("excersice 1 component", () => {
  test("should autocorrect and give correct result", () => {
    const { container, getByTestId } = render(
      <Excersice1 dictionary={testdictionary} />
    );
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "cannot" } });
    expect(input.value).toBe("cannot");

    const submitBtn = getByTestId("submit");
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);

    const resultInput = getByTestId("resultinput");

    expect(resultInput.value).toBe("cannot");
  });

  test("should autocorrect and  fail", () => {
    const { container, getByTestId } = render(
      <Excersice1 dictionary={testdictionary} />
    );
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "maybea" } });
    expect(input.value).toBe("maybea");

    const submitBtn = getByTestId("submit");
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);

    expect(getByTestId("fail-alert")).toBeInTheDocument();
  });

  test("should reset the input", () => {
    const { getByTestId } = render(<Excersice1 dictionary={testdictionary} />);
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "maybea" } });
    expect(input.value).toBe("maybea");

    const resetBtn = getByTestId("reset");

    fireEvent.click(resetBtn);

    expect(input.value).toBe("");
  });
});
