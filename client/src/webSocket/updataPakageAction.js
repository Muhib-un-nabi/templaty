// import moduleName from './init';
const updataPakageAction = () => {
  try {
    console.log(window.io.emit);
    Window.io.emit('pakckage updated Request');
  } catch (e) {
    console.log(e);
    console.log('Error on UpdataPakage Request');
  }
};

export default updataPakageAction;
