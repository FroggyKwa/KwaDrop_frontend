<template>
  <div v-bind="attrsStyles">
    <slot name="prepend"></slot>
    <slot v-if="searchIcon" name="search-icon">
      <i class="search-icon search"></i>
    </slot>
    <slot name="prepend-inner"></slot>
    <label for="inputRef"><input
      ref="inputRef"
      type="search"
      data-search-input="true"
      :placeholder="placeholder"
      :data-shortcut-enabled="shortcutListenerEnabled"
      :value="modelValue"
      v-bind="attrsWithoutStyles"
      @input="onInput"
      @focus="hasFocus = true; $event.target.placeholder = 'Paste here url or type query...'"
      @blur="hasFocus = false; $event.target.placeholder = 'Click here to add music ...'"
      @keydown="onKeydown"
    /></label>
    <slot name="append"></slot>
    <slot v-if="showShortcutIcon" name="shortcut-icon">
      <i class="search-icon shortcut" title='Press "/" to search'></i>
    </slot>
    <slot name="clear-icon" :clear="clear">
      <button class="search-icon clear" aria-label="Clear" @mousedown="clear" @keydown.space.enter="clear"></button>
    </slot>
    <slot name="append-outer"></slot>
  </div>
</template>

<script lang="ts">
import {
  PropType, computed, defineComponent, onBeforeUnmount, ref, watch,
} from 'vue';
import { FieldType, fieldType } from './SearchInput.types';

const filterObject = (obj: { [key: string]: unknown }, properties: (string | number)[], remove = true) => {
  const res: { [key: string]: unknown } = {};

  Object.keys(obj).forEach((objAttr) => {
    const condition = remove ? properties.indexOf(objAttr) === -1 : properties.indexOf(objAttr) >= 0;

    if (condition) {
      res[objAttr] = obj[objAttr];
    }
  });

  return res;
};

const defaultBoolean = (val = true) => ({ type: Boolean, default: val });

export default defineComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<FieldType>,
      default: 'search',
      validator: (prop: FieldType) => fieldType.includes(prop),
    },
    placeholder:
      {
        type: String,
        default: 'Search...',
        validator: (prop: string) => prop !== '',
      },
    modelValue: {
      type: String,
      default: '',
    },
    wrapperClass: {
      type: String,
      default: 'search-input-wrapper',
    },
    searchIcon: defaultBoolean(),
    shortcutIcon: defaultBoolean(),
    clearIcon: defaultBoolean(),
    hideShortcutIconOnBlur: defaultBoolean(),
    clearOnEsc: defaultBoolean(),
    blurOnEsc: defaultBoolean(),
    selectOnFocus: defaultBoolean(),
    shortcutListenerEnabled: defaultBoolean(),
    shortcutKey: {
      type: String as PropType<KeyboardEvent['key']>,
      default: '/',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const hasFocus = ref(false);
    const inputRef = ref<null | HTMLInputElement>(null);

    const attrsWithoutStyles = computed(() => filterObject(attrs, ['class', 'style']));

    const attrsStyles = computed(() => {
      const res = filterObject(attrs, ['class', 'style'], false);

      if (!res.class) res.class = props.wrapperClass;

      return res;
    });

    const showClearIcon = computed(() => !!(props.clearIcon && props.modelValue.length > 0));

    const showShortcutIcon = computed(() => {
      if (props.shortcutIcon && !hasFocus.value && !props.hideShortcutIconOnBlur) return true;
      return !!(props.shortcutIcon && !hasFocus.value && props.modelValue.length === 0);
    });

    const clear = () => {
      emit('update:modelValue', '');
    };

    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // eslint-disable-next-line no-unused-expressions
        props.clearOnEsc && clear();
        if (props.blurOnEsc) {
          const el = inputRef.value as HTMLInputElement;

          el.blur();
        }
      }
    };

    const onDocumentKeydown = (e: KeyboardEvent) => {
      if (
        e.key === props.shortcutKey
        && e.target !== inputRef.value
        && window.document.activeElement !== inputRef.value && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLSelectElement) && !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        const allVisibleSearchInputs = [].slice
          .call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])'))
          .filter((el: HTMLElement) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : inputRef.value;

        elToFocus?.focus();
        if (props.selectOnFocus) elToFocus?.select();
      }
    };

    const removeDocumentKeydown = () => window.document.removeEventListener('keydown', onDocumentKeydown);

    watch(
      () => props.shortcutListenerEnabled,
      (nV) => {
        if (nV) {
          window.document.addEventListener('keydown', onDocumentKeydown);
        } else {
          removeDocumentKeydown();
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      removeDocumentKeydown();
    });

    return {
      inputRef,
      hasFocus,
      clear,
      onInput,
      onKeydown,
      attrsStyles,
      attrsWithoutStyles,
      showClearIcon,
      showShortcutIcon,
    };
  },
});
</script>

<style lang="sass">
@import "@/assets/css/variables.sass"
$input-background: lighten(#e0efe9, 20%)
$icon-color: darken($input-background, 30%)
$active-color: $light-green

.search-input-wrapper
  position: relative

  input[data-search-input='true']
    display: block
    font-family: 'Inter', system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
    width: 100%
    padding: 6px 30px 6px 32px
    font-size: 16px
    font-weight: normal
    height: 38px
    color: $font-color
    background-color: $input-background
    border: 1px solid $input-background
    border-radius: 0.35rem
    transition: border-color 0.15s ease-in-out
    &:focus
      background-color: lighten($input-background, 25%)
      border-color: $active-color
      outline: 0
      box-shadow: none

  .search-icon
    color: $icon-color
    position: absolute
    &.search
      left: 12px
      bottom: 12px
      box-sizing: border-box
      display: block
      width: 16px
      height: 16px
      border: 2px solid
      border-radius: 100%
      margin-left: -4px
      margin-top: -4px

    &.search::after
      content: ''
      display: block
      box-sizing: border-box
      position: absolute
      border-radius: 3px
      width: 2px
      height: 7px
      background: $icon-color
      transform: rotate(-45deg)
      top: 11px
      left: 12px

    &.shortcut
      width: 22px
      height: 24px
      cursor: text
      right: 8px
      bottom: 7px
      background-color: darken($input-background, 4%)
      border-radius: 3px
      z-index: 50

    &.shortcut::after
      content: ''
      display: block
      box-sizing: border-box
      position: absolute
      border-radius: 2px
      transform: rotate(25deg)
      width: 2px
      height: 16px
      top: 4px
      left: 10px
      z-index: 51
      background-color: lighten($icon-color, 5%)

    &.clear
      right: 5px
      bottom: 7px
      cursor: pointer
      z-index: 10
      box-sizing: border-box
      display: block
      width: 24px
      height: 24px
      border: 2px solid transparent
      border-radius: 40px
      background: none
      padding: 0
      outline: none
      &:focus
        background: darken($input-background, 4%)

    &.clear::after,
    &.clear::before
      content: ''
      display: block
      box-sizing: border-box
      position: absolute
      width: 16px
      height: 2px
      background: $icon-color
      transform: rotate(45deg)
      border-radius: 5px
      top: 9px
      left: 2px

    &.clear::after
      transform: rotate(-45deg)

/* Fix the X appearing in search field on Chrome and IE */
input[type='search']::-ms-clear
  display: none
  width: 0
  height: 0

input[type='search']::-ms-reveal
  display: none
  width: 0
  height: 0

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration
  display: none
</style>
