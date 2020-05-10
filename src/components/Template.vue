<template>
  <div 
    :id="`template-${template.id}`"
    :class="{ active: isSelected(template.id), 'template': true }"
    @click="selectTemplate(template.id)"
    :key="template.id"
  >
    <div
      class="template template-body"
      :key="template.id"
      :template="template"
      :id="template.id"
      :hasform="template.hasForm"
      data-toggle="list"
    >
      <img class="language-logo" :src="template.img" alt="">
      <div class="template-data">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="language-name mb-1">{{ template.displayName }}</h5>
          <small class="template-reponame text-muted">{{ template.repoName }}</small>
        </div>
        <p class="mb-1 template-description">{{ template.description }}</p>
        <small class="text-muted template-author">{{ template.author }}</small>
      </div>
    </div>

    <b-form
      v-if="template.environment"
      :id="'next-form-'+ template.id"
      class="fnx-form"
      :class="{ 'fnx-form-hidden': !isSelected(template.id) }"
    >
      <div class="form-group" v-for="variable in template.environment" :key="variable.id">
        <label :for="variable.id">{{ variable.title }}</label>
        <input
          type="text"
          class="form-control"
          @input="variables[variable.id] = $event.target.value"
          :id="`form-control-${template.id}-${variable.id}`"
          :placeholder="variable.default || variable.title">
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
    ...mapState(['selectedTemplate'])
  },
  methods: {
    isSelected(id) {
      return this.selectedTemplate === id;
    },
    ...mapActions(['selectTemplate'])
  }
}
</script>

<style lang="scss">
.template {
    cursor: pointer;
    background-color: var(--template-bg);
    min-height: 100px;
    // max-height: 140px;
    padding: 1em;
    transition: all 0.3s;
    /* border: 1px solid red; */
}

.template.active {
    cursor: default;
    // height: auto;
    background-color: var(--template-bg-active) !important;
    color: #fff !important;
}

.template.active h5,
.template.active small,
.template.active p {
    cursor: inherit;
    background-color: inherit;
    color: inherit;
}


.template * {
    /* pointer-events: none; */
    color: var(--body-fg);
}

.template input {
    color: black;
}

.template:hover {
    background-color: var(--template-bg-hover);
    color: #fff !important;
}

.template:hover h5,
.template:hover small,
.template:hover p {
    background-color: inherit;
    color: inherit;
}

.language-logo {
    /* position: absolute; */
    /* left: 20px; */
    max-width: 20%;
    height: 80px;
    float: left;
    /* margin: 0 auto; */
}

.template-data {
    float: left;
    max-width: 80%;
}

.language-name {
    background-color: inherit;
    width: 100%;
    text-align: center !important;
}

.template-reponame {
    color: var(--body-fg) !important;
    width: 15em !important;
    float: right;
}

.template-description {
    /* width: 100%; */
    display: block;
    margin: 0 auto;
    // margin-right: 8em;
    text-align: center;
    max-width: 50%;

    /* border: 1px solid pink; */
}

.template-author {
    color: var(--body-fg) !important;
    /* width: 100%; */
    text-align: right !important;
    padding-right: 6em;
    float: right;
}

.template-data {
    width: 90%;
    float: right;
    /* border: 1px solid red; */
}

.template-body {
    // height: 100px;
    /* border: 1px solid #ddd; */
    /* border-radius: 5px; */
    /* padding: 5px; */
}

/* .template-body-active {
    height: auto;
} */

/* .template-body-active:hover {
    background-color: #7386D5;
    color: white !important;
} */



.fnx-template {
    transition: all 1s ease-in-out;
}

.fnx-form {
    transform: translate(0);
    transition: all 500ms;
    padding: 20px;
}

.fnx-form-hidden {
    z-index: -99;
    position: absolute;
    /* visibility: hidden; */
    opacity: 0;
    transform: translateY(-20%);
    opacity: 0;
}
</style>