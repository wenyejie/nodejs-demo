/**
 *
 *
 * @author: Storm
 * @date: 2018/04/02
 */

const eventproxy = require('eventproxy');

const superagent = require('superagent');

const cheerio = require('cheerio');

const url = require('url');

const express = require('express');

const app = express();

const cnodeUrl = 'https://cnodejs.org/';

app.get('/', (request, response) => {

  superagent.get(cnodeUrl)
    .end((error, response) => {
      if (error) {
        return console.log(error);
      }

      const result = [];

      const $ = cheerio.load(response.text);

      $('#topic_list .topic_title').each((index, element) => {
        const $element = $(element);

        result.push({
          href: url.resolve(cnodeUrl, $element.attr('href'))
        })
      });

      asyncGetDetail(result);
    });

  const asyncGetDetail = (result) => {
    const ep = new eventproxy();

    ep.after('listInfo', result.length, list => {

      list = list.map(item => {
        const $ = cheerio.load(item.response.text);

        const itemResult = {
          href: item.href,
          title: $('.topic_full_title').text().trim(),
          author: $('.changes').find('a').text().trim(),
          content: $('.topic_content .markdown-text').text(),
          commit: []
        };

        $('.reply_item').each((index, item) => {
          const $item = $(item);
          itemResult.commit.push({
            author: $item.find('.reply_author').text(),
            content: $item.find('.markdown-text').text()
          })
        });

        return itemResult;
      });

      console.log('final:');

      response.send(list);

    });

    result.forEach(item => {
      superagent.get(item.href)
        .end((error, response) => {
          console.log(`fetch ${item.href} successful.`);
          ep.emit('listInfo', Object.assign({error, response}, item))
        });
    })
  };

});

app.listen(3000, (request, response) => {
  console.log('App is running at port 3000');
});

