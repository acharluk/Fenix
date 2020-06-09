<template>
  <li
    :id="`filter-${filter.name}`"
    class="filter"
  >
    <button
      class="filter__btn"
      @click="changeShow"
    >
      {{ filter.name }}

    <font-awesome-icon :icon="['fas', 'caret-down']" class="filter__btn-icon"></font-awesome-icon>
    </button>

    <ul
      :class="[ 'filter-list', { show: show } ]"
    >
      <li
        v-for="value in filter.values"
        :class="[ 'filter-item', { 'filter-item-active': filter.getValueState(value) } ]"
        :key="value"
        @click="setFilterState({ property: filter.property, value })"
      >
        <span class="filter-item-text">{{ value }}</span>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['filter'],
  data: () => ({
    show: true,
  }),
  methods: {
    changeShow() {
      this.show = !this.show;
    },
    ...mapActions(['setFilterState']),
  }
}
</script>

<style lang="scss" scoped>
.filter {
  &__btn {
    position: relative;
    background-color: inherit;
    color: var(--sidebar-fg);
    width: 100%;
    border: 0;
    padding: 10px;

    text-align: left;
    font-size: larger;

    &:focus {
      outline: 0;
    }

    &:active {
      background: var(--sidebar-focus-bg) !important;
    }

    &:hover {
      background-color: var(--sidebar-bg-hover);
      color: var(--sidebar-fg-hover);
    }

    &-icon {
      right: 1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .filter-list {
    list-style: none;
    background-color: inherit;
    color: inherit;
    opacity: 0;
    height: 0;
    display: none;
    padding: 0;
    overflow: auto;
    max-height: 20%;

    &.show {
      display: block;
      opacity: 1;
      height: auto;
    }

    & .filter-item {
      text-align: left;
      padding: .5rem;
      cursor: pointer;
      background-color: inherit;

      &:active {
        background: var(--sidebar-click-bg) !important;
      }

      .filter-item-text {
        color: var(--sidebar-fg);
        padding-left: 1.5rem;
      }

      &.filter-item-active {
        background: var(--sidebar-active-bg);
        color: var(--sidebar-active-fg);
      }

      &:hover {
        background-color: var(--sidebar-bg-hover);
        color: var(--sidebar-fg-hover);
      }
    }
  }
}
</style>