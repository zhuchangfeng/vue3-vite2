<template>
  <p>{{ state1 }}</p>
  //点击一下，变成4
  <button @click="add1">增加</button>

  <p>{{ state2 }}</p>
  //点击一下，还是3
  <button @click="add2">增加</button>
</template>

<script>
  import { ref, toRef } from 'vue';
  export default {
    setup() {
      const obj = { count: 3 };
      const state1 = ref(obj.count); // look
      const state2 = toRef(obj, 'count'); // look

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

      return { state1, state2, add1, add2 };
    },
  };
</script>

<style lang="scss" scoped></style>
