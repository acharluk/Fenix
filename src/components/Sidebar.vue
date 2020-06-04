<template>
  <nav class="sidebar">
    <div class="sidebar__header">
      <img
        src="logo.png"
        alt="Fenix Logo"
        class="sidebar__header-logo"
      />
      <h3 class="sidebar__header-branding">
        Fenix
        <small class="sidebar__header-branding--small">
          ({{ connector.getName() }})
        </small>
      </h3>
    </div>

    <ul class="sidebar__filter_list">
      <FenixFilter
        class="sidebar__filter_list-filter"
        v-for="filter in filterManager.getFilters()"
        :key="filter.property"
        :filter="filter"
      />
    </ul>

    <ul class="sidebar__button_list">
      <li>
        <b-button
          class="sidebar__button_list-button"
          @click="removeFilters"
          variant="danger"
        >Clear filters</b-button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import FenixFilter from '@/components/FenixFilter.vue';

export default {
  props: ["loading", "languages", "categories"],
  components: {
    FenixFilter,
  },
  computed: mapState([
    'connector',
    'filterManager'
  ]),
  methods: {
    removeFilters() { 
      this.filterManager.clearActive();
      this.$store.commit('setSearchTerm', '');
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  min-width: 250px;
  max-width: 250px;
  background: var(--sidebar-bg);
  color: var(--sidebar-fg);
  transition: all 0.3s;
  position: relative;
  height: 100vh;

  display: flex;
  flex-direction: column;

  &__header {
    display: block;
    padding: 20px;

    &-logo {
      width: 60px;
      float: left;
    }

    &-branding {
      margin-top: .75rem;
      margin-left: 4.5rem;

      &--small {
        font-size: small;
      }
    }
  }

  &__filter_list {
    list-style-type: none;
    padding: 0;
    overflow: auto;
    flex-grow: 1;

    &-filter {
      &--active {
        color: #7386D5 !important;
        background: #eee;
      }
    }
  }

  &__button_list {
    list-style-type: none;
    padding: 0;
    text-align: center;

    &::before {
      content: '';
      display: block;
      height: 5px;
      background-color: var(--sidebar-separator);
      width: 100%;
      transform: translateY(-1rem);
    }
  }
}

@media (max-width: 768px) {
    .sidebar {
        margin-left: -250px;
    }
}
</style>