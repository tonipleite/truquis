# truquis

(Hay también un "README_es.md" que está en castellano.)

In this repository one may find different files such as scripts, snippets and other code that may be useful for different purposes.

These files aren't part of a common project, although some of them could become pieces of something bigger.


## Things you may find around here

1. **plantillaDescargaGoogle.js** is a JS template that, with little change, lets one download iteratively information from a set of URLs based on a common domain.


## Details

### 1. plantillaDescargaGoogle.js

This JS template has originally been designed to download iteratively information from Google Maps site, by doing trip request (from point "A" to point "B"), then using de URL info. This task can be achieved somehow else for sure, by utilizing Google's API or even _curl_ to collect the info.

However, for a not-so-experienced user who, on the other hand, has some knowledge in programming, using an API or _curl_ may be complicated, whereas taking a simple template and readapt it to another situation may be feasible.

What the script iteratively does is:
- Open a page of the same domain that the one of the page where the script is running.
- Wait a time "X" to read.
- Retrieve the info from the DOM (_Document Object Model).
- Close the page.

The script has a very simple mechanism to avoid the error that can be produce when there's an attempt of reading but the page hasn't been loaded yet due to a tranfer problem.

Moreover, there are a bunch of parameters that will even let the user set the time increments for the program to self-adjust the waiting time; it increases or decreases the waiting time depending on the amount of succesful readings. Thus, if it tries to read faster than the connection speed loads the page, the waiting time will increase automatically.