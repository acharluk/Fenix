import Vue from 'vue'
import Vuex from 'vuex'

import WebConnector from '../connectors/web';
import VSCodeConnector from '../connectors/vscode';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    templates: [],
    repositories: [],
    repoFields: [
      'url',
      'delete'
    ],
    variables: {},
    selectedTemplate: null,
    selectedLanguage: null,
    selectedCategory: null,
    searchTerm: '',
    loading: true,
    connector: typeof (acquireVsCodeApi) !== 'undefined'
      ? new VSCodeConnector
      : new WebConnector,
  },
  mutations: {
    setTemplates(state, value) {
      state.templates = value;
    },
    setRepositories(state, value) {
      state.repositories = value;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setSelectedTemplate(state, value) {
      state.selectedTemplate = value;
    },
    setSearchTerm(state, value) {
      state.searchTerm = value;
    },
    setVariables(state, value) {
      state.variables = value;
    }
  },
  actions: {
    loadTemplates(context) {
      context.state.connector.loadTemplates((templateData) => {
        context.commit('setTemplates', templateData.templates);
        context.commit('setRepositories', templateData.repositories);
        context.commit('setLoading', false);
      });

      context.state.connector.postMessage({
        command: 'ready'
      });
    },
    selectTemplate(context, id) {
      context.commit('setSelectedTemplate', id);
    }
  },
  modules: {
  }
})
