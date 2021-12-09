import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import CreateBlogForm from './CreateBlogForm';

describe('Tehtävä 5.16', () => {
  test('Blog created with right fields', () => {
    const onSubmit = jest.fn();
    const setTitle = jest.fn();
    const setAuthor = jest.fn();
    const setUrl = jest.fn();

    const component = render(
      <CreateBlogForm
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        onFormSubmit={onSubmit}
      />
    );

    const form = component.container.querySelector('#form');
    const inputTitle = component.container.querySelector('#title');
    const inputAuthor = component.container.querySelector('#author');
    const inputUrl = component.container.querySelector('#url');

    fireEvent.change(inputTitle, {
      target: { value: 'Haloo Lyngen' },
    });
    fireEvent.change(inputAuthor, {
      target: { value: 'willydownhouse' },
    });
    fireEvent.change(inputUrl, {
      target: { value: 'www.haloo.fi' },
    });

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(setTitle.mock.calls[0][0]).toBe('Haloo Lyngen');
    expect(setAuthor.mock.calls[0][0]).toBe('willydownhouse');
    expect(setUrl.mock.calls[0][0]).toBe('www.haloo.fi');
  });
});
