/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import $ from 'jquery';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {
    // With more time this should be using a Queue
    $('[js-ajax-cart]').click((e) => {
      const elem = e.currentTarget;
      const { variantId, quantity } = elem.dataset;

      if (elem.classList.contains('adding')) {
        return;
      }

      // Redirect to cart if already added
      if (elem.classList.contains('added')) {
        window.location.href = '/cart';
        return;
      }

      elem.classList.add('adding');

      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: { id: variantId, quantity },
        success: () => {
          elem.innerText = 'Added to cart!';
          elem.classList.remove('adding');
          elem.classList.add('added');
        },
        error: () => {
          // handle error
        }
      });
    })
  },

  publicMethod() {
    // Custom public section method
  },

  _privateMethod() {
    // Custom private section method
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
