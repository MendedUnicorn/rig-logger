import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTopBottomColleague,
  selectTopBottomXofY,
} from '../../selectors/tripSelectors';

const Ranked = ({ number, category }) => {
  const data = useSelector(
    category === 'colleagues'
      ? selectTopBottomColleague(number)
      : selectTopBottomXofY(category, number)
  );

  return (
    <div className='ranked-card'>
      <table>
        <thead>
          <tr>
            <th colSpan={3}>
              {number > 0 ? 'Top' : 'Bottom'} {number} {category}
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((el, i) => {
              return (
                <tr>
                  <td>{i + 1}.</td>
                  <td>{el[0]}</td>
                  <td>{el[1]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Ranked;
