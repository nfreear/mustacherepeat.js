/*
 mustacherepeat.js : Mustache Template Repeater.
 Copyright 2013 Nick Freear.
*/

/*jslint nomen: true, plusplus: true, todo: true, white: true, indent: 2 */
/* global Mustache document */

var MustacheRepeat = function (op) {
  "use strict";

  op = op || {};
  op.compiler = op.compiler || Mustache;
  op.template = op.template || '#template';
  op.target = op.target || '#target';
  op.addBtn = op.addBtn || '#addBtn';
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
    temp_elem = select(op.template),
    template = temp_elem ? temp_elem.innerHTML : null,
    compiledTemp = op.compiler.compile(template),
    target = select(op.target),
    j,

    // TODO - handle errors?

    _delete = function (ev, i) {
      var del = op.predelete(i, op, ev);
      if (!del) {
        console.log('No delete');
        return del;
      }

      // TODO: implement.

      op.ondelete(i, op, ev);
    },
    add = function (ev) {
      if (idx >= op.max) {
        return;
      }
      var html = compiledTemp({
        idx: idx, data: op.data, deleteText: op.deleteText, _deleteCmd: "mr.delete("+ idx +")" });
      //MSIE: can't assign to innerHTML within tables, http://ericvasilik.com/2006/07/code-karma.html
      //TODO: revisit.
      if (typeof $ == 'function') {
        $(op.target).append(html);
      } else {
        target.innerHTML += html;
      }
      // Bug in onclick assign?
      (function (i) {
        select('#mr-del-' + i).onclick = function (ev) { _delete(ev, i); };
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
