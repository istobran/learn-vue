<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p><input type="text" v-model="newItem" v-on:keyup.enter="addItem" placeholder="添加新的Todo.."></p>
    <p><input type="text" v-model="query" placeholder="请输入需要搜索的内容..."></p>
    <ul>
      <li v-for="item in items | filterBy query" track-by="_uuid" transition="expand" stagger="100">
        <span v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinishState(item)">{{ item.label }}</span>
        <button type="button" v-on:click="removeItem(item)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './store';
import IdGenerator from './uuid';

export default {
  data: function () {   // 为什么要写成函数？参考：https://vuejs.org.cn/guide/components.html#组件选项问题
    return {
      title: 'Perfect todolist',
      newItem: '',
      query: '',
      items: Store.fetch()    // fetch() 方法仅在初始化时调用一次
      // items: [
      //   {label: 'doing work', isFinished: false},
      //   {label: 'finished work', isFinished: true}
      // ]
    };
  },
  methods: {
    addItem: function () {
      var text = this.newItem.trim();
      if (text) {
        this.items.push({
          _uuid: IdGenerator.uuid(8, 16),
          label: text,
          isFinished: false
        });
        this.newItem = '';
      }
    },
    removeItem: function (item) {
      this.items.$remove(item);
    },
    toggleFinishState: function (item) {
      item.isFinished = !item.isFinished;
    }
  },
  watch: {
    'items': {      // 深度 watch
      handler: function (val) {
        Store.save(val);
      },
      deep: true
    }
  }
  // computed: {     // 在这里不能使用计算属性，因为依赖的不是此vm实例上的数据
  //   items: function () {
  //     Store.fetch();
  //   }
  // }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}

.finished {
  text-decoration: line-through;
}

/* 必需 */
.expand-transition {
  transition: all .3s ease;
  height: 15px;
  padding: 10px;
  overflow: hidden;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
</style>
