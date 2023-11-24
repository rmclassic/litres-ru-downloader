# litres-ru-downloader
A script to download book pages from litres.ru online reader
In order to download book pages, the book must be subscribed to.

## Requirements
- NodeJS v21.1.0

## Installation
```bash
git clone https://github.com/rmclassic/litres-ru-downloader && cd litres-ru-downloader
npm i
```

## Configuration
update `./config.json` with your credentials and book info, the `book_url` field is the online viewer url for the book, ex. `https://www.litres.ru/static/or3/view/or.html?art_type=4&file=65348169...`
then run the command `node index.js` to start downloading book pages
