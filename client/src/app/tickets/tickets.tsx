import { useCallback, useEffect, useMemo, useState } from 'react';
import { Ticket } from '@acme/shared-models';
import { Table, Tabs, message } from 'antd';
import ticketServices from 'client/src/services/ticket';
import Assignee from 'client/src/components/assignee/assignee';
import TicketProgress from 'client/src/components/ticket-progress/ticket-progress';
import type { ColumnsType } from 'antd/es/table';
import Container from 'client/src/components/container/container';
import { StatusType, TicketTabType } from 'client/src/types';
import CreateForm from 'client/src/components/create-form/create-form';
import { Link } from 'react-router-dom';

import styles from './tickets.module.css';

const columns: ColumnsType<Ticket> = [
  {
    title: 'Ticket Id',
    dataIndex: 'id',
    key: 'id',
    width: '15%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '55%',
    render: (value, record) => <>
      <Link className={styles['link']} to={`/${record.id}`}> {value} </Link>
    </>
  },
  {
    title: 'Assignee',
    dataIndex: 'assigneeId',
    key: 'assigneeId',
    render: (assigneeId: number) => <Assignee assigneeId={assigneeId} />,
    width: '15%',
  },
  {
    title: 'Progress',
    dataIndex: 'completed',
    key: 'completed',
    render: (completed: boolean) => <TicketProgress completed={completed} />,
    width: '15%',
  },
]

const ticketTabs: TicketTabType[] = [
  {
    label: 'ALL',
    key: 'all',
  },
  {
    label: 'INCOMPLETE',
    key: 'incomplete',
  },
  {
    label: 'COMPLETED',
    key: 'completed',
  },
]

export function Tickets() {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<StatusType>('all');
  const [isChange, setIsChange] = useState(false)

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    let ignore = false;

    async function fetchTickets() {
      setLoading(true)
      try {
        const resp = await ticketServices.getList();

        if (ignore) return;

        if (!resp.error) {
          setTickets(resp.data!)
        } else {
          message.error(resp.statusText);
        }

      } catch (error) {
        if (ignore) return;

        message.error("Unknown Error");
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();

    return () => {
      ignore = true
    }
  }, [isChange]);

  const onTabChange = (activeKey: string) => {
    setTab(activeKey as StatusType)
  }

  const onCreateSuccess = useCallback(() => {
    setIsChange(prev => !prev)
  }, [])

  const filteredTickets = useMemo(() => {
    if (tab === 'incomplete') {
      return tickets.filter(ticket => !ticket.completed);
    }
    if (tab === 'completed') {
      return tickets.filter(ticket => ticket.completed);
    }
    return tickets;
  }, [tickets, tab])

  return (
    <div className={styles['tickets']}>
      <Container>
        <h2 className={styles['header']}>Tickets</h2>
        <CreateForm onCreateSuccess={onCreateSuccess} />
        <div className={styles['tabs']}>
          <Tabs 
          activeKey={tab}
          items={ticketTabs}
          onChange={onTabChange}
        />
        </div>
        <div className={styles['table']}>
          <Table
            rowKey={'id'}
            dataSource={filteredTickets}
            columns={columns}
            loading={loading}
            pagination={false}
          />
        </div>
      </Container>
    </div>
  );
}

export default Tickets;
