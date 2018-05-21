/*
  ~ Copyright (c) 2000-2018 TeamDev Ltd. All rights reserved.
  ~ TeamDev PROPRIETARY and CONFIDENTIAL.
  ~ Use is subject to license terms.
  */
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { SpineAbstractItem } from './spine-abstract-item.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
`spine-link-item` can be placed into `paper-listbox` to display an item that navigates to the
specified URL when it is clicked or tapped. Use the `href` attribute to specify the URL that should
be navigated to when this item is clicked or tapped.

Example:
```
<paper-listbox>
  <spine-link-item href="/settings">
    Settings
  </spine-link-item>
  <spine-link-item href="/settings/notifications">
    Notifications
  </spine-link-item>
  <spine-link-item href="/settings/security">
    Security
  </spine-link-item>
</paper-listbox>
```

Elements placed in `spine-link-item` are laid out with a horizontal flow layout by default.
You can change this using the `--spine-link-item-content-container` mixin.

The focused, selected and hovered states result in a `::before` pseudo element to be included, which
is laid out to fill the entire element under the `spine-link-item`'s content. You can use the
`--spine-link-item-hovered-before`, `--spine-link-item-selected-before`, and
`--spine-link-item-focused-before` CSS variables to highlight the background in these states. Note
that by default the background of the `::before` pseudo element is set to `currentColor` and
`opacity` attribute is used for setting the intensity of the background color.

Below is a list of CSS variables and mixins for customizing `spine-link-item`. A "background layer"
mentioned below refers to the `::before` pseudo element mentioned above.

Custom property                       | Description                                   | Default
--------------------------------------|-----------------------------------------------|----------
`--spine-link-item`                   | Mixin applied to `spine-link-item`            | `{}`
`--spine-link-item-content-container` | Mixin applied to the item's content container | `{}`
`--spine-link-item-min-height`        | Minimum height for the item                   | `48px`
`--spine-link-item-disabled`          | Mixin applied to the item when it is disabled | `{}`
`--spine-link-item-hovered`           | Mixin applied to the item when it is hovered  | `{}`
`--spine-link-item-hovered-before`    | Mixin for hovered item's background layer     | `{}`
`--spine-link-item-selected`          | Mixin applied to the item when it is selected | `{}`
`--spine-link-item-selected-before`   | Mixin for selected item's background layer    | `{}`
`--spine-link-item-focused`           | Mixin applied to the item when it is focused  | `{}`
`--spine-link-item-focused-before`    | Mixin for focused item's background layer     | `{}`
`--paper-font-subhead`                | Applied to the item by default                | `{}`
`--dark-divider-opacity`              | Default opacity of a focused background (applied to the background layer) | `0.12`
`--disabled-text-color`               | Default text color for a disabled item        | `{rgba(0, 0, 0, var(--dark-disabled-opacity, 0.38))}`

*/
class SpineLinkItem extends SpineAbstractItem {
  static get template() {
    return html`
    <style>
      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-subhead;

        padding: 0 16px;
        position: relative; /* needed for the absolutely-positioned ::after pseudo-element to be
                               displayed properly */
        min-height: var(--spine-link-item-min-height, 48px);
        cursor: pointer;

        @apply --spine-link-item;
      }
      :host([disabled]) {
        color: var(--disabled-text-color, rgba(0, 0, 0, var(--dark-disabled-opacity, 0.38)));

        @apply --spine-link-item-disabled;
      }
      :host(:hover) {
        @apply --spine-link-item-hovered;
      }
      :host(.iron-selected) {
        font-weight: var(--spine-link-item-selected-weight, bold);

        @apply --spine-link-item-selected;
      }
      :host(:focus) {
        outline: none;

        @apply --spine-link-item-focused;
      }

      :host(:hover)::before, :host(:focus)::before, :host(.iron-selected)::before {
        @apply --layout-fit;
        background: currentColor;
        pointer-events: none;
        content: '';
        opacity: 0;
      }
      :host(:hover)::before {
        @apply --spine-link-item-hovered-before;
      }
      :host(.iron-selected)::before {
        @apply --spine-link-item-selected-before;
      }
      :host(:focus)::before {
        opacity: var(--dark-divider-opacity, 0.12);

        @apply --spine-link-item-focused-before;
      }

      a {
        width: 0;
        height: 0;
        font-size: 0;
        pointer-events: none;
        flex: none;
      }
      a:focus {
        outline: none;
      }

      .content-container {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
        width: 100%;

        @apply --spine-link-item-content-container;
      }
    </style>

    <a tabindex="-1" href="[[href]]"></a>
    <!-- Having this content container element serves the purpose of ensuring that the ::before
         pseudo element that displays a selection/hover/focus layer is displayed under the content
         rather than over it. Displaying it over the content would make the custom white-colored (or
         other bright-colored) content to be dimmed when an item is highlighted during hover,
         selection, or focus when using background filled highlighting for these states. -->
    <div class="content-container"><slot></slot></div>
`;
  }

  static get is() { return 'spine-link-item'; }

  static get properties() {
    return {
      /**
       * A URL that should be opened when this item is selected.
       */
      href: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tap', this._handleTap);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tap', this._handleTap);
  }

  _handleTap(event) {
    if (this.__customEvent) {
      // dispatching `click` event manually below in this method is reintercepted as a `tap`
      // event by this element, so we're ignoring it here to avoid infinite recursion
      return;
    }
    const link = this.shadowRoot.querySelector('a');
    if (link === null) {
      return;
    }

    if (!window.ShadyDOM || !window.ShadyDOM.inUse) {
      link.click();
    } else {
      // Not invoking the `link.click()` as in a regular case above, since a `click` event
      // emitted by that call doesn't cross the shadow DOM boundary in Firefox (as of version
      // 59.0.3), presumably due to some ShadyDOM polyfill implementation specifics. This causes
      // problems when `iron-location` (or `app-location`) tries to prevent page reloads on link
      // clicks. Firing the `click` event manually solves this problem.
      this.__customEvent = new MouseEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true
      });
      try {
        link.dispatchEvent(this.__customEvent);
      } finally {
        this.__customEvent = null;
      }
    }
  }
}

window.customElements.define(SpineLinkItem.is, SpineLinkItem);
