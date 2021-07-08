<template>
  <div> <button @click="tellF">我要传递信息</button> </div>
</template>

<script>
  export default {
    emits: {
      tellPart: (val) => {
        return (
          val &&
          Object.keys(val).length ==
            Object.values(val).filter((val) => ![null, undefined, ''].includes(val)).length
        );
      },
    },
    setup(props, { emit }) {
      const data = {
        name: '222',
        age: '222',
        page: '222111',
      };
      const tellF = () => {
        emit('tellPart', data);
      };
      return { tellF };
    },
  };
</script>

<style lang="scss" scoped></style>
