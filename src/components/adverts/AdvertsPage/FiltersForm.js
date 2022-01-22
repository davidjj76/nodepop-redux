import T from 'prop-types';

import SelectTags from '../SelectTags';
import { RadioGroup, SelectRange } from '../../common';
import { advert } from '../propTypes';
import { saleFilter } from './filters';
import { Form, FormConsumer, Input } from '../../form';

function FiltersForm({ initialFilters, defaultFilters, onFilter, prices }) {
  const handleResetClick =
    ({ setFormValue }) =>
    () => {
      setFormValue(defaultFilters);
      onFilter(defaultFilters);
    };

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <Form onSubmit={onFilter} initialValue={initialFilters}>
      <p>Filters</p>
      <Input name="name" />
      <Input
        component={RadioGroup}
        options={Object.values(saleFilter)}
        name="sale"
      />
      <Input
        component={SelectRange}
        min={min}
        max={max}
        name="price"
        style={{ width: 400, margin: 24 }}
        marks={{ [min]: min, [max]: max }}
      />
      <Input component={SelectTags} name="tags" />
      <button type="submit">Filter</button>
      <FormConsumer>
        {form => <button onClick={handleResetClick(form)}>Reset</button>}
      </FormConsumer>
    </Form>
  );
}

const filtersProp = T.shape({
  ...advert,
  sale: T.oneOf(Object.keys(saleFilter)).isRequired,
  price: T.arrayOf(T.number.isRequired).isRequired,
});

FiltersForm.propTypes = {
  initialFilters: filtersProp.isRequired,
  defaultFilters: filtersProp.isRequired,
  onFilter: T.func.isRequired,
  prices: T.arrayOf(T.number.isRequired).isRequired,
};

export default FiltersForm;
