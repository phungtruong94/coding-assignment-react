import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateForm from './create-form';
import userEvent from '@testing-library/user-event'

jest.mock('client/src/services/ticket', () => ({
  __esModule: true,
  default: {
    async create() {
      return Promise.resolve({
        data: {}
      })
    }
  },
}));

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CreateForm onCreateSuccess={()=>{}} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should not trigger onCreateSuccess when input empty', async () => {
    const onCreateSuccess = jest.fn();
    render(
      <CreateForm onCreateSuccess={onCreateSuccess} />
    );

    fireEvent.submit(screen.getByText('Create'));
    await waitFor(() => {
      expect(onCreateSuccess).not.toBeCalled()
    })
  });

  it('should trigger onCreateSuccess when input not empty', async () => {
    const onCreateSuccess = jest.fn();
    render(
      <CreateForm onCreateSuccess={onCreateSuccess} />
    );
    const input = screen.getByPlaceholderText('Types description to create ticket');

    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');

    fireEvent.submit(screen.getByText('Create'));

    await waitFor(() => {
      expect(onCreateSuccess).toBeCalledTimes(1);
    })
  });
})