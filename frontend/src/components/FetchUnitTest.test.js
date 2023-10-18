import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";

//Unit test mocking the fetch function. Successfull see screenshot folder. Navigate to cd frontend and npm test.

test("fetch data successfully", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      results: [
        {
          trackName: "Sample Track",
          artistName: "Sample Artist",
        },
      ],
    }),
  });

  render(<App />);

  const input = screen.getByRole("textbox");
  const submitButton = screen.getByText("Search");

  fireEvent.change(input, { target: { value: "Sample Search" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Sample Track")).toBeInTheDocument();
  });
});
