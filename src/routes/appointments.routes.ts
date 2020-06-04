import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentIsSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentIsSameDate) {
    return response.status(400).json({
      message: 'There is already a scheduled appointment on this date',
    });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
