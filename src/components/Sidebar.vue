<template>
  <nav class="sidebar">
    <div class="sidebar__header">
      <img
        src="http://fenix.acharluk.xyz/logo.png"
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
  color: #fff;
  transition: all 0.3s;

  &__header {
    padding: 20px;

    &-logo {
      width: 60px;
      float: left;
    }

    &-branding {
      margin-top: .75rem;

      &--small {
        font-size: small;
      }
    }
  }

  &__filter_list {
    list-style-type: none;
    padding: 0;

    &-filter {
      &--active {
        color: #7386D5 !important;
        background: #eee;
      }
    }

    &::after {
      content: '';
      display: block;
      height: 5px;
      background-color: var(--sidebar-separator);
    }
  }

  &__button_list {
    list-style-type: none;
    padding: 0;
    text-align: center;
  }
}


@media (max-width: 768px) {
    .sidebar {
        margin-left: -250px;
    }
    // .sidebar.active {
    //     margin-left: 0;
    // }
    // .sidebarCollapse span {
    //     display: none;
    // }
}

// #sidebar.active {
//   margin-left: -250px;
// }

// #sidebar ul.filters {
//   padding: 20px 0;
//   border-bottom: 1px solid var(--sidebar-separator);
// }

// #sidebar ul li ul {
//   max-height: 40%;
//   overflow-y: auto;
// }

// #sidebar ul p {
//   color: #fff;
//   padding: 10px;
// }

// #sidebar ul li a {
//   padding: 10px;
//   font-size: 1.1em;
//   display: block;
// }

// #sidebar ul li a:hover {
//   color: var(--sidebar-bg);
//   background: #fff;
// }

// #sidebar ul li.active > a,
// a[aria-expanded="true"] {
//   color: #fff;
//   background: var(--sidebar-element-bg);
// }

// a[data-toggle="collapse"] {
//   position: relative;
// }

// .dropdown-toggle::after {
//   display: block;
//   position: absolute;
//   top: 50%;
//   right: 20px;
//   transform: translateY(-50%);
// }

// ul ul a {
//   color: var(--body-fg);
//   text-decoration: none !important;
//   font-size: 0.9em !important;
//   padding-left: 30px !important;
//   background: var(--sidebar-element-bg);
// }

// ul.CTAs {
//   padding: 20px;
// }

// ul.CTAs a {
//   text-align: center;
//   font-size: 0.9em !important;
//   display: block;
//   border-radius: 5px;
//   margin-bottom: 5px;
// }

// a.download {
//   background: #fff;
//   color: var(--sidebar-fg);
// }

// a.article,
// a.article:hover {
//   background: #6d7fcc !important;
//   color: #fff !important;
// }

// a,
// a:hover,
// a:focus {
//     color: inherit;
//     text-decoration: none;
//     transition: all 0.3s;
// }


</style>