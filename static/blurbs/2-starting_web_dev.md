# So you want to start web development...
<!---
Why I think getting started with web development is a pain in it's current
state and what advice I would give as you start out.
-->

### Preface

I was lucky enough to be thrown into web development with of my internship at
[Storefront](https://thestorefront.com). I had a set stack to learn, with set
coding practices, etc., so getting started for me was more or less just going
to work and doing what needed to be done.

So why do I say it's a pain to start web development, well if you're
starting for yourself, there's so many options of technologies, and so many
opinions about those technologies that Googling starts to not help. I'm not
saying options aren't good, I think it's great now that I know what I'm doing,
but when you're starting out, it isn't always a pleasant place to be in.

### There are good things

I'm going to start with some positives, to not dissuade you from starting
because it's pretty fun once you get into it. One of the greatest things is
you don't actually have to "acquire" users. With apps for iOS or Android, people
have to download your app, there's a barrier of entry. With web, just throw it
up and send a link, done. Getting people to come back is another story, but
hopefully your website has content that gets people coming back.

Another thing is all you really need is internet, something that's connected
to the internet, and a text editor. Notice I didn't say computer, because you
could develop websites on your phone or tablet (just don't do it, it sounds like
a terrible experience). Web development is extremely accessible. Not to mention
there are so many guides online about almost anything you need to do/learn.

And remember how I was talking about options, it's actually one of the best
things about web development. If you don't like a library, framework, package,
module, plugin, whatever, there's most likely another one that'll be more to
your liking. For example, I recently switched from superagent to axios because
I liked the documentation more, and it had, in my opinion, better ES6 promise
support. This does pose challenges too though, which will segue me into why
I think web development is a pain if you're just starting out.

### Why things suck

If you're building simple static websites it's not all bad. You'll probably
stick with plain HTML, CSS, and javascript (with some jQuery sprinkled in
there). That's not the problem though, it's when you want to start building more
complex web apps, such as single page applications. You're going to do some
Googling about which frameworks and libraries to use, or you're going to ask
around and here lies the problem.

#### Fanboys/Fangirls

It drives me insane when someone asks about learning something in web development
and the responses are *you should learn this, it's better* or *oh the technology
you want to use sucks, use this*. Just no. These people probably have never used
the other framework or are just bandwagoning on what's hip right now. Every
framework has it's pros and cons. The war over which is better is complete and
utter crap. You pick and use the technologies and tools that most easily solve
your problems.

#### Choices

Some front end frameworks: Angular.js, React, Polymer, Vue.js, jsBlocks, Elm,
Backbone, Ember, Mithril.

Some backend frameworks: Node (Express, Koa, Hapi), Ruby on Rails, Play, Django,
Flask.

Honestly the list is a lot longer for each, I quite frankly haven't work with
more than half of them. And here lives the problem. So. Many. Choices.
Web technologies seem to grow daily and staying up to date is impossible. You
play of game of choosing well documented and tested technologies vs. new and hip
technologies of tomorrow. And it's hard to make that choice when you're starting
out. On one hand, who wants to learn staling technologies just to learn a newer
one in a month? But how do you start on something with little support if you're
just starting out? Who knows, but there are some things you can consider.

### Advice

It doesn't matter what you framework, library, technology you start off with and
learn first. Don't go at this with which framework/libraries should I use.
So and so uses this but this is up and coming and blah blah blah. Unless your
reasoning is technology or feature specific to a framework/library, it doesn't
matter.

Instead of just choosing the hip option that everyone else is using, pick one
where after reading some docs and examples, (1) you like the docs (2) you like
the way the code reads and is structured. Learn the concepts behind building
what you need to build, be it a blog, store, portfolio, cms, whatever. You can
take what you learned and move to another technology later, it'll be easier the
second time around anyways. Just get your feet wet and don't be afraid to break
all the things.

At lastly, pretty much all frameworks will have a ToDo example which
demonstrates CRUD, what you'll be needing to build almost anything. Start with
that exactly and replacing part by part until you can build something completely
from scratch.

#### Things you can look for when choosing what to learn.

CRUD examples, how data is created, read, updated, and deleted (HTTP requests,
RESTful endpoints).

Separation of server/API from your client or not (server vs client).

Whether you want server side rendering or pure client single page application
(SEO purposes, you're making a website, I assume you want to be found on
Google).

### Random Code Snippet

Const in ES6 because I was confused when I started. Pointer is constant, but
key, values can change.

```js
const hello = {};

hello = { world: true };
console.log(hello); // {}

hello.world = false;
console.log(hello); // { world: false }

const arr = [];

arr = [ 'nope' ];
console.log(arr); // []

arr.push( 'yay' );
console.log(arr); // [ 'yay' ]
```
