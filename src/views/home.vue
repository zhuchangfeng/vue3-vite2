<template>
  <img ref="root" alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  {{ felix }}
  {{ home }}
  {{ query }}
  <button @click="changvalue">22222</button>
  {{ count2 }}
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  import { reactive, toRef, toRefs, ref, onMounted, unref, isRef } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  export default {
    name: 'App',
    components: {
      HelloWorld,
    },
    setup() {
      console.log('111');
      const root = ref(null);
      const route = useRoute();
      const router = useRouter();
      const store = useStore();
      const home = store.state.home;
      let msg = ref('hello world!');
      let state = reactive({ count: 0 });
      let countRef = toRef(state, 'count');
      console.log(unref(countRef), 'ww');
      console.log(isRef(countRef), '222222');
      let state2 = reactive({ count2: 0 });
      let stateAsRefs = toRefs(state2);
      let felix = reactive(store.getters['home/getTest']);
      const increase = () => state.count++;
      const tell = (msg) => {
        console.log(msg);
      };
      const changvalue = () => {
        store.commit('home/changTest', 'changvalue');
      };
      let query = route.query;
      onMounted(() => {
        console.log(home);
        console.log(router);
        console.log(root.value);
      });
      return {
        count: countRef,
        increase,
        ...stateAsRefs,
        root,
        msg,
        tell,
        felix,
        changvalue,
        home,
        query,
      };
    },

    created() {
      console.log('object');
    },
  };
</script>
