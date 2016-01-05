# Christianle.com: Purpose
<!---
Why I rebuilt my website, again, and the reasoning behind my technology choices.
-->

### Why

This really breaks down into a couple things, SEO, learning, and fun. My old
website was terribly outdated, not in it's technologies or design (though I'm
sure some people would argue that), but in it's content. I just couldn't will
myself to update anything on it because everything was in straight HTML. Which
is why blurbs on this website are written using
[markdown](https://goo.gl/Rl2gCB).

#### Markdown

I take all my notes in markdown, and it's a really quick way to create styled
text without all the markup from HTML. It's just a personal preference thing.
It's also great because now all my blurbs will be styled the same without me
having to remember classes or ids or tags or whatever with html. I get a nice
cohesive website without any troubles.

A side benefit is that I don't need to have a database for my blurb
entries, just have to save all my markdown files on the server and have it
served. Is this best practices, no, did I want to build a CMS, no, so this was
a compromise.

#### SEO

I really wanted server side rendering for SEO, I pretty much don't exist
according to Google. My old site had virtual no search engine optimization
because I used Angular 1.3 and it as completely client rendered. Yes I know it's
possible with Angular to get search engine optimization I just didn't find any
solution very clean or affordable. Hence the move to React/Flux and a
"universal" app. Ooohhh buzz words, added benefit of the technology change.

Oh and go ahead, turn off Javascript. It's not an SEO thing but at least now I
won't have to listen to people saying
*"hmmmmm won't work on IE8, you should fix that"*. And yea I know it's not
going to be the prettiest website on IE8, I frankly just don't care. Please
move to a modern browser, a more secure browser, if you're reading this on IE8/9
and feeling offended. Trust me it's for your own good.

#### Learning

I've been using React and Redux for all my project as of recent but they were
all hacked together with warnings left and right, so I wanted to make something
using the technologies more correctly (I make no claims that I didn't hack some
stuff together for this website). I definitely learned the most about webpack,
I understood practically none of it before but now I can at least say I put
together my own webpack config. I'll write another blurb about what I learned
later on.

#### Fun

I wanted to challenge myself, I was getting bored of web development and needed
a way to get back into it. Redoing my website was how I did it. I strayed from
web development for awhile to do mostly iOS things but this was my way back. And
yea, if you're asking, it was fun making this website.

### Purpose

I didn't make this website just because, I  want to create a collection of
resources I wish I had when I was starting out in web development. There will be
a blurbs containing short tutorials, things I discover and find interesting in
the web dev world, and probably some rants here and there. Hopefully I can
spread some knowledge =D.

### Random Code Snippet

How to vertically align something with css.

```css
.vertically-align {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```
