import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from '../../services/prismic';
import { getSession } from 'next-auth/react';

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>Post excerpt</p>', updateAt: '10 de Abril'};

jest.mock('../../services/prismic');
jest.mock('next-auth/react');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Post Page', () => {
  it('render correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {

    jest.mocked(getSession).mockResolvedValue(null);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    );
  });

  it('loads initial data', async () => {
    jest.mocked(getSession).mockResolvedValue({
      activeSubscription: 'fake-active-subscription',
    } as any);

    jest.mocked(getPrismicClient).mockReturnValue({
      getByUID: jest.fn().mockResolvedValue({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    );

  });

});