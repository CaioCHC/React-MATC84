/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Table } from 'react-bootstrap';
import './ActivityTable.css';

export default function Index({ titles = [], dayActivitys }) {
  return (
    <div>
      <Table striped bordered hover size="sm" variant="success" responsive>
        <thead>
          <tr>
            <th>#</th>
            {titles.map((title) => (
              <th key={title.value} width={title.width}>
                {title.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <>
            {dayActivitys.map((activity, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {titles.map((title) => (
                  <td key={title.name} className={title.aligne}>
                    {title.render
                      ? title.render(index, title.name)
                      : activity[title.name]}
                  </td>
                ))}
              </tr>
            ))}
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <tr key={index}>
                  <td>{dayActivitys.length + index + 1}</td>
                  {Array.from({ length: titles.length }).map((_2, index2) => (
                    <td key={index2} className="midle">
                      ---
                    </td>
                  ))}
                </tr>
              ),
            )}
          </>
        </tbody>
      </Table>
    </div>
  );
}
