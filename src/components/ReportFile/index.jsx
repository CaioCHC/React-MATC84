/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Button, Modal, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../utils/api';

export default function Index({
  dayActivitys,
  index,
  date,
  register,
  setRegister,
}) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(dayActivitys[index].report);
  const handleClose = () => {
    setText(dayActivitys[index].report);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const onChangeText = (event) => setText(event.target.value);
  const saveText = async () => {
    dayActivitys[index] = { ...dayActivitys[index], report: text };
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
    try {
      setRegister(updatedRegister);
      await axios.put(`/register/${date}`, { id: date, activitys: dayActivitys });
      setShow(false);
      toast.info('Dados alterados com sucesso.');
    } catch (error) { console.error(error.message); }
  };
  useEffect(() => {
    setText(dayActivitys[index].report);
  }, [date]);
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FaFileAlt />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Relatório</Modal.Title>
        </Modal.Header>
        <FormControl as="textarea" value={text} onChange={onChangeText} />
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={saveText}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
