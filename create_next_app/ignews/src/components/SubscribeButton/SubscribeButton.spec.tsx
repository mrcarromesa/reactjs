import { fireEvent, render, screen } from "@testing-library/react";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import SubscribeButton from ".";

jest.mock('next-auth/react');

jest.mock('next/router');

beforeEach(() => {
  jest.mocked(useSession).mockReturnValue({} as any);
  jest.clearAllMocks();
})

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    
    render(<SubscribeButton />);
    
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn);

    render(<SubscribeButton />);
    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalledTimes(1);
  });

  it('redirects to post when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter);

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValue({
      push: pushMock,
    } as any);

    jest.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: 'John Doe'
        },
        activeSubscription: true,
      } as any,
      status: 'authenticated'
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  })
});