import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe('Tehtävä 5.16', () => {
  test('Blog created with right fields', () => {
    const onSubmit = jest.fn();

    const component = render(
      <form id="form" onSubmit={onSubmit} className="ui form">
        <div className="field">
          <label>Title</label>
          <input value="ciao" id="title" onChange={() => 1} />
        </div>
        <div className="field">
          <label>Author</label>
          <input value="willy" id="author" onChange={() => 1} />
        </div>
        <div className="field">
          <label>Url</label>
          <input value="" id="url" onChange={() => 1} />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    );

    const form = component.container.querySelector('#form');
    const inputTitle = component.container
      .querySelector('#title')
      .getAttribute('value');
    const inputAuthor = component.container
      .querySelector('#author')
      .getAttribute('value');
    const inputUrl = component.container
      .querySelector('#url')
      .getAttribute('value');

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(inputTitle).not.toBeFalsy();
    expect(inputAuthor).not.toBeFalsy();
    expect(inputUrl).toBeFalsy();
  });
});
