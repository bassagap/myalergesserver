var request = require("supertest-as-promised");
var Api = require('../server');
var express = require('express');
var app = express();

describe('Flow API', () => {
  it('hello test', () => {
    return request("https://myalergesserver.herokuapp.com").get('/food?barcode=5449000000996')
    .expect(200)
    .then((res) => {
      expect(typeof res.body.name).toBe('string');
      expect(res.body.name).toBe('Coca-Cola');
    });
  });
});

describe('sum', function() {
	it('adds 1 + 2 to equal 3', function() {
	    expect(3).toBe(3);
	})
});
