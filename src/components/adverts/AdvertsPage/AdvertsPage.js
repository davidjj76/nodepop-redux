import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { defaultFilters, filterAdverts } from './filters';
import { loadAdverts } from '../../../store/actions';
import { getAdverts } from '../../../store/selectors';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const [filters, setFilters] = React.useState(getFilters);

  React.useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
