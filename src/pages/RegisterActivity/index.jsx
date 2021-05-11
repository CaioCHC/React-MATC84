import React from 'react';
import { Container } from 'react-bootstrap';
import Card from '../../components/Card';
import Form from '../../components/Form';

export default function index() {
  return (
    <Container className="mt-5">
      <Card title="Registre seu planejamento aqui!">
        <Form />
      </Card>
    </Container>
  );
}
