<template>
  <div id="app">
    <div id="fenix" class="wrapper" :class="[ getColors() ]">
      <div id="fenix-spinner" :class="{ spinnerVisible: loading }">
        <b-spinner></b-spinner>
      </div>

      <!-- Sidebar  -->
      <Sidebar :loading="loading" :languages="languages" :categories="categories" />

      <!-- Page Content  -->
      <div id="content" :class="{ filterVisible: loading }">
        <Topbar />

        <section id="section-templates">
          <Template v-for="template in filteredTemplates" :template="template" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Template from "./components/Template";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default {
  name: "App",
  components: {
    Template,
    Sidebar,
    Topbar
  },
  computed: {
    selectedTemplate: {
      get() {
        return this.$store.state.selectedTemplate;
      },
      set(value) {
        this.$store.commit("setSelectedTemplate", value);
      }
    },
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit("setSearchTerm", value);
      }
    },
    categories() {
      let categories = new Set();
      this.templates.forEach(t => {
        categories.add(...t.categories);
      });
      return categories;
    },
    languages() {
      let languages = new Set();
      this.templates.forEach(t => {
        if (typeof t.language === "string") {
          languages.add(t.language);
        } else {
          languages.add(...t.language);
        }
      });
      return languages;
    },
    environment() {
      if (this.selectedTemplate) {
        return this.templates.find(t => t.id == this.selectedTemplate)
          .environment;
      } else {
        return [];
      }
    },
    filteredTemplates() {
      const { selectedLanguage, selectedCategory, searchTerm } = this;
      let temp;
      if (!selectedLanguage && !selectedCategory) {
        temp = this.templates;
      } else {
        temp = this.templates.filter(
          t =>
            t.categories.includes(selectedCategory) ||
            t.language === selectedLanguage
        );
      }

      if (searchTerm) {
        temp = temp.filter(
          t =>
            t.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
            t.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
      }

      return temp;
    },
    ...mapState([
      "templates",
      "repositories",
      "repoFields",
      "variables",
      "selectedLanguage",
      "loading",
      "connector"
    ])
  },
  created() {
    this.loadTemplates();
  },
  methods: {
    getColors() {
      return typeof acquireVsCodeApi !== "undefined"
        ? "vscode_colors"
        : "web_colors";
    },
    ...mapActions(["loadTemplates", "selectTemplate"])
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

body .btn {
  /* TODO: Spinner is square! :( */
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
