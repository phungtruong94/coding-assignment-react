import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Tickets from './tickets';
import { BrowserRouter } from 'react-router-dom';

jest.mock('client/src/services/ticket', () => ({
  __esModule: true,
  default: {
    async getList() {
      return Promise.resolve({
        data: [
          {
            "id": 1,
            "description": "Install a monitor arm",
            "assigneeId": 1,
            "completed": false
          },
          {
            "id": 2,
            "description": "Move the desk to the new location",
            "assigneeId": 1,
            "completed": false
          }
        ]
      })
    }
  },
}));

jest.mock('client/src/services/user', () => ({
  __esModule: true,
  default: {
    async getOne() {
      return Promise.resolve({
        data: {
          "id": 1,
          "name": "Alice"
        }
      })
    }
  },
}));

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the list successfully', async () => {

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Install a monitor arm')).toBeInTheDocument()
      expect(screen.getByText('Move the desk to the new location')).toBeInTheDocument()
    })
  });
  it('should render correctly when filter', async () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Install a monitor arm')).toBeInTheDocument()
      expect(screen.getByText('Move the desk to the new location')).toBeInTheDocument()
    })
    fireEvent(
      screen.getByText('INCOMPLETE'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitFor(() => {
      expect(screen.getByText('Install a monitor arm')).toBeInTheDocument()
      expect(screen.getByText('Move the desk to the new location')).toBeInTheDocument()
    })

    fireEvent(
      screen.getByText('COMPLETED'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument()
    })
  })
});
