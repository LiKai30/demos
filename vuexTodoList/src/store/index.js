import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    nextId: 5,
    // 默认按钮
    viewKey: 'all'
  },
  mutations: {
    // list接受真实的数据
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
    	state.inputValue = val
    },
    // 添加事项
    addItem (state) {
    	const obj = {
    		// 自己生成
    		id: state.nextId,
    		info: state.inputValue.trim(),
    		done: false
    	}
    	state.list.push(obj)
    	state.nextId++
    	state.inputValue = ''
    },
    removeItem (state, id) {
    	// 根据id查找对应索引
    	const i = state.list.findIndex(x => x.id === id)
    	if (i !== -1) {
    		state.list.splice(i, 1)
    	}
    },
    changeStatus (state, params) {
    	const i = state.list.findIndex(x => x.id === params.id)
    	if (i !== -1) {
    		state.list[i].done = params.status
    	}
    },
    cleanDone (state) {
    	state.list = state.list.filter(x => x.done === false)
    },
    // 修改按钮的关键字
    changeViewKey (state, key) {
    	state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
  	// 统计未完成的任务条数
  	unDone (state) {
  		return state.list.filter(x => x.done === false).length
  	},
  	infolist (state) {
  		if (state.viewKey === 'all') {
  			return state.list
  		}
  		if (state.viewKey === 'undone') {
  			return state.list.filter(x => !x.done)
  		}
  		if (state.viewKey === 'done') {
  			return state.list.filter(x => x.done)
  		}
  		return state.list
  	}
  },
  modules: {}
})
