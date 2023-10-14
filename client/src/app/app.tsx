import { Routes, Route } from 'react-router-dom';

import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';
import CustomLayout from '../layout/custom-layout';

const App = () => {
  return (
    <CustomLayout>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </CustomLayout>
  );
};

export default App;
