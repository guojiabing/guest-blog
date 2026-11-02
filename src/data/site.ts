export const site = {
  name: 'Guest',
  username: 'guojiabing',
  title: 'Guest · 个人博客',
  description: '记录技术，分享构建。在代码与文字之间，留下一点自己的思考。',
  github: 'https://github.com/guojiabing',
  oldBlog: 'https://www.cnblogs.com/guojiabing',
};
export const path = (url = '') => `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`;
export const formatDate = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '.');
export const projects = [
  { name: 'await-to-arkts', description: '为 ArkTS 提供简洁的异步错误处理，让 async / await 更从容。', language: 'TypeScript', color: '#7da7df', icon: 'braces', url: 'https://github.com/guojiabing/await-to-arkts', label: '异步处理' },
  { name: 'HarmonyUtils', description: '鸿蒙开发工具集合，把常用能力沉淀为可以复用的小工具。', language: 'TypeScript', color: '#7da7df', icon: 'layers', url: 'https://github.com/guojiabing/HarmonyUtils', label: '鸿蒙开发' },
  { name: 'my-music-box', description: '基于开源网易云音乐 API 的个人音乐盒，让代码也有自己的旋律。', language: 'JavaScript', color: '#e6c875', icon: 'music', url: 'https://github.com/guojiabing/my-music-box', label: '音乐与生活' },
  { name: 'qiankun-vue3', description: '以 Vue 3 为主应用的微前端项目，探索应用之间的协作方式。', language: 'JavaScript', color: '#e6c875', icon: 'grid', url: 'https://github.com/guojiabing/qiankun-vue3', label: '微前端' },
];
