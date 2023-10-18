import { render } from "@testing-library/react";
import App from "./App";

//Screenshot test. Sucessfull see screensho folder. Navigate to cd front and npm test.

test("renders iTunes Fetch Main Page", () => {
  //Utiising the asFragmant property in th render Object which takes a snapshot of HTML structure of the component selected. 
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});