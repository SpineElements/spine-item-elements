# Spine Item Elements

A set of custom special purpose item elements that can be used inside `paper-listbox` on a par with 
`paper-item`. Here is a list of elements in this package:
- `spine-header-item` — an unselectable item with a configurable style which can be used as a 
  header in menu-like list boxes.
- `spine-link-item` — similar to `paper-item`, but it navigates to the specified URL when tapped
  or clicked.
- `spine-separator-item` — an unselectable item that displays a horizontal line, which can be used
  to visually separate groups of items in `paper-listbox`.
- `spine-item-body` — can be placed inside of `paper-item` or `sping-link-item` to display a 
  typical menu/list item layout with optional left and right cells (where item icons are typically 
  displayed) and a number of content lines.
  
Below is a documentation on each of these elements.

## `spine-header-item`

`spine-header-item` can be used inside `paper-listbox` among its children to display a
non-selectable item that will serve as a heading for the items that follow it in the list.
Similar to `paper-item`, you can place arbitrary content as its child nodes.

Here's a list of CSS mixins that can be used for customizing `spine-header-item`:

Custom property                  | Description                       | Default
---------------------------------|-----------------------------------|--------
`--spine-header-item`            | Mixin applied to the element      | `{}`
`--spine-header-item-min-height` | Minimum height for the item       | `40px`
`--paper-font-body2`             | Applied to the element by default | `{}`
`--secondary-text-color`         | The default text color            | `rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54))`

## `spine-link-item`

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

## `spine-separator-item`

`spine-separator-item` can be used inside `paper-listbox` among its children to separate them into
logical groups. It is a non-selectable item that displays a horizontal line whose style can be
customized.

Here's a list of CSS variables that can be used for customizing `spine-separator-item`:

Custom property                       | Description                                                              | Default
--------------------------------------|--------------------------------------------------------------------------|----------
`--spine-separator-item-vert-padding` | A distance from the separator line to the element's top and bottom edges | `8px`
`--spine-separator-item-line`         | A CSS border-like declaration that identifies the separator line's style, e.g. `1px dotted gray` | `1px solid var(--divider-color, rgba(0, 0, 0, var(--dark-divider-opacity, 0.12)))`

## `spine-item-body`

`spine-item-body` can be placed into `paper-item` and `spine-link-item` to set up a typical item
layout, where you can specify a multi line content as well as custom content on item's sides
(typically displaying items).

A component has two slots:
- `before`: can be used to place a custom content in a left side of the item;
- `after`: can be used to place a custom content in a right side of the item.

You can place several child elements, which will distribute them vertically inside an item's area.
Specifying a `secondary` attribute for any of these elements will apply the "secondary" text style
(having a gray color by default) to the respective element.

Example:
```
<paper-listbox>
  <paper-item on-tap="handleCreateItemTap">
    <spine-item-body>
      <iron-icon slot="before" icon="custom:create_item"></iron-icon>
      Create item...
    <spine-item-body>
  </paper-item>

  <spine-link-item href="/settings">
    <spine-item-body>
      <iron-icon slot="before" icon="custom:settings"></iron-icon>
      <div>Settings</div>
      <div secondary>Displays general settings</div>
    </spine-item-body>
  </spine-link-item>

  <spine-link-item href="/notifications">
    <spine-item-body>
      <iron-icon slot="before" icon="custom:notifications"></iron-icon>
      <div>Notifications</div>
      <div slot="after">
        [[noOfNotifications]]
      </div>
    </spine-item-body>
  </spine-link-item>
</paper-listbox>
```

Here's a list of CSS mixins that can be used for customizing `spine-item-body`:

Custom property                 | Description                                             | Default
--------------------------------|---------------------------------------------------------|----------
`--spine-item-body-main-cell`   | Mixin applied to a cell that contains the the elements placed into `spine-item-body` | `{}`
`--spine-item-body-before-cell` | Mixin applied to a cell that contains the `before` slot | `{}`
`--spine-item-body-after-cell`  | Mixin applied to a cell that contains the `after` slot  | `{}`
`--paper-font-body1`            | Style applied to the secondary element(s) by default    | `{}`
`--secondary-text-color`        | Text color set for secondary element(s) by default      | `rgba(0, 0, 0, var(--dark-secondary-opacity, 0.54))`

# License

Apache License

Version 2.0, January 2004
