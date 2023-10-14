
import { Tag } from 'antd';
import clsx from 'clsx';

export interface ITicketProgress {
  className?: string,
  completed: boolean
}

const TicketProgress = (props: ITicketProgress) => {
  const { className, completed } = props;
  return (
    <>
      {
        completed ?
          <Tag className={clsx(className && className)} color='green'>Completed</Tag>
          : <Tag className={clsx(className && className)} color='blue'>Incomplete</Tag>
      }
    </>
  );
};

export default TicketProgress;
