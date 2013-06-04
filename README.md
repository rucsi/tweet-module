rucsi Tweet module
============
The purpose of the project is to search the Twitter API for tweets relating to the word "Facebook" and displaying them in a paged list. 
The paging is infinite i.e. clicking on "Next" retrieves the next list of tweets and once the end was reached it wraps around to the initial results.

The list displays a tile for each tweet with, at the very least, the following information: 
 * name of the user
 * image of the user
 * text of the tweet

The frontend is in HTML and doesn't use any Javascript library apart from jQuery. It is using Bootstrap responsive css and works both on mobile and on a desktop browser.

The Twitter API is accessed via a server-side component, not directly in Javascript.  

The server component is written with node.js, and express.
