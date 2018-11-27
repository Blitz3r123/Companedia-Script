const request = require('request');
const cheerio = require('cheerio');

function findData($, elementName, array, searchName){
	$(elementName).each(function(i, element){
		var pText = $(this).text();
		if(pText.includes(searchName)){
			array.push($(this).text());
		}
	});
}

function scrape(html){
	const $ = cheerio.load(html);
	
	var pageTitle = $('.firstHeading').text();
	var logosrc = $('a.image img').attr('src');
	var companyType = $('td.category a').attr('title');
	var introduction = $('#mw-content-text p').eq(1).text() + " " + $('#mw-content-text p').eq(2).text();
	var table = [];
	var contents = [];
	var cultureData = [];
	var productData = [];
	var serviceData = [];

	// Getting data for table array
	$('table.infobox.vcard tbody').each(function(i, element){
		$(this).children().each(function(i, element){
			var th = $(this).children('th');
			var td = $(this).children('td');
			(th.text() !== '') && (td.text() !== '') ?  table.push(th.text() + " : " + td.text()) : console.log("th text and td text empty");
		});
	});
	// Getting data for content array
	$('#toc ul li a').each(function(i, element){
		contents.push($(this).text());
	});
	// Getting data for culture
	findData($, 'p', cultureData, 'culture');
	findData($, 'p', productData, 'product');
	findData($, 'p', serviceData, 'service');

	return {
		"pageTitle" : pageTitle,
		"logosrc" : wikiLink + logosrc,
		"companyType" : companyType,
		"table" : table,
		"contents" : contents,
		"introduction" : introduction,
		"cultureData" : cultureData,
		"productData" : productData,
		"serviceData" : serviceData
	};
}

var companyName = 'microsoft';
var wikiLink = 'https://en.wikipedia.org/wiki/';

request(wikiLink + companyName, (error, response, html) => {
	if(!error && response.statusCode == 200){
		console.log(scrape(html));
	}
});