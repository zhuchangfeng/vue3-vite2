<template>
  <img ref="root" alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <router-view />
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  import { reactive, toRef, toRefs, ref, onMounted } from 'vue';
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
      });
      return {
        count: countRef,
        increase,
        ...stateAsRefs,
        root,
        value,
        msg,
        tell,
      };
    },
  };
</script>
