/**
 *
 *
 * @author: Storm
 * @date: 2018/04/02
 */

const async = require('async');

// 并发连接数技术器
let concurrencyCount = 0;

/**
 * 获取URL数据
 * @param url url
 * @param callback 回调
 */
const fetchUrl = (url, callback) => {

  // delay 的值在 2000 以内，是个随机的整数
  const delay = parseInt(Math.random() * 10000000 % 2000, 10);

  concurrencyCount++;

  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

const urls = [];

for (let i = 0; i < 30; i++) {
  urls.push(`http://wenyejie.com/g_${i}`);
}

async.mapLimit(urls, 5, (url, callback) => {
  fetchUrl(url, callback);
}, (error, result) => {
  console.log('final: ');
  console.log(result);
});