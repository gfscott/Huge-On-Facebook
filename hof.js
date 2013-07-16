/*!

Huge on Facebook: a script to attach the number of Facebook likes to any list of arbitrary links.
http://gfscott.com/hof/
Copyright (c) 2012 Graham F. Scott
Licensed under the MIT License: http://opensource.org/licenses/mit-license
Requires: jQuery 1.3.0+ or Zepto 0.8+ 
Version: 1.3.1
No hotlinking scripts please!
*/

/*

======================
HOW TO USE:

Include jQuery and HugeOnFacebook scripts on your HTML page, e.g.:

	#	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	#	<script src="location/on/your/server/hof.min.js"></script>

And then use jQuery to call the script when the page is loaded, e.g.:

	#	<script>
	#		$(document).ready(function() {
	#			$('#container').hugeOnFacebook();
	#		});
	#	</script>

======================
DEFAULT SETTINGS:

There are several user-configurable options which you can set when you call the script:

	#	.hugeOnFacebook({
	#		
	#		linkClass: [The class of anchor tags you want to target. Default is blank, and will target all links inside the given container, e.g. $('#container_div'). Substitute a string to target only <a> tags of that class.],
	#		
	#		addData: [Whether or not you want to additionally add an HTML5 data attribute containing the number of likes to each anchor tag. Default is false. If set to true, will add 'data-likes="X"', which you might then have other uses for. ],
	#		
	#		minLikes: [The minimum number of likes a link must get in order to be marked as popular. Default is 10. Substitute any integer.],
	#		
	#		hugeLikes: [A second level of popularity. Consider "minLikes" the threshold for visibility, and "hugeLikes" reserved for things that readers will consider truly notable. Default is 50. Substitute any integer.],
	#		
	#		popClass: [The class that will be added to any targeted anchor link whose like count is greater than "minLikes". Default is "popular". Substitute any string.],
	#		
	#		hugeClass: [The class that will additionally be added to any targeted anchor link whose like count is greater than "hugeLikes". Default is "hugeonfacebook". Substitute any string.],
	#		
	#		likesVisible: [If set to true, will append a <span> tag after any targeted anchor link whose like count is greater than "minLikes". By default the span has the class "likesVisible" and contains the text "X Likes", where X is the number of likes. ],
	#
	#		likesVisibleClass: [The class that will be applied to the <span> element created by likesVisible. Default is "likesVisible". Substitute any string.]
	#		
	#	});


*/

(function( $ ) {
  $.fn.hugeOnFacebook = function(options) {
		
		// Default settings
		var defaults = {
				linkClass: "",
				addData: false,
				minLikes: 10,
				hugeLikes: 50,
				popClass: "popular",
				hugeClass: "hugeonfacebook",
				likesVisible: false,
				likesVisibleClass: "likesVisible"	
			}
		
		// Merge defaults with user-specified options
		var settings = $.extend({}, defaults, options);
		
		// Get target element(s); if #id container, set targetID; if all links with .class, set targetClass
		if(this.attr("id")){ 
		var targetID = "#" + this.attr("id") + " ";
		} else if (this.attr("class")){
			var targetClass = "." + this.attr("class");
		} else {}
				
		// If a linkClass is specified, set theLinks to ".<linkClass>" value
		if(settings.linkClass){
			var theLinks = "." + settings.linkClass;
		} else if(targetClass) {
			var theLinks = targetClass;
		} else { var theLinks = ""; }
		
		// If a targetID is specificed, set theContainer to #<targetID>
		if(targetID) {
			var theContainer = targetID;
		} else { 
			var theContainer = "";
		}
			
		// Get all targeted elements and carry out the function on each one
		$(theContainer + "a" + theLinks).each(function(){
				
				// Cache the selected tag, its href attribute, and the Open Graph URL for each link
				var self = $(this),
					href = self.attr("href"),
					url = "http://graph.facebook.com/" + href;
				
				// Use jQuery's Ajax JSON function to fetch the Open Graph object
				$.getJSON(url, function(data){
					
					// Cache the like count
					var count = data.shares;
					
					// If the number of likes is greater than the set minimum...
					if(count >= settings.minLikes) {
						
						// ... add the popularity class
						self.addClass(settings.popClass);
						
						// Additionally, if the number of likes is greater than the set "hugeLikes" number...
						if(count >= settings.hugeLikes){
							
							// ...add the huge class
							self.addClass(settings.hugeClass);
						}
						
						// If the user has set likes to be visible, add the span
						if(settings.likesVisible) {
							self.append('<span class="' + settings.likesVisibleClass + '">' + count + ' Likes</span>');					
						}
						
						// If the user has requested a "data-likes" attribute for the anchor tag, add it.
						if(settings.addData) {
							self.attr("data-likes", count);
						}
						
					}
					
				// end getJSON			
				});
			
			// end .each() cycle	
			});
		};
})( window.jQuery || window.Zepto );
