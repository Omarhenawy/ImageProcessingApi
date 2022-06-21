import app from '../index';
import supertest from 'supertest';
import express from 'express';


const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async ():Promise<void> => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('gets the images endpoint', async ():Promise<void> => {
    const response  = await request.get(
      '/api/images?filename=fjord&height=200&width=200'
    );
    expect(response.status).toBe(200);
  });
});
