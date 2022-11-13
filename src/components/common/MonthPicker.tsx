import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect } from 'react';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import locale from 'dayjs/locale/de';
import useStore from '../../hooks/useStore';

interface MonthPickerProps {
  onChange: (dates: Dayjs[]) => void;
}
const MonthPicker = ({ onChange }: MonthPickerProps) => {
  const { firstTimeDate } = useStore();
  const startOfMonth = dayjs
    .default()
    .locale({ ...locale })
    .startOf('month');
  const endOfMonth = dayjs
    .default()
    .locale({ ...locale })
    .endOf('month');
  const [firstTime, setFirstTime] = React.useState<Dayjs>(startOfMonth);
  const [pickedMonth, setPickedMonth] = React.useState<Dayjs | null>();
  const [days, setDays] = React.useState<Dayjs[]>([]);

  /* 
  We need to know when the first day of time in DB was, to show a only months with data.
  */
  useEffect(() => {
    firstTimeDate()
      .then((d) => {
        setFirstTime(d);
      })
      .finally(() => {
        calcDays(startOfMonth, endOfMonth);
      });
  }, []);

  /*
   Based on user interactions, the state is updated, representing the month a user has selected.
   It is always rounded to the full day.
  */
  useEffect(() => {
    if (pickedMonth) {
      calcDays(pickedMonth.startOf('month'), pickedMonth.endOf('month'));
    }
  }, [pickedMonth]);

  const calcDays = (from: Dayjs, to: Dayjs) => {
    const d = Math.ceil(to.diff(from, 'day', true));
    setDays([]);
    for (let i = 0; i < d; i++) {
      const nextDay = from.add(i, 'day');
      setDays((prevState) => [...prevState, nextDay]);
    }
  };

  /*
  If the Date Range list changes, the changes are passed to the parent component.
  */
  useEffect(() => {
    onChange(days);
  }, [days]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Monat"
            minDate={firstTime}
            maxDate={endOfMonth}
            value={pickedMonth}
            onChange={(value) => {
              setPickedMonth(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default MonthPicker;
