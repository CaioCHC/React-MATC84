import React, { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import ReportFile from '../../components/ReportFile';
import ActivityTable from '../../components/Table/ActivityTable';
import DropdownComp from '../../components/DropdownComp';
import { PagesContext } from '../../pagesContextProvider';

export default function Index() {
  const [startDate, setStartDate] = useState(new Date());
  const selectDate = `${startDate.getDate()}-${
    startDate.getMonth() + 1
  }-${startDate.getFullYear()}`;
  const [register, setRegister] = useContext(PagesContext);
  let dayActivitys = [];
  // pega a lista de pacientes do dia especifico e cancela a busca
  for (let i = 0; i < register.length; i += 1) {
    if (register[i].id === selectDate) {
      dayActivitys = [...register[i].activitys];
      break;
    }
  }

  const titles = [
    {
      name: 'activity',
      value: 'Atividade',
      width: '65%',
      aligne: 'left',
    },
    {
      name: 'status',
      value: 'Status',
      width: '20%',
      render: (index, titleName) => (
        <DropdownComp
          dayActivitys={dayActivitys}
          index={index}
          date={selectDate}
          titleName={titleName}
          register={register}
          setRegister={setRegister}
        />
      ),
      aligne: 'midle',
    },
    {
      name: 'report',
      value: 'Relatório',
      width: '10%',
      render: (index) => (
        <ReportFile
          dayActivitys={dayActivitys}
          index={index}
          date={selectDate}
          register={register}
          setRegister={setRegister}
        />
      ),
      aligne: 'midle',
    },
  ];

  return (
    <Container className="mt-5">
      <DatePicker
        className="data"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        locale={ptBR}
      />
      <ActivityTable
        titles={titles}
        date={selectDate}
        dayActivitys={dayActivitys}
      />
    </Container>
  );
}
