<template>
  <div id="topbar">
    <!-- <b-button variant="warning" id="topbar__btn-settings">
      <font-awesome-icon :icon="['fas', 'cogs']"></font-awesome-icon>
      <span id="btn-create-text">Settings</span>
    </b-button> -->

    <b-button variant="success" id="btn-more-templates">
      <a href="https://github.com/acharluk/FenixDefaultTemplates" target="_blank">
        <font-awesome-icon :icon="['fas', 'plus-circle']"></font-awesome-icon>
        <span id="btn-create-text">&nbsp;More templates</span>
      </a>
    </b-button>

    <b-input-group id="topbar__search">
      <b-form-input class="search" v-model="searchTerm" placeholder="Search templates"></b-form-input>
    </b-input-group>

    <b-button variant="primary" :disabled="!selectedTemplate" id="topbar__btn-create" @click="runTemplate">
      <font-awesome-icon :icon="['fas', 'rocket']"></font-awesome-icon>
      <span id="btn-create-text">&nbsp;Create</span>
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit('setSearchTerm', value);
      }
    },
    ...mapState(['selectedTemplate', 'connector', 'variables'])
  },
  methods: {
    runTemplate() {
      this.connector.runTemplate(this.selectedTemplate, this.variables);
    },
  }
}
</script>

<style lang="scss">
#topbar {
    margin-bottom: 20px;
    display: flex;
}

#topbar>* {
    margin: 0 5px;
}

#topbar__search {
    flex-grow: 4;
    flex-shrink: 3;
    flex-basis: 20%;
    align-self: center;
}

#topbar__btn-create {
    transition: opacity 150ms ease-in-out;
}

#topbar__btn-create.disabled {
    cursor: not-allowed;
    opacity: 0.3;
}

#btn-more-templates a {
  color: var(--body-fg);
  text-decoration: none;
}
</style>