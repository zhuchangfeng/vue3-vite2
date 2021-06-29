<template>
  <img ref="root" alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <button type="button" class="btn btn-primary">
    我要激活
    <input name="file" type="file" accept=".png" @change="changfn" />
  </button>
  <router-view />
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  import { reactive, toRef, toRefs, ref, onMounted } from 'vue';
  import To from '@/utils/scroll-to';
  import { createAxios } from '@/utils/axios/index';
  export default {
    name: 'App',
    components: { HelloWorld },
    setup(props, context) {
      console.log(context);
      const root = ref(null);
      const value = ref('');
      const msg = ref('hello world!');
      const state = reactive({ count: 0 });
      const countRef = toRef(state, 'count');
      const state2 = reactive({ count2: 0 });
      const stateAsRefs = toRefs(state2);
      const increase = () => state.count++;
      const tell = (msg) => {
        console.log(msg);
      };
      onMounted(() => {
        console.log(root.value);
        new To(1000).scrollTo();
        for (let index = 0; index < 3; index++) {
          createAxios()
            .axiosInstance({
              url: '/upload/info',
            })
            .then((r) => {
              console.log(r);
            });
        }
      });
      const changfn = (e) => {
        console.log(e);
        const {
          target: { files },
        } = e;
        console.log(files);
      };
      return {
        count: countRef,
        increase,
        ...stateAsRefs,
        root,
        value,
        msg,
        tell,
        changfn,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    &.btn-primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      position: relative;
      &:focus,
      &:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
      }
      input[type='file'] {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        opacity: 0;
      }
    }
  }
</style>
