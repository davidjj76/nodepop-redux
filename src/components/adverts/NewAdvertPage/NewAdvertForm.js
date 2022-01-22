import T from 'prop-types';

import useForm from '../../form/useForm';
import { InputFile } from '../../common';
import SelectTags from '../SelectTags';

const validName = ({ name }) => name;
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0;
const validTags = ({ tags }) => !!tags.length;

function NewAdvertForm({ onSubmit }) {
  const {
    formValue: advert,
    handleChange,
    handleSubmit,
    validate,
  } = useForm({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const { name, sale, price, tags } = advert;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input name="name" value={name} onChange={handleChange} />
      </label>
      <label>
        Sell
        <input
          type="checkbox"
          name="sale"
          checked={sale}
          onChange={handleChange}
        />
      </label>
      <label>
        Price
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </label>
      <label>
        Tags
        <SelectTags name="tags" value={tags} onChange={handleChange} />
      </label>
      <InputFile
        name="photo"
        onChange={handleChange}
        data-testid="photo-input"
      />
      <button disabled={!validate(validName, validPrice, validTags)}>
        Save
      </button>
    </form>
  );
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;
