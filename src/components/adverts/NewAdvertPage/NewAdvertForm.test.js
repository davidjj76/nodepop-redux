import { fireEvent, render, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import NewAdvertForm from './NewAdvertForm';

const store = {
  getState: () => ({ tags: ['motor', 'mobile', 'lifestyle', 'work'] }),
  subscribe: () => {},
  dispatch: () => {},
};

const renderNewAdvertForm = props => (
  <Provider store={store}>
    <NewAdvertForm {...props} />;
  </Provider>
);

describe('NewAdvertForm', () => {
  test('snapshot', () => {
    const { container } = render(renderNewAdvertForm({ onSubmit: () => {} }));
    expect(container).toMatchSnapshot();
  });

  test('should call onSubmit with the new advert', async () => {
    const onSubmit = jest.fn();
    const name = 'Coche';
    const price = 1200;
    const tags = ['motor'];
    const photo = new File(['photo'], 'photo.png', {
      type: 'image/png',
    });

    const {
      getByLabelText,
      getByRole,
      getByDisplayValue,
      getByAltText,
      getByTestId,
    } = render(renderNewAdvertForm({ onSubmit }));

    const nameField = getByLabelText(/name/i);
    const priceField = getByLabelText(/price/i);
    const sellField = getByLabelText(/sell/i);
    const motorField = getByDisplayValue(/motor/i);
    const photoField = getByTestId('photo-input');
    const submitButton = getByRole('button');

    expect(submitButton).toBeDisabled();

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(sellField);
    fireEvent.change(priceField, { target: { value: price } });
    fireEvent.click(motorField);
    fireEvent.change(photoField, { target: { files: [photo] } });

    await waitFor(() => getByAltText(photo.name));

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({
      name,
      price,
      tags,
      photo,
      sale: false,
    });
  });
});
