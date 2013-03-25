{{ mustacherepeat.js }}
=================

Dynamically repeat {{mustache}} templates with Javascript.

For example:

 * Click the HTML button to add a row to the table.

Inspired by `repeat=template` from [Web Forms 2][wf2].


## Usage

    <ul id="list" ></ul>
    <button id="listAdd" >Add item</button>


    <!--[if IE]>
      <script src="http://cdn.enderjs.com/jeesh.min.js"></script>
    <![endif]-->

    <script src="http://cdn.jsdelivr.net/mustache.js/0.7.2/mustache.js"></script>
    <script src="../mustacherepeat.js"></script>


    <script>
      MustacheRepeat({
        template: '<li>Item {{ idx }}',
        target: '#list',
        addBtn: '#listAdd'
      });
    </script>

## Dependencies

 * mustache.js: <https://github.com/janl/mustache.js>
 * For Internet Explorer: Ender/jeesh, Zotero or jQuery - implementing `$(selector).html(html)`

## Links

 * Test: <http://iet-embed-acct.open.ac.uk/dev/mustacherepeat.js/test>
 * Code: <https://github.com/nfreear/mustacherepeat.js>


Copyright 2013 [Nick Freear][copy].

[copy]: http://nfreear.mit-license.org/
[wf2]: http://whatwg.org/specs/web-forms/current-work/#repeatingFormControls

