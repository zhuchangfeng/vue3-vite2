import './index.scss';
import { ref, watch } from 'vue';
export default {
  name: 'AsyncComp',
  async setup() {
    const getArticle = () => {
      return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
          resolve({ title: '正确加载内容！' });
        } else {
          reject({ msg: '呃，出了点问题~' });
        }
      });
    };
    let { title } = await getArticle();
    const titleRef = ref(title);
    const stopHandle = watch(titleRef, (newval, oldval) => {
      console.log(newval);
      console.log(oldval);
    });
    const waittime = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          titleRef.value = 222;
          resolve();
        }, 4000)
      );
    await waittime();
    stopHandle();
    return () => <div className="info">{titleRef.value}</div>;
  },
};
