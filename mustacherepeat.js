/*!
 mustacherepeat.js - Dynamically repeat {{mustache}} templates with Javascript
 https://github.com/nfreear/mustacherepeat.js
*/

/*jslint nomen: true, plusplus: true, todo: true, white: true, indent: 2 */
/*global Mustache, document, $ */

var MustacheRepeat = function (op) {
  "use strict";

  var exports = {
    options: op,

    add: add,
    rem: _delete
  };

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
  op.data = op.data || [];

  var idx = 0,
    //self = this,
    select = function (sel) {
      return document.querySelector(sel);
    },
    temp_elem = op.template.match(/^\s?[#.][a-zA-Z]/) ? select(op.template) : null,
    template = temp_elem ? temp_elem.innerHTML : op.template,
    compiledTemp = op.compiler.compile(template),
    target = select(op.target),
    j;

    // TODO - handle errors?

    function _delete(ev, i) {
      var del = op.predelete(i, op, ev),
        child;
      if (!del) {
        console.log('No delete');
        return del;
      }

      if (target.children.length > op.min) {
        child = target.removeChild(select('#' + op.rowid + i));
        updateDeletes();
      }

      op.ondelete(i, op, ev);
    }

    function add(ev) {
      if (idx >= op.max) {
        return;
      }
      var html = compiledTemp({
        idx: idx, data: op.data[idx], deleteText: op.deleteText, rowid: op.rowid + idx, deleteid: op.deleteid + idx });
      //MSIE: can't assign to innerHTML within tables, http://ericvasilik.com/2006/07/code-karma.html
      //TODO: revisit.
      if (typeof $ === 'function') {
        $(op.target).append(html);
      } else {
        //target.appendChild(html);
        target.innerHTML += html;
      }

      updateDeletes();

      op.onadd(idx, op, ev);

      idx++;
    }

    function updateDeletes() {
      var child,
        c,
        m,
        ti = null;
      for (c in target.children) {
        child = target.children[c];
        m = child.id ? child.id.match(/(\d+)/) : null;
        if (m) {
          (function (ti) {
          select('#' + op.deleteid + ti).onclick = function (ev) {
            _delete(ev, ti);
          }
          })(m[0]);
        }
      }
    }

  // Initialize!
  for (j = 0; j < op.start; j++) {
    add();
  }
  select(op.addBtn).onclick = function (ev) { add(ev); };

  return exports;
};
