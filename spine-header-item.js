/*
 * Copyright (c) 2000-2018 TeamDev. All rights reserved.
 * TeamDev PROPRIETARY and CONFIDENTIAL.
 * Use is subject to license terms.
 */

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { SpineAbstractItem } from './spine-abstract-item.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * `spine-header-item` can be used inside `paper-listbox` among its children to display a
 * non-selectable item that will serve as a heading for the items that follow it in the list.
 * Similar to `paper-item`, you can place arbitrary content as its child nodes.
 *
 * Here's a list of CSS mixins that can be used for customizing `spine-header-item`:
 *
 * Custom property                  | Description                       | Default
 * ---------------------------------|-----------------------------------|--------
 * `--spine-header-item`            | Mixin applied to the element      | `{}`
 * `--spine-header-item-min-height` | Minimum height for the item       | `40px`
 * `--paper-font-body2`             | Applied to the element by default | `{}`
 * `--secondary-text-color`         | The default text color            | `rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54))`
 *
 */
class SpineHeaderItem extends SpineAbstractItem {
  static get template() {
    return html`
      <style>
        :host {
          @apply --layout-horizontal;
          @apply --layout-center;
  
          min-height: var(--spine-header-item-min-height, 40px);
          outline: none;
          padding: 0 16px;
  
          @apply --paper-font-body2;
          color: var(--secondary-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54)));
  
          @apply --spine-header-item;
        }
      </style>
  
      <slot></slot>
    `;
  }

  static get is() { return 'spine-header-item'; }

  _getAriaRole() {
    // as per recommendations here: https://www.w3.org/WAI/tutorials/menus/structure/#label-menus
    return 'heading';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("disabled", "disabled");
  }
}

window.customElements.define(SpineHeaderItem.is, SpineHeaderItem);
