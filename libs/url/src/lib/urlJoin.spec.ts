import { urlJoin } from './urlJoin';

describe('urlJoin', () => {
  it('should work for simple case', () => {
    expect(urlJoin('http://www.google.com/', 'foo/bar', '?test=123')).toEqual('http://www.google.com/foo/bar?test=123');
  });

  it('should work for hashbang urls', () => {
    expect(urlJoin('http://www.google.com/', '#!', 'foo/bar', '?test=123')).toEqual(
      'http://www.google.com/#!/foo/bar?test=123'
    );
  });

  it('should be able to join protocol', () => {
    expect(urlJoin('http:', 'www.google.com/', 'foo/bar', '?test=123')).toEqual(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should be able to join protocol with slashes', () => {
    expect(urlJoin('http://', 'www.google.com/', 'foo/bar', '?test=123')).toEqual(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should remove extra slashes', () => {
    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123')).toEqual(
      'http://www.google.com/foo/bar?test=123'
    );
  });

  it('should not remove extra slashes in an encoded URL', () => {
    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?url=http%3A//Ftest.com')).toEqual(
      'http://www.google.com/foo/bar?url=http%3A//Ftest.com'
    );

    expect(urlJoin('http://a.com/23d04b3/', '/b/c.html')).toEqual('http://a.com/23d04b3/b/c.html');
  });

  it('should support anchors in urls', () => {
    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa')).toEqual(
      'http://www.google.com/foo/bar?test=123#faaaaa'
    );
  });

  it('should support protocol-relative urls', () => {
    expect(urlJoin('//www.google.com', 'foo/bar', '?test=123')).toEqual('//www.google.com/foo/bar?test=123');
  });

  it('should support file protocol urls', () => {
    expect(urlJoin('file:/', 'android_asset', 'foo/bar')).toEqual('file://android_asset/foo/bar');
    expect(urlJoin('file:', '/android_asset', 'foo/bar')).toEqual('file://android_asset/foo/bar');
  });

  it('should support absolute file protocol urls', () => {
    expect(urlJoin('file:', '///android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar');
    expect(urlJoin('file:///', 'android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar');
    expect(urlJoin('file:///', '//android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar');
    expect(urlJoin('file:///android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar');
  });

  it('should merge multiple query params properly', () => {
    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?key=456')).toEqual(
      'http://www.google.com/foo/bar?test=123&key=456'
    );

    expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?boom=value', '&key=456')).toEqual(
      'http://www.google.com/foo/bar?test=123&boom=value&key=456'
    );
    expect(urlJoin('http://example.org/x', '?a=1', '?b=2', '?c=3', '?d=4')).toEqual(
      'http://example.org/x?a=1&b=2&c=3&d=4'
    );
    expect(urlJoin('http://example.org/x', '?')).toEqual('http://example.org/x?');
  });

  it('should merge slashes in paths correctly', () => {
    expect(urlJoin('http://example.org', 'a//', 'b//', 'A//', 'B//')).toEqual('http://example.org/a/b/A/B');
  });

  it('should merge colons in paths correctly', () => {
    expect(urlJoin('http://example.org/', ':foo:', 'bar')).toEqual('http://example.org/:foo:/bar');
  });

  it('should merge just a simple path without URL correctly', () => {
    expect(urlJoin('/', 'test')).toEqual('/test');
  });

  it('should fail with segments that are not string or number', done => {
    try {
      const url = urlJoin(true as any);
      done(url);
    } catch (error) {
      done();
    }
  });
  it('should fail with segments that are not string or number', done => {
    try {
      const url = urlJoin('http://blabla.com/', undefined as any, 'test');
      done(url);
    } catch (error) {
      done();
    }
  });

  it('should fail with segments that are not string or number', done => {
    try {
      const url = urlJoin('http://blabla.com/', null as any, 'test');
      done(url);
    } catch (error) {
      done();
    }
  });

  it('should merge a path with colon properly', () => {
    expect(urlJoin('/users/:userId', '/cars/:carId')).toEqual('/users/:userId/cars/:carId');
  });

  it('should merge slashes in protocol correctly', () => {
    expect(urlJoin('http://example.org', 'a')).toEqual('http://example.org/a');
    expect(urlJoin('http:', '//example.org', 'a')).toEqual('http://example.org/a');
    expect(urlJoin('http:///example.org', 'a')).toEqual('http://example.org/a');
    expect(urlJoin('file:///example.org', 'a')).toEqual('file:///example.org/a');

    expect(urlJoin('file:example.org', 'a')).toEqual('file://example.org/a');

    expect(urlJoin('file:/', 'example.org', 'a')).toEqual('file://example.org/a');
    expect(urlJoin('file:', '/example.org', 'a')).toEqual('file://example.org/a');
    expect(urlJoin('file:', '//example.org', 'a')).toEqual('file://example.org/a');
  });

  it('should skip empty strings', () => {
    expect(urlJoin('http://foobar.com', '', 'test')).toEqual('http://foobar.com/test');
    expect(urlJoin('', 'http://foobar.com', '', 'test')).toEqual('http://foobar.com/test');
  });

  it('should return an empty string if no arguments are supplied', () => {
    expect(urlJoin()).toEqual('');
  });

  it('empty string dont absolute path relative', () => {
    expect(urlJoin('', '/some-path')).toEqual('/some-path');
  });

  it('relative', () => {
    expect(urlJoin('/a/b/c/d', './e')).toEqual('/a/b/c/d/e');
    expect(urlJoin('/a/b/c/d', '../e')).toEqual('/a/b/c/e');
    expect(urlJoin('/a/b/c/d', '..', 'e')).toEqual('/a/b/c/e');
    expect(urlJoin('/a/b/c/d', '../../e')).toEqual('/a/b/e');
    expect(urlJoin('/a/b/c/d', '..', '..', 'e')).toEqual('/a/b/e');
  });
});
