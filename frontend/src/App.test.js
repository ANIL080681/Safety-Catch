import { render, screen } from '@testing-library/react';
import App from './App';

// Mock scrollIntoView for testing environment
beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

test('renders EAP CATCH Submission Bot', () => {
  render(<App />);
  const titleElement = screen.getByText(/EAP CATCH Submission Bot/i);
  expect(titleElement).toBeInTheDocument();
});
