<template>
  <div v-if="state.errMsg" style="color: red">{{ state.errMsg }}</div>
  <Suspense v-else>
    <template #default>
      <Async />
    </template>
    <template #fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
  <p>{{ state1 }}</p>
  //点击一下，变成4
  <button @click="add1">增加</button>

  <p>{{ state2 }}</p>
  //点击一下，还是3
  <button @click="add2">增加</button>
</template>

<script>
  import { ref, toRef, defineAsyncComponent, onErrorCaptured, reactive } from 'vue';
  const Async = defineAsyncComponent(() => import('@/components/Async.vue'));
  export default {
    components: {
      Async,
    },
    setup() {
      const obj = { count: 3 };
      const state1 = ref(obj.count); // look
      const state2 = toRef(obj, 'count'); // look
      const state = reactive({
        errMsg: null,
      });

      onErrorCaptured((e) => {
        state.errMsg = e.msg;
      });

      const add1 = () => {
        state1.value++;
        console.log('原始值：', obj); // 原始值：3
        console.log('响应式数据对象ref：', state1); // 响应式数据对象ref：4
      };

      const add2 = () => {
        state2.value++;
        console.log('原始值：', obj); // 原始值：4
        console.log('响应式数据对象toRef：', state2); // 响应式数据对象ref：4
      };

      return { state1, state2, add1, add2, state };
    },
  };
</script>

<style lang="scss" scoped></style>
