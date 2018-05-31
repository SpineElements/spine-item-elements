/*
 * Copyright (c) 2000-2018 TeamDev. All rights reserved.
 * TeamDev PROPRIETARY and CONFIDENTIAL.
 * Use is subject to license terms.
 */

import '@polymer/polymer/polymer-legacy.js';

import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * `spine-item-body` can be placed into `paper-item` and `spine-link-item` to set up a typical item
 *  layout, where you can specify a multi line content as well as custom content on item's sides
 *  (typically displaying items).
 *
 *  A component has two slots:
 *  - `before`: can be used to place a custom content in a left side of the item;
 *  - `after`: can be used to place a custom content in a right side of the item.
 *
 *  Child nodes placed into `spine-item-body` are laid out with a vertical flex layout. It can be
 *  configured using the `--spine-item-body-main-cell` CSS mixin. Specifying a `secondary` attribute for
 *  any of the child elements will apply the "secondary" text style (having a gray color by default) to
 *  them.
 *
 *  Nodes placed into the `before` and `after` slots are laid out with a centered horizontal flex layout
 *  by default, which can be changed using the `--spine-item-body-before-cell` and
 *  `--spine-item-body-after-cell` CSS mixins.
 *
 *  Example:
 *  ```
 *  <paper-listbox>
 *    <paper-item on-tap="handleCreateItemTap">
 *      <spine-item-body>
 *        <iron-icon slot="before" icon="custom:create_item"></iron-icon>
 *        Create item...
 *      <spine-item-body>
 *    </paper-item>
 *
 *    <spine-link-item href="/settings">
 *      <spine-item-body>
 *        <iron-icon slot="before" icon="custom:settings"></iron-icon>
 *        <div>Settings</div>
 *        <div secondary>Displays general settings</div>
 *      </spine-item-body>
 *    </spine-link-item>
 *
 *    <spine-link-item href="/notifications">
 *      <spine-item-body>
 *        <iron-icon slot="before" icon="custom:notifications"></iron-icon>
 *        <div>Notifications</div>
 *        <div slot="after">
 *          [[noOfNotifications]]
 *        </div>
 *      </spine-item-body>
 *    </spine-link-item>
 *  </paper-listbox>
 *  ```
 *
 *  Here's a list of CSS mixins that can be used for customizing `spine-item-body`:
 *
 *  Custom property                 | Description                                               | Default
 *  --------------------------------|-----------------------------------------------------------|----------
 *  `--spine-item-body-main-cell`   | Mixin applied to a cell that contains the the elements placed into `spine-item-body` | `{}`
 *  `--spine-item-body-before-cell` | Mixin applied to a cell that contains the `before` slot   | `{}`
 *  `--spine-item-body-after-cell`  | Mixin applied to a cell that contains the `after` slot    | `{}`
 *  `--spine-item-body-secondary`   | Mixin applied to child nodes with a `secondary` attribute | `{}`
 *  `--paper-font-body1`            | Style applied to secondary element(s) by default          | `{}`
 *  `--secondary-text-color`        | Text color set for secondary element(s) by default        | `rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54))`
 *
 */
class SpineItemBody extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          @apply --layout-flex-auto;
          @apply --layout-self-stretch;
      
          @apply --layout-horizontal;
          @apply --layout-center;
      
          color: inherit;
          text-decoration: inherit;
          min-width: 0;
        }
      
        .before-cell, .after-cell {
          flex: none;
      
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-center-justified;
        }
        .before-cell {
          @apply --spine-item-body-before-cell;
        }
        .after-cell {
          @apply --spine-item-body-after-cell;
        }
      
        .main-cell {
          @apply --layout-flex-auto;
      
          @apply --layout-center-justified;
          @apply --layout-vertical;
          min-width: 0;
          align-items: stretch;
      
          @apply --spine-item-body-main-cell;
        }
      
        :host > div > ::slotted([secondary]) {
          @apply --paper-font-body1;
          color: var(--secondary-text-color, rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54)));
      
          @apply --spine-item-body-secondary;
          text-overflow: ellipsis;
        }
      </style>
      
      <div class="before-cell"><slot name="before"></slot></div>
      <div class="main-cell"><slot></slot></div>
      <div class="after-cell"><slot name="after"></slot></div>
    `;
  }

  static get is() { return 'spine-item-body'; }
}

window.customElements.define(SpineItemBody.is, SpineItemBody);
