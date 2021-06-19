const habdelGetData = async (getData, setLoading, history) => {
  try {
    await setLoading();
    await getData();
  } catch (e) {
    await setLoading(false);
    if (!history) return;
    switch (e.message) {
      case '401':
      case '500':
        return history.push('/user/login');
      default:
        return;
    }
  }
};
export default habdelGetData;
