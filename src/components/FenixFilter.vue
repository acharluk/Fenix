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
  // background-color: var(--sidebar-bg);
  // color: var(--sidebar-fg);
  // width: 100%;

  &__btn {
    position: relative;
    background-color: inherit;
    color: inherit;
    width: 100%;
    border: 0;
    padding: 10px;

    text-align: left;
    font-size: larger;

    &:focus {
      outline: 0;
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
    opacity: 0;
    height: 0;
    padding: 0;

    &.show {
      opacity: 100%;
      height: auto;
    }

    & .filter-item {
      text-align: left;
      padding: .5rem;
      cursor: pointer;
      background-color: inherit;

      .filter-item-text {
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