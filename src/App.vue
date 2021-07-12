<template>
  <img ref="root" alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <button type="button" class="btn btn-primary">
    我要激活
    <input name="file" type="file" accept=".png" @change="changfn" />
  </button>
  <div
    id="dropArea"
    ref="dropArea"
    @dragleave.prevent.stop="dragleave"
    @dragenter.prevent.stop="dragenter"
    @drop.prevent.stop="drop"
    @dragover.prevent.stop="dragover"
  >
    <p>拖拽上传文件</p>
  </div>
  <div id="imagePreview">
    <img
      :src="reader.src"
      :alt="reader.name"
      name="view"
      v-for="(reader, index) in fileReader"
      :key="'reader' + index"
    />
  </div>
  <router-view />
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  import { reactive, toRef, toRefs, ref, onMounted } from 'vue';
  import To from '@/utils/scroll-to';
  import SetHelper from '@/utils/aggregate';
  import { createAxios } from '@/utils/axios/index';
  import { addClass, removeClass } from '@/utils/dom';
  import { throttle } from '@/utils/index';
  export default {
    name: 'App',
    components: { HelloWorld },
    setup(props, context) {
      console.log(context);
      const root = ref(null);
      const dropArea = ref(null);
      const value = ref('');
      const msg = ref('hello world!');
      const state = reactive({ count: 0 });
      const countRef = toRef(state, 'count');
      const state2 = reactive({ count2: 0 });
      const stateAsRefs = toRefs(state2);
      const increase = () => state.count++;
      const fileReader = reactive([]);
      const tell = (msg) => {
        console.log(msg);
      };

      const dragleave = () => {
        console.log('dragleave');
        removeClass(dropArea.value, 'highlighted');
      };
      const dragenter = () => {
        console.log('dragenter');
        addClass(dropArea.value, 'highlighted');
      };
      const drop = (e) => {
        console.log(e.dataTransfer.files);
        const fifles = e.dataTransfer.files;
        if (fifles.length) {
          console.log(fifles);
          const files = [...fifles];
          files.forEach((file) => {
            previewImage(file);
          });
          addClass(dropArea.value, 'highlighted');
        } else {
          removeClass(dropArea.value, 'highlighted');
        }
      };
      const dragover = throttle(
        () => {
          console.log('dragover');
          addClass(dropArea.value, 'highlighted');
        },
        1200,
        { leading: true, trailing: false }
      );
      const previewImage = (file) => {
        const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png)$/i;
        if (IMAGE_MIME_REGEX.test(file.type)) {
          const reader = new FileReader();
          reader.onload = function (e) {
            if (!fileReader.some((v) => v.src == e.target.result)) {
              fileReader.push({ src: e.target.result, name: file.name });
              console.log(file);
              createAxios()
                .uploadFile({ url: '/upload' }, { file: file, name: 'upload', filename: file.name })
                .then((r) => {
                  console.log(r);
                });
            }
          };
          reader.readAsDataURL(file);
        }
      };
      onMounted(() => {
        new To(0, 500).scrollTo();
        console.log(new SetHelper([1, 2, 3, 4]).intersectionDifference(new Set([2, 3, 4, 5])));
        createAxios()
          .get(
            {
              url: '/upload/album/detail',
              params: '/22',
            },
            { responseData: 'default', headers: { ignoreCancelToken: true } }
          )
          .then((r) => {
            console.log(r);
          });
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
        dropArea,
        dragleave,
        dragenter,
        drop,
        dragover,
        fileReader,
      };
    },
  };
</script>

<style lang="scss" scoped>
  #dropArea {
    width: 300px;
    height: 300px;
    border: 1px dashed gray;
    margin-bottom: 20px;
    p {
      text-align: center;
      color: #999;
    }
    &.highlighted {
      background-color: #ddd;
    }
  }
  #imagePreview {
    max-height: 250px;
    overflow-x: scroll;
    text-align: left;
    img {
      width: 80px;
      display: inline-block;
      height: 80px;
    }
  }
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
