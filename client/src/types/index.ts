
export type StatusType = 'all' | 'incomplete' | 'completed';

export type TicketTabType = {
  label: string,
  key: StatusType
}

export type CreateDataType = {
  description: string
}