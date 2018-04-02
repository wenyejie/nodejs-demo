/**
 *
 *
 * @author: Storm
 * @date: 2018/04/02
 */

const express = require('express');

// superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
const superagent = require('superagent');

// cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。
const cheerio = require('cheerio');

const app = express();


app.get('/', (request, response, next) => {
  superagent.get('https://cnodejs.org/')
    .end((error, spiderResponse) => {
      console.log(error, spiderResponse);
      if (error) {
        return next(error);
      }

      const $ = cheerio.load(spiderResponse.text);

      const items = [];


      // 遍历列表进行输出
      $('#topic_list .cell').each((id, element) => {
        const $element = $(element);

        const $title = $element.find('.topic_title');

        items.push({
          title: $title.attr('title'),
          href: $title.attr('href'),
          author: $element.find('.user_avatar img').attr('title')
        })
      });

      response.send(items);
    })
});

app.listen(3000, (request, response) => {
  console.log('App is running at port 3000');
});