import './index.scss';
import { ref, watch } from 'vue';
export default {
  name: 'AsyncComp',
  async setup() {
    const getArticle = () => {
      return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
          setTimeout(() => {
            resolve({ title: '正确加载内容！' });
          }, 4000);
        } else {
          reject({ msg: '呃，出了点问题~' });
        }
      });
    };
    let { title } = await getArticle();
    const titleRef = ref(title);
    const test = () => {
      console.log('object');
    };
    const waittime = () => {
      watch(titleRef, (newval, oldval) => {
        console.log(newval);
        console.log(oldval);
      });
      setTimeout(() => {
        titleRef.value = 222;
      }, 4000);
    };
    waittime();
    return () => (
      <>
        <div className="info" onClick={test}>
          {titleRef.value}
        </div>
        <input type="text" v-model={titleRef.value}></input>
      </>
    );
  },
};
