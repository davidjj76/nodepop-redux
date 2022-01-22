import T from 'prop-types';

import { InputFile } from '../../common';
import { Form, FormConsumer, Input } from '../../form';
import SelectTags from '../SelectTags';

const validName = ({ name }) => name;
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0;
const validTags = ({ tags }) => !!tags.length;

function NewAdvertForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      initialValue={{ name: '', sale: true, price: 0, tags: [], photo: null }}
    >
      <label>
        Name
        <Input name="name" />
      </label>
      <label>
        Sell
        <Input type="checkbox" name="sale" />
      </label>
      <label>
        Price
        <Input type="number" name="price" />
      </label>
      <label>
        Tags
        <Input component={SelectTags} name="tags" />
      </label>
      <Input component={InputFile} name="photo" data-testid="photo-input" />
      <FormConsumer>
        {({ validate }) => (
          <button disabled={!validate(validName, validPrice, validTags)}>
            Save
          </button>
        )}
      </FormConsumer>
    </Form>
  );
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;
