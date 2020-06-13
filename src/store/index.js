import Vue from 'vue'
import Vuex from 'vuex'

import DummyConnector from '../connectors/dummy';
import VSCodeConnector from '../connectors/vscode';
import { FilterManager } from '../FilterManager';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    templates: [],
    repositories: [],
    variables: {},
    filterManager: new FilterManager([
      { name: 'Language', property: 'language' },
      { name: 'Category', property: 'category'},
      { name: 'Author', property: 'author'},
      { name: 'Repository', property: 'repoName'},
    ]),
    selectedTemplate: null,
    searchTerm: '',
    connector: typeof acquireVsCodeApi !== 'undefined'
      ? new VSCodeConnector
      : new DummyConnector,
  },
  mutations: {
    setTemplates(state, value) {
      state.templates = value;
      state.filterManager.setTemplates(value);
    },
    setRepositories(state, value) {
      state.repositories = value;
    },
    setSelectedTemplate(state, value) {
      state.selectedTemplate = value;
    },
    setSearchTerm(state, value) {
      state.searchTerm = value;
    },
    setVariables(state, value) {
      state.variables = value;
    },
    addValueToFilter(state, value) {
      state.filterManager.addValueToFilter(value.id, value.value);
    },
    setFilterState(state, value) {
      state.filterManager.toggleValueState(value.property, value.value);
    },
    clearFilters(state) {
      state.filterManager.clearValues();
    }
  },
  actions: {
    loadTemplates(context) {
      context.state.connector.loadTemplates((templateData) => {
        context.commit('setTemplates', templateData.templates);
        context.commit('clearFilters');
        templateData.templates.forEach((t) => {
          context.commit('addValueToFilter', { id: 'author', value: t.author });
          context.commit('addValueToFilter', { id: 'category', value: t.category });
          context.commit('addValueToFilter', { id: 'language', value: t.language });
          context.commit('addValueToFilter', { id: 'repoName', value: t.repoName });
        });
        context.commit('setRepositories', templateData.repositories);
      });

      context.state.connector.postMessage({
        command: 'ready'
      });
    },
    selectTemplate(context, id) {
      context.commit('setSelectedTemplate', id);
    },
    setFilterState(context, filter) {
      context.commit('setFilterState', filter);
    },
  },
  getters: {
    filteredTemplates(state) {
      const filteredTemplates = state.filterManager.getFilteredTemplates();
      let ret = [];

      for (let tmpl of filteredTemplates) {
        if (state.searchTerm.indexOf(tmpl.displayName)) {
          ret.push(tmpl);
        }
      }

      ret = ret.length > 0
            ? ret.sort((a, b) => a.displayName < b.displayName ? -1 : 1)
            : state.templates.sort((a, b) => a.displayName < b.displayName ? -1 : 1);

      if (state.searchTerm !== '') {
        ret = ret.filter((tmpl) => (
          tmpl.displayName.toLowerCase().includes(state.searchTerm.toLowerCase())
          || tmpl.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        ));
      }

      return ret;
    }
  },
  modules: {
  }
})
