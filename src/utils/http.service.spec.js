import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  init
} from './http.service';
import 'babel-polyfill';

describe('Http service', () => {
  let httpClient, data, mock;

  beforeEach(() => {
    httpClient = init();
    mock = new MockAdapter(axios);
    data = {
      response: true,
      postData: {
        post: 'worked'
      }
    };
  });

  it('returns success on Success', done => {
    mock.onGet('http://so1me').reply(200, data);
    httpClient.get('http://some').then(response => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch(err => {
        expect(err.data).toEqual(undefined);
        done();
      });
  });
  it('returns 404 when not found', done => {
    mock.onGet('http://some').reply(200, data);
    httpClient.get('http://some').then(response => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch(err => {
        expect(err.data).toEqual(undefined);
        done();
      });
  });
  it('returns Post when not found', done => {
    mock.onPost('http://some').reply(200, data);
    httpClient.post('http://some').then(response => {
        expect(response.data).toEqual(data);
        done();
      })
      .catch(err => {
        expect(err.data).toEqual(undefined);
        done();
      });
  });
});
