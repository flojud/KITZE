import React, { useContext, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import DateRangePicker from '../../components/DateRangePicker';
import MainContainer from '../../components/MainContainer';
import ViewDate from '../../components/ViewDate';

const View = () => {
  const [days, setDays] = useState<Dayjs[]>([]);

  const handleDateRangePicker = (dateRange: Dayjs[]) => {
    setDays(dateRange);
  };

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          <DateRangePicker onChange={handleDateRangePicker} />
          {days && days.map((day) => <ViewDate key={day.toISOString()} day={day} />)}
        </Stack>
      </MainContainer>
    </>
  );
};

export default View;