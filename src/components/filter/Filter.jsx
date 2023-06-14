import { useDispatch } from "react-redux";

import clsx from 'clsx';

import css from './Filter.module.css';

import { changeFilter } from '../../redux/filterSlice';

const Filter = () => {

    const despatch = useDispatch();
    const filterValue = event => {
        despatch(changeFilter(event.currentTarget.value));

    };

    return (
        <label>Find contacts by name
            <input className={clsx(css['filter-input'])}
              type="text"
              onChange={filterValue}
            />
        </label>
    );
};

export default Filter;