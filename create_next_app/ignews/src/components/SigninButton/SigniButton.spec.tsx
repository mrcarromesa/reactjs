import { render, screen } from "@testing-library/react";
import { useSession } from 'next-auth/react';
import SigninButton from ".";

jest.mock('next-auth/react');

beforeEach(() => {
  jest.clearAllMocks();
})

describe('SigninButton component', () => {
  it('renders correctly when user is not authenticated', () => {

    jest.mocked(useSession).mockReturnValue({} as any);
    
    render(<SigninButton />);
    
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })
  
  it('renders correctly when user is authenticated', () => {
    jest.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: 'John Doe'
        }
      } as any,
      status: 'authenticated'
    });
    render(<SigninButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })
});