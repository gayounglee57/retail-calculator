import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../src/app/page'

describe('Home page', () => {
  it("renders the calculate button", () => {
    render(<Home />);
    expect(screen.getByTestId("calculateButton")).toBeInTheDocument();
  });

  it("calculates total price when user enters number of items and price per item", async () => {
    render(<Home />);

    const itemsInput = screen.getByLabelText(/number of items/i);
    const priceInput = screen.getByLabelText(/price per item/i);
    const submitButton = screen.getByTestId("calculateButton");

    // Simulate user typing
    await userEvent.clear(itemsInput);
    await userEvent.type(itemsInput, "3");

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "19.99");

    // Click submit
    await userEvent.click(submitButton);

    // Expect total price to be correct
    const total = screen.getByText(/total price/i);
    expect(total).toHaveTextContent("Total Price: $59.97");
  });
})