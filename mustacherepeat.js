/*!
 mustacherepeat.js - Dynamically repeat {{mustache}} templates with Javascript
 https://github.com/nfreear/mustacherepeat.js
*/

/*jslint nomen: true, plusplus: true, todo: true, white: true, indent: 2 */
/*global Mustache, document, $ */

var MustacheRepeat = function (op) {
  "use strict";

  op = op || {};
  op.compiler = op.compiler || Mustache;
  op.template = op.template || '#template'; // TODO: A selector, or a template string.
  op.target = op.target || '#target';
  op.addBtn = op.addBtn || '#addBtn';
  op.rowid = op.rowid || 'mrRow-';
  op.deleteid = op.deleteid || 'mrDelete-';
  op.start = parseInt(op.start) || 1;
  op.min = parseInt(op.min) || 1;
  op.max = parseInt(op.max) || 10;
  op.onadd = op.onadd || function () {};
  op.ondelete = op.ondelete || function () {};
  op.predelete = op.predelete || function () { return true; };
  op.deleteText = op.deleteText || "Remove";
  op.data = op.data || {};

  var idx = 0,
    //self = this,
    select = function (sel) {
      return document.querySelector(sel);
    },
    temp_elem = op.template.match(/^\s?[#.][a-zA-Z]/) ? select(op.template) : null,
    template = temp_elem ? temp_elem.innerHTML : op.template,
    compiledTemp = op.compiler.compile(template),
    target = select(op.target),
    j,

    // TODO - handle errors?

    _delete = function (ev, i) {
      var del = op.predelete(i, op, ev),
        child;
      if (!del) {
        console.log('No delete');
        return del;
      }

      if (i >= op.min) {
        child = target.removeChild(select('#' + op.rowid + i));
      }

      op.ondelete(i, op, ev);
    },
    add = function (ev) {
      if (idx >= op.max) {
        return;
      }
      var html = compiledTemp({
        idx: idx, data: op.data, deleteText: op.deleteText, rowid: op.rowid + idx, deleteid: op.deleteid + idx });
      //MSIE: can't assign to innerHTML within tables, http://ericvasilik.com/2006/07/code-karma.html
      //TODO: revisit.
      if (typeof $ === 'function') {
        $(op.target).append(html);
      } else {
        target.innerHTML += html;
      }

      // Bug in onclick assign?
      (function (i) {
        var btn = select('#' + op.deleteid + i);
        if (btn) {
          btn.onclick = function (ev) { _delete(ev, i); };
        }
      })(idx);

      op.onadd(idx, op, ev);

      idx++;
    };

  // Initialize!
  for (j = 0; j < op.start; j++) {
    add();
  }
  select(op.addBtn).onclick = function (ev) { add(ev); };

  return {
    options: op,

    // Public methods.
    add: add,
    _delete: _delete
  };
};
