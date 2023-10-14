import styles from './assignee.module.css';
import { useEffect, useState } from 'react';
import { User } from '@acme/shared-models';
import userServices from 'client/src/services/user';
import { Skeleton } from 'antd';
import clsx from 'clsx';

export interface IAssignee {
  className?: string,
  assigneeId?: number
}

const Assignee = (props: IAssignee) => {
  const { className, assigneeId } = props;
  const [assignee, setAssignee] = useState<User>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!assigneeId) return;

    async function fetchUser() {
      try {
        setLoading(true);
        const resp = await userServices.getOne(assigneeId!);
        if (!resp.error) {
          setAssignee(resp.data!)
        } else {
          // handle error
          console.log(resp.statusText);
        }

      } catch (error) {
        // handle error
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchUser();

  }, [assigneeId]);

  return (
    <div className={clsx(styles['root'], className && className)}>
      {
        !assigneeId ? 'Unassigned' : 
        loading ? 
        <Skeleton paragraph={{rows: 1, width: 80}} title={false} />
        : assignee ? 
          assignee.name
          : 'Unknown'
      }
    </div>
  );
};

export default Assignee;
