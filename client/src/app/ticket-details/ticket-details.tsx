import { useEffect, useMemo, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import Container from 'client/src/components/container/container';

import styles from './ticket-details.module.css';
import ticketServices from 'client/src/services/ticket';
import { Select, Spin, Switch, message } from 'antd';
import TicketProgress from 'client/src/components/ticket-progress/ticket-progress';
import userServices from 'client/src/services/user';

export function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    async function fetchTicket() {
      try {
        setLoading(true);
        const resp = await ticketServices.getOne(Number(id));

        if (ignore) return;

        if (!resp.error) {
          setTicket(resp.data!)
        } else {
          // handle error
          message.error(resp.statusText)
        }

      } catch (error) {
        if (ignore) return;
        message.error("Unknown Error")
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchTicket();

    return () => {
      ignore = true
    }

  }, [id]);

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      setLoading(true)
      try {
        const resp = await userServices.getList();

        if (ignore) return;

        if (!resp.error) {
          setUsers(resp.data!)
        } else {
          message.error(resp.statusText);
        }

      } catch (error) {
        if (ignore) return;

        message.error("Unknown Error");

      } finally {
        setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      ignore = true
    }
  }, []);

  const handleChangeAssignee = async (value: number) => {
    if (!value) return;
    try {
      const resp = await ticketServices.assignUser({
        titketId: Number(id),
        userId: value
      });
      if (!resp.error) {
        message.success('Assign Success')
        setTicket(prev => ({ ...prev!, assigneeId: value }))
      } else {
        message.error(resp.statusText);
      }
    } catch (error) {
      message.error("Unknown Error");
      console.log(error)
    }
  }
  const handleUnAssign = async () => {
    try {
      const resp = await ticketServices.unassign(Number(id));
      if (!resp.error) {
        message.success('Unassign Success')
        setTicket(prev => ({ ...prev!, assigneeId: null }))
      } else {
        message.error(resp.statusText);
      }
    } catch (error) {
      message.error("Unknown Error");
      console.log(error)
    }
  }

  const changeTicketStatus = async (value: boolean) => {
    let service = ticketServices.markAsComplete
    if (!value) {
      service = ticketServices.markAsIncomplete
    }
    try {
      const resp = await service(Number(id));
      if (!resp.error) {
        message.success(`Mark as ${value ? 'Complete' : 'Incomplete'} Success`)
        setTicket(prev => ({ ...prev!, completed: !prev?.completed }))
      } else {
        message.error(resp.statusText);
      }
    } catch (error) {
      message.error("Unknown Error");
      console.log(error)
    }
  }

  const userOptions = useMemo(() => {

    if (users.length === 0) return [];

    return users.map(user => ({
      label: user.name,
      value: user.id
    }))

  }, [users])


  return (
    <div className={styles['container']}>
      <Container>
        <h2 className={styles['header']}>Welcome to TicketDetails!</h2>
        <div className={styles['details']}>
          {
            loading ?
              <div className={styles['loading']}>
                <Spin size='large' />
              </div>
              :
              ticket ?
                <div className={styles['content']}>
                  <div><span>TicketId:</span> {ticket?.id}</div>
                  <div><span>Description:</span> {ticket?.description}</div>
                  <div>
                    <span>Progress: </span>
                    <TicketProgress completed={ticket?.completed} />
                    <Switch
                      checked={ticket.completed}
                      onChange={changeTicketStatus}
                    />
                  </div>
                  <div>
                    <span>Assignee:</span>
                    <Select
                      className={styles['select']}
                      options={userOptions}
                      onChange={handleChangeAssignee}
                      value={ticket?.assigneeId}
                      onClear={handleUnAssign}
                      allowClear
                      data-testid="select-testid"
                    />
                  </div>
                  <div className={styles['back']}>
                    <Link className={styles['link']} to="/">Back to list</Link>
                  </div>
                </div>
                : null
          }
        </div>
      </Container>
    </div>
  );
}

export default TicketDetails;
