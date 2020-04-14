<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my-list" :value="inputValue" @change="handleInput"/>
    <a-button type="primary" @click="addEvents">添加事项</a-button>
    <a-list bordered :dataSource="infolist" class="dt-list">
      <a-list-item slot='renderItem' slot-scope="item">
        <!-- 复选框 -->
        <!-- 是用立即执行函数实现勾选的改变 -->
        <a-checkbox :checked="item.done" @change="(e) => {cbStatusChange(e, item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除 -->
        <a slot='actions' @click="removeItemById(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDone}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changelist('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changelist('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changelist('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDone', 'infolist'])
  },
  methods: {
    // 监听input的变化事件
    handleInput (e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加事项
    addEvents () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    removeItemById (id) {
      console.log(id)
      this.$store.commit('removeItem', id)
    },
    // 完成状态的改变
    cbStatusChange (e, id) {
      // this.$store.
      // console.log(id)
      const params = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', params)
    },
    clean () {
      this.$store.commit('cleanDone')
    },
    // 根据不同的值改变type
    changelist (key) {
      this.$store.commit('changeViewKey', key)
    }
  }
}

</script>
<style scoped>
#app {
  padding: 10px;
}

.my-list {
  width: 500px;
  margin-right: 10px;
}

.dt-list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
