# READ THIS FIRST!

Lawbrador is in the early stages of development. There is no support of any kind for running or hosting it at this moment.

# Lawbrador

![optie-kleur](https://user-images.githubusercontent.com/18684688/156994914-841f6af1-d1e6-46fc-9296-44cafef78d5f.png)

Lawbrador wants to make the law accessible for everyone. We are creating a platform from which you can access any legal resource, do your research and share it.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## How it works

Instead of saving the legal universe to a private database, Lawbrador proxies queries to official search engines. Based on a configuratble set of rules Lawbrador reformats the original page into a generic format. Then Lawbrador allows you to research that text any way you want.

### Example

https://eur-lex.europa.eu/ is the website of on which you can find all EU-law. However, it does not work well on mobile and (in my huble opinion) has way too many irrelevant buttons to be used by a non-expert user.

In Lawbrador you can fill in a form explaining ot the application how https://eur-lex.europa.eu/ works. For instance:

- To search you need to add the query parameter "query" in the url https://eur-lex.europa.eu/search.html.
- The query results can be found in an element with the class "EurlexContent".
- The actual text of the document can be found in an element with the id "TexteOnly".
- All elements with a class containing the word "Titre" (Title in French) are titles.

Using these rules our algorithm can "understand" the actual semantics of an online legal document on https://eur-lex.europa.eu/ and display it in our application. Because the application "understands" the structure of that document, it can now also be treated the same way as any other document from any other source. This allows us to build features that apply to all legal texts, eventually allowing social interaction, federated search and many other features to be implemented.

## Completed features

- Praseing line numbers
- Configuring https://eur-lex.europa.eu/
- Infinite scroll for search results
- Links in documents point now point to proxied document in Lawbrador
- Cache search results and proxied documents
- Conditional search parameters (if we search for legsilation, which type of legislation?)

## Wishlist

- Automatically scroll to passage of document that contains search term
- Add support for more sources
- Save found search results as bookmarks
- Label found search results
- Highlight passages from search results

## Help wanted!

We want Lawbrador to work well for both lawyers and non-lawyers. To check that we are currently doing that we are always looking for people to test the current state of our application and give us feedback. Please contact me at lennartvanlaake@gmail.com if you have any comments or are interested in previewing our application.

Also feel free to contact me if you are a developer and interested in helping out on a technical basis. It would be great to have someone to provide occasional code-reviews or help us make better technicial choices. Because of the unstable code-base we are not yet looking for external PRs.
