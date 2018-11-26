const request = require('request');
const cheerio = require('cheerio');

function scrape(html){
	const $ = cheerio.load(html);
	
	var pageTitle = $('.firstHeading').text();
	var logosrc = $('a.image img').attr('src');
	var companyType = $('td.category a').attr('title');
	var paragraphs = [];
	var table = [];

	$('p').each(function(i, element){
		var paragraph = $(this).text();
		paragraphs.push(paragraph);
	});

	$('table.infobox.vcard tbody').each(function(i, element){
		$(this).children().each(function(i, element){
			var th = $(this).children('th');
			var td = $(this).children('td');
			table.push(th.text() + " : " + td.text());
		});
	});

	return {
		"pageTitle" : pageTitle,
		"logosrc" : logosrc,
		"companyType" : companyType,
		"table" : table
	};
}

var companyName = 'IBM';
var wikiLink = 'https://en.wikipedia.org/wiki/';

request(wikiLink + companyName, (error, response, html) => {
	if(!error && response.statusCode == 200){
		console.log(scrape(html));
	}
});