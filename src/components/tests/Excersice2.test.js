import { fireEvent, render } from "@testing-library/react";
import Excersice2 from "../Excersice2";
import testdictionary from "./testdictionary";

describe("excersice 1 component", () => {
  test("should autocorrect and give correct result", () => {
    const { getByTestId } = render(<Excersice2 dictionary={testdictionary} />);
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "CANNOT" } });
    expect(input.value).toBe("CANNOT");

    const submitBtn = getByTestId("submit");
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);

    const resultInput = getByTestId("resultinput");

    expect(resultInput.value).toBe("cannot");
  });

  test("should autocorrect and  fail", () => {
    const { getByTestId } = render(<Excersice2 dictionary={testdictionary} />);
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Maybea" } });
    expect(input.value).toBe("Maybea");

    const submitBtn = getByTestId("submit");
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);

    expect(getByTestId("fail-alert")).toBeInTheDocument();
  });

  test("should reset the input", () => {
    const { getByTestId } = render(<Excersice2 dictionary={testdictionary} />);
    const input = getByTestId("maininput");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "maybea" } });
    expect(input.value).toBe("maybea");

    const resetBtn = getByTestId("reset");

    fireEvent.click(resetBtn);

    expect(input.value).toBe("");
  });
});
