import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import BlogItem from './BlogItem';

const blogs = [
  {
    title: 'Haloo Lyngen',
    author: 'willy',
    url: 'www.eeert.fi',
    user: '1234',
  },
  {
    title: 'Asota Valley',
    author: 'fanni',
    url: 'www.hey.fi',
    user: '99999',
  },
];

const user = {
  _id: '21131',
  username: 'kari',
};

const blog = {
  title: 'Haloo Lyngen',
  author: 'willy',
  url: 'www.ert.fi',
  user: '1234',
  likes: 123,
};

describe('Tehtävä 5.13', () => {
  let component;
  beforeEach(() => {
    component = render(<BlogItem blogs={blogs} user={user} blog={blog} />);
  });

  test('Component renders author', () => {
    const element = component.container.querySelector('#author');

    expect(element.textContent).toBe('Author: willy');
  });

  test('Component renders title', () => {
    const element = component.container.querySelector('.ui.header');
    expect(element.textContent).toBe('Haloo Lyngen');
  });

  test('Component not render url and likes', () => {
    const div = component.container.querySelector('.meta');
    expect(div).toHaveStyle('display: none');
  });
});

describe('Tehtävä 5.14', () => {
  test('Component render url and likes after button click', () => {
    const component = render(
      <BlogItem index="0" blogs={blogs} user={user} blog={blog} />
    );

    const button = component.container.querySelector('#btnShow0');
    fireEvent.click(button);

    const div = component.container.querySelector('.meta');

    expect(div).not.toHaveStyle('display: none');
  });
});

describe('Tehtävä 5.15', () => {
  test('like button clicked twice -> callBack called twice', async () => {
    const onClick = jest.fn();

    const component = render(
      <i
        id="btnLike0"
        onClick={onClick}
        className="thumbs up icon large"
        style={{ cursor: 'pointer' }}
      ></i>
    );
    const btnLikes = component.container.querySelector('#btnLike0');

    fireEvent.click(btnLikes);
    fireEvent.click(btnLikes);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
