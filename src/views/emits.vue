<template>
  <div>
    <Emits @tellPart="getC" />
  </div>
</template>

<script>
  import Emits from '@/components/Emits.vue';
  export default {
    components: { Emits },
    setup() {
      const getC = (e) => {
        console.log(e);
      };
      return { getC };
    },
  };
</script>

<style lang="scss" scoped></style>
