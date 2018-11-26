const request = require('request');
const cheerio = require('cheerio');

function scrape(html){
	const $ = cheerio.load(html);
	
	var pageTitle = $('.firstHeading').text();
	var logosrc = $('a.image img').attr('src');
	var companyType = $('td.category a').attr('title');
	var table = [];

	$('table.infobox.vcard tbody').each(function(i, element){
		$(this).children().each(function(i, element){
			var th = $(this).children('th');
			var td = $(this).children('td');
			(th.text() !== '') && (td.text() !== '') ?  table.push(th.text() + " : " + td.text()) : console.log("th text and td text empty");
		});
	});

	var contents = [];

	$('#toc ul li a').each(function(i, element){
		contents.push($(this).text());
	});

	return {
		"pageTitle" : pageTitle,
		"logosrc" : wikiLink + logosrc,
		"companyType" : companyType,
		"table" : table,
		"contents" : contents
	};
}

var companyName = 'IBM';
var wikiLink = 'https://en.wikipedia.org/wiki/';

request(wikiLink + companyName, (error, response, html) => {
	if(!error && response.statusCode == 200){
		console.log(scrape(html));
	}
});