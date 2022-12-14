/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import TimeUtils from '../../utils/TimeUtils';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { ITime } from '../../interfaces/Types';
import locale from 'dayjs/locale/de';

interface TimeInputCardProps {
  data: ITime;
  onChange: (time: ITime) => void;
}
const TimeInputCard = ({ data, onChange }: TimeInputCardProps) => {
  const [workingTime, setWorkingTime] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [availableTimeNote, setAvailableTimeNote] = useState<string>('');
  const title = dayjs(data.day)
    .locale({
      ...locale,
    })
    .format('dddd, DD.MMMM');

  /*
  Based on the user's working days, which he has set in the profile and the
  federal state and the associated public holidays, we decide whether it is a working day.
  Since it is theoretically possible to work on non-working days, we only display an information symbol in the input mask.
  */
  useEffect(() => {
    setWorkingTime(TimeUtils.minutesToTime(data.workingTime));
    setAvailableTime(TimeUtils.minutesToTime(data.availableTime));
    setAvailableTimeNote(data.notes);
  }, []);

  /*
  We react to all user entries in the input fields and compile an updated time object at any point in time.
  */
  useEffect(() => {
    const time: ITime = data as ITime;
    time.day = data.day;
    time.workingTime = TimeUtils.minutesFromTime(workingTime);
    time.availableTime = TimeUtils.minutesFromTime(availableTime);
    time.notes = availableTimeNote;
    onChange(time);
  }, [workingTime, availableTime, availableTimeNote]);

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems={'center'}>
              <Typography variant="subtitle1">{title}</Typography>
              {!data.workday && (
                <>
                  <BeachAccessIcon color="secondary" />
                  <Typography variant="caption" color="text.secondary">
                    Kein Arbeitstag
                  </Typography>
                </>
              )}
            </Stack>

            <Stack spacing={2} direction="row">
              <TextField
                type="time"
                label="Arbeitszeit"
                value={workingTime}
                onChange={(e) => setWorkingTime(e.target.value)}
                sx={{ width: '100%' }}
                //helperText={`Wieviel Stunden hast du am ${day.format('dddd')} am Kind gearbeitet?`}
              />
              <TextField
                type="time"
                label="Verf??gungszeit"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                sx={{ width: '100%' }}
                //helperText={`Wieviel Verf??gungszeit hast du am ${day.format('dddd')} genutzt?`}
              />
            </Stack>
            <Stack spacing={2} direction="row">
              <TextField
                type="text"
                label="Notiz zur Verf??gungszeit"
                value={availableTimeNote}
                onChange={(e) => setAvailableTimeNote(e.target.value)}
                sx={{ width: '100%' }}
                //helperText="Optional: Schreibe eine kleine Notiz zu Art der T??tigkeit"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeInputCard;
