/*
 * Copyright (c) 2000-2018 TeamDev. All rights reserved.
 * TeamDev PROPRIETARY and CONFIDENTIAL.
 * Use is subject to license terms.
 */
import '@polymer/iron-test-helpers/iron-test-helpers.js';

/*
  This module provides the utility functions for testing. These are considered private to this package and
  shouldn't be used by those who import it to just use its elements.
*/

/**
 * Contains constants for the standard node names
 * (https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName).
 *
 * This member is considered private to the package. Please don't use it if you're just importing
 * the package to use its elements.
 *
 * @private
 */
window._NodeNames = {
  TEXT: '#text',
  COMMENT: '#comment'
};

/**
 * Checks the list of elements using the list of checkers — one checker for each node.
 *
 * A "checker" here is a function that accepts two parameters (`node: Node`, `message: string`),
 * and runs assertions for any criteria that the respective node should fulfill. If the passed
 * node passes all checks then the checker function should return without exceptions.
 * messages. Checker implementations are encouraged to include the `message` passed to them into
 * the actual assertion messages so that a higher level assertion context is clear in the
 * resulting messages.
 *
 * This member is considered private to the package. Please don't use it if you're just importing
 * the package to use its elements.
 *
 * @private
 */
window._checkNodeList = function(nodes, expectedNodeCheckers, message) {
  const messagePrefix = message ? `${message}: ` : '';
  if (!expectedNodeCheckers) {
    assert.equal(nodes.length, 0, `${messagePrefix}expecting nodes list to be empty.`);
    return;
  }
  const nonEmptyNodes = Array.from(nodes).filter(node =>
      node.nodeName !== _NodeNames.TEXT || node.data.trim() !== ''
  );
  assert.equal(nonEmptyNodes.length, expectedNodeCheckers.length,
      `${messagePrefix}checking the number of nodes`);
  nonEmptyNodes
  .forEach((node, index)=> {
    const expectedNodeChecker = expectedNodeCheckers[index];
    expectedNodeChecker(node, `${messagePrefix}checking node number #{index}`);
  });
};

/**
 * A collection of functions that create and return checkers of various kinds.
 *
 * A "checker" here is a function that accepts two parameters (`node: Node`, `message: string`),
 * and checks the specified node for any criteria that are specific for this type of checker using
 * the assertion functions. So if element checking fails, an appropriate assertion exception is
 * thrown, and if all checks are passed then the function returns without exceptions. The
 * `message` parameter provides a text that should be included into the actual assertion
 * messages.
 *
 * This member is considered private to the package. Please don't use it if you're just importing
 * the package to use its elements.
 *
 * @private
 */
window._checkers = {
  /**
   * Creates a checker that checks whether a node that it is given is an element that that
   * satisfies the criteria passed in the `params` argument.
   *
   * @param {{
   *    name: string|undefined,
   *    className: string|undefined,
   *    innerHTML: string|undefined,
   *    nodeCheckers: Array<function>|undefined,
   *    computedStyle: Object|undefined
   *  }} params
   * @returns {function(node: Node, message: string)}
   *
   * This member is considered private to the package. Please don't use it if you're just importing
   * the package to use its elements.
   *
   * @private
   */
  element: (params) => (node, message) => {
    assert.isTrue(node instanceof Element, `${message}. Checking that the passed node is ` +
        `instance of Element (node.nodeName = '${node.nodeName}'`);
    if (params.name !== undefined) {
      assert.equal(node.tagName.toLowerCase(), params.name,
          `${message}: expecting a <div> node inside a slot.`);
    }
    if (params.className !== undefined) {
      assert.equal(node.className || '', params.className || '',
          `${message}: checking element's class name.`);
    }
    if (params.innerHTML !== undefined) {
      assert.equal(node.innerHTML.trim(), params.innerHTML,
          `${message}: checking element's innerHTML.`);
    }
    if (params.nodeCheckers !== undefined) {
      _checkNodeList(node.childNodes, params.nodeCheckers, `${message}: checking child nodes`);
    }
    if (params.computedStyle !== undefined) {
      const style = getComputedStyle(node);
      Object.keys(params.computedStyle).forEach(propertyName => {
        assert.equal(style[propertyName], params.computedStyle[propertyName],
            `${message}: checkig CSS property named '${propertyName}'`);
      });
    }
  },

  /**
   * Creates a checker that ensures that the passed node is a text node with the specified text.
   *
   * @param {string} text
   * @returns {function(node: Node, message: string)}
   *
   * This member is considered private to the package. Please don't use it if you're just importing
   * the package to use its elements.
   *
   * @private
   */
  textNode: text => (node, message) => {
    assert.equal(node.nodeName, _NodeNames.TEXT, `Expecting a text node (with text "${text}"), ` +
        `but encountered a node named ${node.nodeName}`);
    const trimmedText = node.data.trim();
    assert.equal(trimmedText, text, `${message}: checking the text node's content`);
  }
};
