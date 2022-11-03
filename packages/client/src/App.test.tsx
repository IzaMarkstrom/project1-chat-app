import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Header from "./components/Header";

test("should render same text as send in title prop", () => {
  render(<Header title="Chatt app" />);
  const headingElement = screen.getByText(/chatt app/i);
  expect(headingElement).toBeInTheDocument();
});
