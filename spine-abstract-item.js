/*
  ~ Copyright (c) 2000-2018 TeamDev Ltd. All rights reserved.
  ~ TeamDev PROPRIETARY and CONFIDENTIAL.
  ~ Use is subject to license terms.
  */
import '@polymer/polymer/polymer-legacy.js';

import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { IronControlState } from '@polymer/iron-behaviors/iron-control-state.js';
import { IronButtonState } from '@polymer/iron-behaviors/iron-button-state.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="spine-abstract-item">
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * Defines a base class for custom item elements that complement the standard `paper-item`
 * component for various usage scenarios.
 */
export class SpineAbstractItem extends mixinBehaviors([
  IronButtonState,
  IronControlState
], PolymerElement) {
  _getAriaRole() {
    // see ARIA roles here: https://www.w3.org/TR/wai-aria-1.1/#role_definitions
    return 'option';
  }

  connectedCallback() {
    super.connectedCallback();
    this._ensureAttribute('tabindex', '0');
    this._ensureAttribute('role', this._getAriaRole());
  }
}

