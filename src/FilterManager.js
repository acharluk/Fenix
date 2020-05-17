class FilterManager {
  constructor(filters) {
    this.templates = [];
    this.filters = filters.map(filter => new Filter(filter.name, filter.property));
  }

  setTemplates(templates) {
    this.templates = templates;
  }

  getFilterNames() {
    return this.filters.map(f => f.name);
  }

  getFilters() {
    return this.filters;
  }

  addValueToFilter(property, value) {
    this.filters.find(f => f.property === property).loadValue(value);
  }

  isValueActive(property, value) {
    this.filters.find(f => f.property === property).getValueState(value);
  }

  toggleValueState(property, value) {
    this.filters.find(f => f.property === property).toggleValueState(value);
  }

  getFilteredTemplates() {
    const filtered = [];
    
    this.filters.forEach(filter => {
      filtered.push(...filter.getFilteredTemplates(this.templates));
    });

    return new Set(filtered);
  }

  clearActive() {
    this.filters.forEach(filter => {
      filter.activeValues = [];
    });
  }
}

class Filter {
  constructor(name, property) {
    this.name = name;
    this.property = property;
    this.values = [];
    this.activeValues = [];
  }

  loadValue(value) {
    if (typeof value === 'string') {
      if (!this.values.includes(value)) {
        this.values.push(value);
      }
    } else {
      for (let v of value) {
        if (!this.values.includes(v)) {
          this.values.push(v);
        }
      }
    }
  }

  getValueState(value) {
    return this.activeValues.includes(value);
  }

  toggleValueState(value) {
    const index = this.activeValues.indexOf(value);

    if (index > -1) {
      this.activeValues.splice(index, 1);
    } else {
      this.activeValues.push(value);
    }
  }

  getFilteredTemplates(templates) {
    const filteredTemplates = [];
    
    for (const tmpl of templates) {
      if (typeof tmpl[this.property] === 'string') {
        if (this.activeValues.includes(tmpl[this.property])) {
          filteredTemplates.push(tmpl);
        }
      } else {
        for (const cat of tmpl.category) {
          if (this.activeValues.includes(cat)) {
            filteredTemplates.push(tmpl);
          }
        }
      }
    }

    return filteredTemplates;
  }
}

export { FilterManager };