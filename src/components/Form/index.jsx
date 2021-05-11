/* eslint-disable consistent-return */
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import {
  Form, Col, Button,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import axios from '../../utils/api';
import { PagesContext } from '../../pagesContextProvider';

export default function TodoForm() {
  const [register, setRegister] = useContext(PagesContext);
  const [activity, setActivity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = `${startDate.getDate()}-${
      startDate.getMonth() + 1
    }-${startDate.getFullYear()}`;

    if (!activity.trim()) {
      return toast.alert('Por favor informa a atividade.');
    }
    let existingDate = false;
    let dayReference = {};
    // Verifica se já existe registro da data selecionada; caso sim armazena atualização da lista.
    const updatedRegister = register.map((day) => {
      if (day.id === date) {
        existingDate = true;
        dayReference = {
          id: day.id,
          activitys: [...day.activitys, {
            activity,
            status: 'Por fazer',
            report: '',
          }],
        };
        return {
          id: day.id,
          activitys: [...day.activitys, {
            activity,
            status: 'Por fazer',
            report: '',
          }],
        };
      }
      return {
        ...day,
      };
    });
    // Se não existe registro nessa data, cria novo registro e solicita limpeza do formulário.
    if (existingDate === false) {
      try {
        const response = await axios.post('/register', {
          id: date,
          activitys: [{
            activity,
            status: 'Por fazer',
            report: '',
          }],

        });
        setRegister([...register, response.data]);
        setActivity('');
        setStartDate(new Date());
        toast.info('Atividade adicionada!');
      } catch (error) {
        console.error(error.message);
      }
    } else {
      // Se existe registro, atualiza a lista e solicita limpeza do formulário.
      try {
        await axios.put(`/register/${date}`, dayReference);
        setRegister(updatedRegister);
        setActivity('');
        setStartDate(new Date());
        toast.info('Atividade adicionada!');
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const onChange = ({ target: { value } }) => {
    setActivity(value);
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Col lg={9} xl={9}>
        <Form.Group>
          <DatePicker
            className="data"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
          />
          <Form.Control
            type="text"
            className="mt-4"
            value={activity}
            onChange={onChange}
            placeholder="Informa a atividade"
          />
        </Form.Group>
        <Button className="mt-4" variant="success" disabled={!activity.trim()} type="submit">Add Atividade</Button>
      </Col>
    </Form>
  );
}
