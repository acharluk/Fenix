<template>
  <div 
    :id="`template-${template.id}`"
    :class="[ 'template', { 'template--active': isSelected(template.id) }]"
    @click="selectTemplate(template.id)"
    @dblclick="runTemplate"
  >
    <div
      class="template__body"
      :key="template.id"
      :template="template"
      :id="template.id"
      :hasform="template.hasForm"
      data-toggle="list"
    >
      <img class="template__body-logo" :src="template.img" alt="">
      <div class="template__body-info">
        <div class="template__body-info-center">
          <h5 class="template__body-info-center-name">{{ template.displayName }}</h5>
          <p class="template__body-info-center-description">{{ template.description }}</p>
        </div>
        <div class="template__body-info-right">
          <small class="template__body-info-right-author">{{ template.author }}</small>
          <small class="template__body-info-right-reponame">{{ template.repoName }}</small>
        </div>
      </div>
    </div>

    <b-form
      v-if="template.environment"
      :id="'next-form-'+ template.id"
      class="template__form"
      :class="{ 'template__form--show': isSelected(template.id) }"
    >
      <div class="template__form-group" v-for="variable in template.environment" :key="variable.id">
        <label :for="variable.id">{{ variable.title }}</label>
        <input
          type="text"
          class="form-control template__form-input"
          @input="variables[variable.id] = $event.target.value"
          :id="`form-control-${template.id}-${variable.id}`"
          :placeholder="variable.default">
        <small id="emailHelp" class="form-text">{{ variable.description }}</small>
      </div>
    </b-form>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: ['template'],
  computed: {
    variables: {
      get() {
        return this.$store.state.variables;
      },
      set(value) {
        this.$store.commit('setVariables', value);
      }
    },
    ...mapState(['selectedTemplate', 'connector'])
  },
  methods: {
    isSelected(id) {
      return this.selectedTemplate === id;
    },
    runTemplate() {
      this.connector.runTemplate(this.selectedTemplate, this.variables);
    },
    ...mapActions(['selectTemplate'])
  }
}
</script>

<style lang="scss">
.template {
  cursor: pointer;
  min-height: 120px;
  background-color: var(--template-bg);
  color: var(--template-fg);
  transition: all 0.2s ease-in-out;

  &--active {
    cursor: default;
    background-color: var(--template-bg-active) !important;
    color: var(--template-fg-active);
    height: auto;
  }

  &:hover {
    z-index: 99;
    background: var(--template-bg-hover);
  }

  &__body {
    min-height: 120px;

    &-logo {
      float: left;
      height: 120px;
      min-width: 120px;
      max-width: 25%;
      padding: 12px;
    }

    &-info {
      user-select: none;
      display: flex;
      align-items: center;

      &-center {
        flex-grow: 2;
        text-align: center;
        padding: 0 2rem;

        &-name {
          color: var(--template-fg);
          padding: .5rem 0;
        }

        &-description {
          color: var(--template-fg);
          padding: .5rem 0;
        }
      }

      &-right {
        margin-right: 1rem;
        text-align: center;
        &-reponame {
          color: var(--template-fg);
          display: block;
          padding: .5rem 0;
        }

        &-author {
          color: var(--template-fg);
          display: block;
          padding: .5rem 0;
        }
      }      
    }
  }

  &__form {
    visibility: hidden;
    display: none;

    &--show {
      visibility: visible;
      display: block;
    }

    &-group {
      padding: 1rem;
    }

    &-input {
      border-radius: 0 !important;
    }
  }
}
</style>