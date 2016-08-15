const STORAGE_KEY = 'todos-vuejs';
export default {
  fetch: function () {
    return JSON.parse(window.localStorage[STORAGE_KEY] || '[]');
  },
  save: function (items) {
    window.localStorage[STORAGE_KEY] = JSON.stringify(items);
  }
}
