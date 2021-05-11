/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';
import axios from '../../utils/api';
import './Dropdown.css';

export default function Index({
  dayActivitys,
  index,
  date,
  titleName,
  register,
  setRegister,
}) {
  const [variant, setVariant] = useState('');
  const currentVariant = () => {
    if (dayActivitys[index].status === 'Por fazer') {
      setVariant('secondary');
    } else if (dayActivitys[index].status === 'Feito') {
      setVariant('success');
    } else {
      setVariant('danger');
    }
  };
  const statusSelect = async (event) => {
    if (dayActivitys[index].status !== event) {
      dayActivitys[index] = { ...dayActivitys[index], status: event };
      const updatedRegister = register.map((day) => {
        if (day.id === date) {
          return {
            id: day.id,
            activitys: dayActivitys,
          };
        }
        return {
          ...day,
        };
      });
      setRegister(updatedRegister);
      if (event === 'Por fazer') {
        setVariant('secondary');
      } else if (event === 'Feito') {
        setVariant('success');
      } else {
        setVariant('danger');
      }
      try {
        await axios.put(`/register/${date}`, {
          id: date,
          activitys: dayActivitys,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  useEffect(() => {
    currentVariant();
  }, [date]);
  return (
    <Dropdown as={ButtonGroup} onSelect={statusSelect}>
      <Button className="buttonFixSize" variant={variant}>
        {dayActivitys[index][titleName]}
      </Button>
      <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Por fazer">Por fazer</Dropdown.Item>
        <Dropdown.Item eventKey="Feito">Feito</Dropdown.Item>
        <Dropdown.Item eventKey="Fora do Prazo">Fora do Prazo</Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  );
}
