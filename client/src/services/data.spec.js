import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getServiceData } from './data';

describe('test', () => {

  const mock = new MockAdapter(axios);
  it('data - success', async () => {
    mock.onGet('/test').reply(200, [
      ['Neha'],
      ['Neha1']
    ]);

    const data = await getServiceData('/test'); \
    expect(data.length).toEqual(2);
  });

  it('data - catch', async () => {
    mock.onGet('/test').reply(500, { message: 'Error' });

    const data = await getServiceData('/test'); \
    expect(data).toBeNull;
  });


}); 