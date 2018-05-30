/*
 * Copyright (c) 2000-2018 TeamDev. All rights reserved.
 * TeamDev PROPRIETARY and CONFIDENTIAL.
 * Use is subject to license terms.
 */

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { SpineAbstractItem } from './spine-abstract-item.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * `spine-separator-item` can be used inside `paper-listbox` among its children to separate them into
 * logical groups. It is a non-selectable item that displays a horizontal line whose style can be
 * customized.
 *
 * Here's a list of CSS variables that can be used for customizing `spine-separator-item`:
 *
 * Custom property                       | Description                                                              | Default
 * --------------------------------------|--------------------------------------------------------------------------|----------
 * `--spine-separator-item-vert-padding` | A distance from the separator line to the element's top and bottom edges | `8px`
 * `--spine-separator-item-line`         | A CSS border-like declaration that identifies the separator line's style, e.g. `1px dotted gray` | `1px solid var(--divider-color, rgba(0, 0, 0, var(--dark-divider-opacity, 0.12)))`
 *
 */
class SpineSeparatorItem extends SpineAbstractItem {
  static get template() {
    return html`
      <style>
        :host {
          @apply --layout-horizontal;
          @apply --layout-center;
        }
        .separator-line {
          width: 100%;
          height: 0;
          border-bottom: var(--spine-separator-item-line, 1px solid var(--divider-color, rgba(0, 0, 0, var(--dark-divider-opacity, 0.12))));
          margin-top: var(--spine-separator-item-vert-padding, 8px);
          margin-bottom: var(--spine-separator-item-vert-padding, 8px);
        }
      </style>
      
      <div class="separator-line"></div>
    `;
  }

  static get is() { return 'spine-separator-item'; }

  _getAriaRole() {
    return 'separator';
  }

  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute('tabindex');
    this.setAttribute('disabled', 'disabled');
  }
}

window.customElements.define(SpineSeparatorItem.is, SpineSeparatorItem);
