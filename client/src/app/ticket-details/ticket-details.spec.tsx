import { render, waitFor, screen } from '@testing-library/react';

import TicketDetails from './ticket-details';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('client/src/services/user', () => ({
  __esModule: true,
  default: {
    async getList() {
      return Promise.resolve({
        data: [
          {
            "id": 1,
            "name": "Alice"
          },
          {
            "id": 2,
            "name": "Bob"
          },
        ]
      })
    }
  },
}));

jest.mock('client/src/services/ticket', () => ({
  __esModule: true,
  default: {
    async getOne() {
      return Promise.resolve({
        data: {
          "id": 1,
          "description": "Install a monitor arm",
          "assigneeId": 1,
          "completed": false
        }
      })
    },
    async assignUser() {
      return Promise.resolve({})
    },
    async unassign() {
      return Promise.resolve({})
    },
    markAsComplete() {
      return Promise.resolve({})
    },
    markAsIncomplete() {
      return Promise.resolve({})
    }
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: 1
  }),
}));


describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render Correct value', async () => {
    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Install a monitor arm')).toBeInTheDocument();
    })
  });
  it('should change status when click switch', async () => {
    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Incomplete')).toBeInTheDocument();
      expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    });
    const switchBtn = screen.getByRole('switch');

    await userEvent.click(switchBtn);
    await waitFor(() => {
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.queryByText('Incomplete')).not.toBeInTheDocument();
    })

    await userEvent.click(switchBtn);
    await waitFor(() => {
      expect(screen.getByText('Incomplete')).toBeInTheDocument();
      expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    })

  });
  // it('can assign to new user', async () => {
  //   render(
  //     <BrowserRouter>
  //       <TicketDetails />
  //     </BrowserRouter>
  //   );

  //   await waitFor (() => {
  //     expect(screen.getByText('Install a monitor arm')).toBeInTheDocument();
  //   })

  //   const selectField = screen.getByTestId("select-testid");

  //   await waitFor(() => {
  //     expect(screen.getByText('Alice')).toBeInTheDocument()
  //   })

  //   await userEvent.click(selectField);

  //   await waitFor(() => {
  //     screen.getByText('Bob');
  //   })

  //   await userEvent.click(screen.getByText('Bob'));

  //   await waitFor(() => {
  //     expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  //     expect(screen.getByText('Bob')).toBeInTheDocument();
  //   })
  // });
});
