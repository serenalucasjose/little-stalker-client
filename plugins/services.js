export default ({ $axios }, inject) => {
  inject('getReport', async () => await $axios.get('/api/getReport'))
}