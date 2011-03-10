/*!

Huge on Facebook: a script to attach the number of Facebook likes to a list of arbitrary links.
http://gfscott.com/hof/
Copyright (c) 2011 Graham F. Scott
Licensed under the MIT License: http://opensource.org/licenses/mit-license
Requires: jQuery 1.5.1 (may work with earlier versions, but hasn't been tested with them.)

*/

function hof() {

// Customize these variables to suit your needs.

var linkContainerID = 'headlines'; 	// Specify the unique #ID container element that holds the list of links. (Todo: add option for more than one container
var linkClass = 'article';	 		// Specify the .class of the links for which you want the Facebook share numbers. Only links with this class will display the number of likes they have.
var displayMinimum = '20';			// Specify the minimum number of likes the article must get in order to display the like count. Default is 20
var isHuge = '50';					// Specify the minimum number of likes the article must get in order to be labeled "Huge On Facebook". As your links become more popular, you may want to raise this threshold so it reflects a truer picture of comparative popularity. Default is 50. Comment this variable out if you don't want any "HugeOnFacebook" classes added to links.
var showLikeNumber = true;			// By default, the script will add "<span class="likeNumber"></span>" inside each link, containing the total number of likes. Use CSS to style or add content to that span. Set this to false if you DON'T want to display the number. The script will still add a 'HugeOnFacebook class to any link that exceeds the popularity threshold you set.


// Stop editing there! Let THE INTERNET do the rest.

var linkList = $('#' + linkContainerID + ' .' + linkClass); // Fetch all the links of class.linkClass

linkList.each(function(){ // Cycle through each specified link
	
	var openGraph = 'http://graph.facebook.com/'; // Open Graph url base
	var url = $(this).attr('href');	// The url being evaluated
	var ogUrl = openGraph + url + '?callback=?'; // Combine the Open Graph url base, the page url, and the necessary jsonp callback 
	var self = $(this); // The link element to be updated with the likeNumber
	
	$.getJSON(ogUrl, function(data){ // fetch jsonp object from Facebook
	
		var count = data.shares; // the number of likes for the url
		var likeNumber = '<span class="likeNumber">' + data.shares + '</span>'; // the span to add to each link
		
		if(count < displayMinimum ) { // if the number of likes is less than the minimum number specified by the user...
			return;	// ...do nothing.
		}
		if(count >= displayMinimum) { // if the nubmer of likes is greater than or equal to the minimum number specified by the user...
			if(showLikeNumber) { // ...AND if the user has chosen to display the number of likes...
				$(self).append(likeNumber); // ...then add the likeNumber <span>
			}
			if(count > isHuge) { // If the number is higher than the popularity threshold specified by the user...
				$(self).addClass('HugeOnFacebook'); // ... additionally add the class "HugeOnFacebook" to the link.
			}
		}
	}); // end getJSON
	
		
}); // end linkList.each


} // end hof()

// When the document is ready, execute hof()

$(document).ready(function(){
	hof(); 
});
