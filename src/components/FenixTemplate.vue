<template>
  <div 
    :id="`template-${template.id}`"
    :class="[ 'template', { 'template--active': isSelected(template.id) }]"
    @click="selectTemplate(template.id)"
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
          <!-- class="d-flex w-100 justify-content-between" -->
          <h5 class="template__body-info-center-name">{{ template.displayName }}</h5>
          <!-- <br> -->
          <p class="template__body-info-center-description">{{ template.description }}</p>
        </div>
        <div class="template__body-info-right">
          <small class="template__body-info-right-author">{{ template.author }}</small>
          <!-- <br> -->
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
  // border: 1px solid yellow;
  cursor: pointer;
  min-height: 120px;
  background-color: var(--template-bg);
  color: var(--template-fg);
  transition: all 0.2s ease-in-out;

  // box-shadow: inset 0 0 10px 0px rgba(255, 255, 255, 0.404);

  &--active {
    cursor: default;
    background-color: var(--template-bg-active) !important;
    color: var(--template-fg-active);
    height: auto;
    // box-shadow: inset 0 -10px 50px 2px rgba(255, 255, 255, 0.384);
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

// .template {
//     cursor: pointer;
//     background-color: var(--template-bg);
//     min-height: 100px;
//     // max-height: 140px;
//     padding: 1em;
//     transition: all 0.3s;
//     /* border: 1px solid red; */
// }

// .template.active {
//     cursor: default;
//     background-color: var(--template-bg-active) !important;
//     color: #fff !important;
// }

// .template.active h5,
// .template.active small,
// .template.active p {
//     cursor: inherit;
//     background-color: inherit;
//     color: inherit;
// }


// .template * {
//     /* pointer-events: none; */
//     color: var(--body-fg);
// }

// .template input {
//     color: black;
// }

// .template:hover {
//     background-color: var(--template-bg-hover);
//     color: #fff !important;
// }

// .template:hover h5,
// .template:hover small,
// .template:hover p {
//     background-color: inherit;
//     color: inherit;
// }

// .language-logo {
//     /* position: absolute; */
//     /* left: 20px; */
//     max-width: 20%;
//     height: 80px;
//     float: left;
//     /* margin: 0 auto; */
// }

// .template-data {
//     float: left;
//     max-width: 80%;
// }

// .language-name {
//     background-color: inherit;
//     width: 100%;
//     text-align: center !important;
// }

// .template-reponame {
//     color: var(--body-fg) !important;
//     width: 15em !important;
//     float: right;
// }

// .template-description {
//     /* width: 100%; */
//     display: block;
//     margin: 0 auto;
//     // margin-right: 8em;
//     text-align: center;
//     max-width: 50%;

//     /* border: 1px solid pink; */
// }

// .template-author {
//     color: var(--body-fg) !important;
//     /* width: 100%; */
//     text-align: right !important;
//     padding-right: 6em;
//     float: right;
// }

// .template-data {
//     width: 90%;
//     float: right;
//     /* border: 1px solid red; */
// }

// .template-body {
//     // height: 100px;
//     /* border: 1px solid #ddd; */
//     /* border-radius: 5px; */
//     /* padding: 5px; */
// }

// /* .template-body-active {
//     height: auto;
// } */

// /* .template-body-active:hover {
//     background-color: #7386D5;
//     color: white !important;
// } */



// .fnx-template {
//     transition: all 1s ease-in-out;
// }

// .fnx-form {
//     transform: translate(0);
//     transition: all 500ms;
//     padding: 20px;
// }

// .fnx-form-hidden {
//     z-index: -99;
//     position: absolute;
//     /* visibility: hidden; */
//     opacity: 0;
//     transform: translateY(-20%);
//     opacity: 0;
// }
</style>