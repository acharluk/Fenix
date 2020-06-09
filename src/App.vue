<template>
  <div id="app">
    <div id="fenix" class="wrapper" :class="[ getColors() ]">
      <Sidebar />

      <div id="content">
        <Topbar />

        <section id="section-templates">
          <FenixTemplate
            v-for="template in filteredTemplates"
            :key="template.id"
            :template="template"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import FenixTemplate from './components/FenixTemplate';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

export default {
  name: 'App',
  components: {
    FenixTemplate,
    Sidebar,
    Topbar
  },
  computed: {
    selectedTemplate: {
      get() {
        return this.$store.state.selectedTemplate;
      },
      set(value) {
        this.$store.commit('setSelectedTemplate', value);
      }
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit('setSearchTerm', value);
      }
    },
    environment() {
      if (this.selectedTemplate) {
        return this.templates.find(t => t.id == this.selectedTemplate)
          .environment;
      } else {
        return [];
      }
    },
    
    ...mapState([
      'templates',
      'repositories',
      'repoFields',
      'variables',
      'selectedLanguage',
      'loading',
      'connector',
    ]),
    ...mapGetters(['filteredTemplates'])
  },
  created() {
    this.loadTemplates();
  },
  methods: {
    getColors() {
      return typeof acquireVsCodeApi !== 'undefined'
        ? 'vscode_colors'
        : 'web_colors';
    },
    ...mapActions(['loadTemplates', 'selectTemplate'])
  }
};
</script>

<style lang="scss">
@import "./assets/styles/web.scss";
@import "./assets/styles/vscode.scss";

font-awesome-icon {
  display: block;
  padding: 20px;
}

body {
  font-family: "Poppins", sans-serif;
  background: var(--body-bg);
  color: var(--body-fg);
  padding: 0;
  overflow: hidden;
  margin: 0;
}

body .btn,
#topbar__search .search {
  border-radius: 0px !important;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: var(--body-fg);
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  background-color: var(--body-bg);
  color: var(body-fg);
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    FENIX
----------------------------------------------------- */

/* TEMPLATES */

#section-templates {
  overflow: scroll;
  overflow-x: hidden;
  height: 90vh;
}

#fenix-spinner {
  visibility: hidden;
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  text-align: center;
}

#fenix-spinner > * {
  margin: 0 auto;
}

.spinnerVisible {
  visibility: visible !important;
}

.filterVisible {
  filter: blur(10px);
}
</style>
