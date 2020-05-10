<template>
  <nav id="sidebar" v-bind:class="{ filterVisible: loading }">
    <div class="sidebar-header">
      <img
        src="http://fenix.acharluk.xyz/logo.png"
        alt="Fenix Logo"
        style="float: left;"
        width="60px"
      />
      <h3 style="margin-top: 15px;">
        Fenix
        <small style="font-size: small;">({{ connector.getName() }})</small>
      </h3>
    </div>

    <ul class="list-unstyled components">
      <!-- <p>Filters</p> -->
      <li class="fenix-filter">
        <a
          href="#homeSubmenu"
          data-toggle="collapse"
          aria-expanded="true"
          class="dropdown-toggle"
        >Language</a>
        <ul class="list-unstyled show" id="homeSubmenu">
          <li v-for="language in languages" :key="language">
            <a href="#" class="fnx-language" @click="filterByLanguage(language)">{{ language }}</a>
          </li>
        </ul>
      </li>
      <li class="fenix-filter">
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="true"
          class="dropdown-toggle"
        >Category</a>
        <ul class="list-unstyled show" id="pageSubmenu">
          <li v-for="category in categories" :key="category">
            <a href="#" class="fnx-category" @click="filterByCategory(category)">{{ category }}</a>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="list-unstyled CTAs">
      <li>
        <b-button
          @click="removeFilters"
          variant="danger"
          id="fnx-btn-clear-filter"
        >Clear filters</b-button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ["loading", "languages", "categories"],
  computed: mapState(["connector"]),
  methods: {
    filterByLanguage(language) {
      this.selectedLanguage = language;
    },
    filterByCategory(category) {
      this.selectedCategory = category;
    },
    removeFilters() {
      this.selectedLanguage = null;
      this.selectedCategory = null;
    }
  }
};
</script>

<style lang="scss">
@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: var(--sidebar-bg);
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: var(--sidebar-header-bg);
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul li ul {
  max-height: 40%;
  overflow-y: auto;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: var(--sidebar-bg);
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: var(--sidebar-element-bg);
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  color: var(--body-fg);
  text-decoration: none !important;
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: var(--sidebar-element-bg);
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: var(--sidebar-fg);
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.filter-active {
    color: #7386D5 !important;
    background: #eee;
}

</style>